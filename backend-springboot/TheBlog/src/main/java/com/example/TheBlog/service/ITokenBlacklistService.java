package com.example.TheBlog.service;

public interface ITokenBlacklistService {
    void blacklist(String token, long remainingTtlSeconds);
    boolean isBlacklisted(String token);
}
