package com.example.TheBlog.service;

import io.github.bucket4j.ConsumptionProbe;

public interface IRateLimiterService {
    ConsumptionProbe tryConsume(String key, int capacity, long refillTokens, long refillPeriodSeconds);
}
