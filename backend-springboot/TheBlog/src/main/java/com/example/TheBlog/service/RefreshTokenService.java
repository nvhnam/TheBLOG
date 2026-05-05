package com.example.TheBlog.service;

import com.example.TheBlog.exception.InvalidTokenException;
import com.example.TheBlog.exception.RefreshTokenExpiredException;
import com.example.TheBlog.model.RefreshToken;
import com.example.TheBlog.model.User;
import com.example.TheBlog.repository.RefreshTokenRepository;
import com.example.TheBlog.utils.AppConstants;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class RefreshTokenService implements IRefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    @Transactional
    public RefreshToken createRefreshToken(User user) {
        refreshTokenRepository.revokeAllByUser(user);
        RefreshToken refreshToken = new RefreshToken(
                UUID.randomUUID().toString(),
                user,
                LocalDateTime.now().plusDays(AppConstants.Tokens.REFRESH_TOKEN_TTL_DAYS)
        );
        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    public RefreshToken verifyRefreshToken(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new InvalidTokenException(AppConstants.Errors.INVALID_TOKEN));
        if (refreshToken.isRevoked()) {
            throw new InvalidTokenException(AppConstants.Errors.INVALID_TOKEN);
        }
        if (refreshToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RefreshTokenExpiredException(AppConstants.Errors.REFRESH_TOKEN_EXPIRED);
        }
        return refreshToken;
    }

    @Override
    @Transactional
    public void revokeRefreshToken(User user) {
        refreshTokenRepository.revokeAllByUser(user);
    }
}
