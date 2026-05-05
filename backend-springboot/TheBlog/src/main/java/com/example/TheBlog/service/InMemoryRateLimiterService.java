package com.example.TheBlog.service;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.ConsumptionProbe;
import io.github.bucket4j.Refill;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

/**
 * Single-instance in-memory rate limiter backed by Bucket4j.
 * For multi-instance deployments, replace ConcurrentHashMap with a
 * LettuceBasedProxyManager or JCacheProxyManager backed by Redis.
 */
@Service
@ConditionalOnProperty(name = "app.security.rate-limit.enabled", havingValue = "true", matchIfMissing = true)
public class InMemoryRateLimiterService implements IRateLimiterService {

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    @Override
    public ConsumptionProbe tryConsume(String key, int capacity, long refillTokens, long refillPeriodSeconds) {
        Bucket bucket = buckets.computeIfAbsent(key, k ->
                Bucket.builder()
                        .addLimit(Bandwidth.classic(capacity, Refill.intervally(refillTokens, Duration.ofSeconds(refillPeriodSeconds))))
                        .build()
        );
        return bucket.tryConsumeAndReturnRemaining(1);
    }
}
