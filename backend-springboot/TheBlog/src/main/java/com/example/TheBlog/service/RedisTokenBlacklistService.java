package com.example.TheBlog.service;

import com.example.TheBlog.utils.AppConstants;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.concurrent.TimeUnit;

@Service
public class RedisTokenBlacklistService implements ITokenBlacklistService {

    private final StringRedisTemplate redisTemplate;

    public RedisTokenBlacklistService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void blacklist(String token, long remainingTtlSeconds) {
        if (remainingTtlSeconds <= 0) return;
        String key = buildKey(token);
        redisTemplate.opsForValue().set(key, "1", remainingTtlSeconds, TimeUnit.SECONDS);
    }

    @Override
    public boolean isBlacklisted(String token) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(buildKey(token)));
    }

    private String buildKey(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            return AppConstants.Tokens.BLACKLIST_KEY_PREFIX + HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 not available", e);
        }
    }
}
