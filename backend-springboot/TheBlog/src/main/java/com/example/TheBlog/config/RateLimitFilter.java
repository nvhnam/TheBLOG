package com.example.TheBlog.config;

import com.example.TheBlog.service.IRateLimiterService;
import com.example.TheBlog.service.JwtService;
import com.example.TheBlog.utils.AppConstants;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.bucket4j.ConsumptionProbe;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Component
@ConditionalOnProperty(name = "app.security.rate-limit.enabled", havingValue = "true", matchIfMissing = true)
public class RateLimitFilter extends OncePerRequestFilter {

    private final IRateLimiterService rateLimiterService;
    private final JwtService jwtService;
    private final ObjectMapper objectMapper;

    public RateLimitFilter(IRateLimiterService rateLimiterService,
                           JwtService jwtService,
                           ObjectMapper objectMapper) {
        this.rateLimiterService = rateLimiterService;
        this.jwtService = jwtService;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        String ip = resolveClientIp(request);
        String path = request.getRequestURI();
        String method = request.getMethod();
        String authHeader = request.getHeader(AppConstants.Security.AUTH_HEADER);

        ConsumptionProbe probe = resolveProbe(ip, path, method, authHeader);
        if (probe == null) {
            filterChain.doFilter(request, response);
            return;
        }

        if (!probe.isConsumed()) {
            long retryAfterSeconds = TimeUnit.NANOSECONDS.toSeconds(probe.getNanosToWaitForRefill()) + 1;
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setHeader("Retry-After", String.valueOf(retryAfterSeconds));
            objectMapper.writeValue(response.getWriter(),
                    Map.of("error", AppConstants.Errors.RATE_LIMIT_EXCEEDED,
                           "retryAfterSeconds", retryAfterSeconds));
            return;
        }

        filterChain.doFilter(request, response);
    }

    private ConsumptionProbe resolveProbe(String ip, String path, String method, String authHeader) {
        if ("POST".equalsIgnoreCase(method)) {
            if (path.endsWith("/auth/login")) {
                return rateLimiterService.tryConsume(ip + ":login",
                        AppConstants.RateLimit.LOGIN_CAPACITY,
                        AppConstants.RateLimit.LOGIN_REFILL_TOKENS,
                        (long) AppConstants.RateLimit.LOGIN_REFILL_MINUTES * 60);
            }
            if (path.endsWith("/auth/signup")) {
                return rateLimiterService.tryConsume(ip + ":signup",
                        AppConstants.RateLimit.SIGNUP_CAPACITY,
                        AppConstants.RateLimit.SIGNUP_REFILL_TOKENS,
                        (long) AppConstants.RateLimit.SIGNUP_REFILL_HOURS * 3600);
            }
            if (path.endsWith("/auth/verify")) {
                return rateLimiterService.tryConsume(ip + ":verify",
                        AppConstants.RateLimit.VERIFY_CAPACITY,
                        AppConstants.RateLimit.VERIFY_REFILL_TOKENS,
                        (long) AppConstants.RateLimit.VERIFY_REFILL_HOURS * 3600);
            }
            if (path.endsWith("/auth/resend")) {
                return rateLimiterService.tryConsume(ip + ":resend",
                        AppConstants.RateLimit.RESEND_CAPACITY,
                        AppConstants.RateLimit.RESEND_REFILL_TOKENS,
                        (long) AppConstants.RateLimit.RESEND_REFILL_HOURS * 3600);
            }
            if (path.endsWith("/posts/upload") && authHeader != null
                    && authHeader.startsWith(AppConstants.Security.BEARER_PREFIX)) {
                String jwt = authHeader.substring(AppConstants.Security.BEARER_PREFIX.length());
                try {
                    Integer userId = jwtService.extractUserId(jwt);
                    if (userId != null) {
                        return rateLimiterService.tryConsume("user:" + userId + ":post-create",
                                AppConstants.RateLimit.POST_CREATE_CAPACITY,
                                AppConstants.RateLimit.POST_CREATE_REFILL_TOKENS,
                                (long) AppConstants.RateLimit.POST_CREATE_REFILL_HOURS * 3600);
                    }
                } catch (Exception ignored) {
                    // JWT may be invalid at this point; JWT filter handles auth errors
                }
            }
        }
        return null;
    }

    private String resolveClientIp(HttpServletRequest request) {
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (forwardedFor != null && !forwardedFor.isBlank()) {
            return forwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
