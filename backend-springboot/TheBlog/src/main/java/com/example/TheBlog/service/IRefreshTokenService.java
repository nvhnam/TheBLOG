package com.example.TheBlog.service;

import com.example.TheBlog.model.RefreshToken;
import com.example.TheBlog.model.User;

public interface IRefreshTokenService {
    RefreshToken createRefreshToken(User user);
    RefreshToken verifyRefreshToken(String token);
    void revokeRefreshToken(User user);
}
