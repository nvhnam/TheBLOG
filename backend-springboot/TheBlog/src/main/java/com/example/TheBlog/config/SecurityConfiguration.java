package com.example.TheBlog.config;

import com.example.TheBlog.utils.AppConstants;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final Optional<RateLimitFilter> rateLimitFilter;

    @Value("${CLIENT_URL:http://localhost:5173}")
    private String clientUrl;

    @Value("${BACKEND_URL:http://localhost:8080}")
    private String backendUrl;

    public SecurityConfiguration(JwtAuthenticationFilter jwtAuthenticationFilter,
                                 AuthenticationProvider authenticationProvider,
                                 Optional<RateLimitFilter> rateLimitFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.authenticationProvider = authenticationProvider;
        this.rateLimitFilter = rateLimitFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        // Public documentation
                        .requestMatchers("/swagger-ui/**", "/api-docs/**").permitAll()
                        // Public auth endpoints
                        .requestMatchers(AppConstants.Api.AUTH_BASE).permitAll()
                        // Public read-only endpoints
                        .requestMatchers(HttpMethod.GET, AppConstants.Api.POSTS_BASE).permitAll()
                        .requestMatchers(HttpMethod.GET, AppConstants.Api.CATEGORIES_BASE).permitAll()
                        .requestMatchers(HttpMethod.GET, "/posts/*/comments").permitAll()
                        // All write operations require authentication (ownership enforced in service layer)
                        .requestMatchers(HttpMethod.POST, "/posts/upload").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/posts/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/posts/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/posts/*/comments").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/comments/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/comments/**").authenticated()
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        rateLimitFilter.ifPresent(filter ->
                http.addFilterBefore(filter, JwtAuthenticationFilter.class));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(clientUrl, backendUrl, "http://localhost:8080", "http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList(AppConstants.Security.ALLOWED_METHODS));
        configuration.setAllowedHeaders(Arrays.asList(
                AppConstants.Security.AUTH_HEADER,
                AppConstants.Security.CONTENT_TYPE_HEADER
        ));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
