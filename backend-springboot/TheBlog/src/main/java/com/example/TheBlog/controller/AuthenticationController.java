package com.example.TheBlog.controller;

import com.example.TheBlog.DTO.LoginUserDTO;
import com.example.TheBlog.DTO.RefreshTokenRequestDTO;
import com.example.TheBlog.DTO.RegisterUserDTO;
import com.example.TheBlog.DTO.ResendVerificationDTO;
import com.example.TheBlog.DTO.TokenResponseDTO;
import com.example.TheBlog.DTO.VerifyUserDTO;
import com.example.TheBlog.model.RefreshToken;
import com.example.TheBlog.model.User;
import com.example.TheBlog.service.AuthenticationService;
import com.example.TheBlog.service.IRefreshTokenService;
import com.example.TheBlog.service.ITokenBlacklistService;
import com.example.TheBlog.service.JwtService;
import com.example.TheBlog.utils.AppConstants;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("${CLIENT_URL}")
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final IRefreshTokenService refreshTokenService;
    private final ITokenBlacklistService tokenBlacklistService;

    public AuthenticationController(JwtService jwtService,
                                    AuthenticationService authenticationService,
                                    IRefreshTokenService refreshTokenService,
                                    ITokenBlacklistService tokenBlacklistService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.refreshTokenService = refreshTokenService;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterUserDTO registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponseDTO> authenticate(@Valid @RequestBody LoginUserDTO loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String accessToken = jwtService.generateToken(authenticatedUser);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(authenticatedUser);
        return ResponseEntity.ok(new TokenResponseDTO(
                authenticatedUser.getId(),
                authenticatedUser.getUsername(),
                accessToken,
                refreshToken.getToken(),
                jwtService.getExpirationTime()
        ));
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponseDTO> refresh(@Valid @RequestBody RefreshTokenRequestDTO dto) {
        RefreshToken refreshToken = refreshTokenService.verifyRefreshToken(dto.getRefreshToken());
        User user = refreshToken.getUser();
        String newAccessToken = jwtService.generateToken(user);
        return ResponseEntity.ok(new TokenResponseDTO(
                user.getId(),
                user.getUsername(),
                newAccessToken,
                refreshToken.getToken(),
                jwtService.getExpirationTime()
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> loggingOut(Authentication authentication,
                                             @RequestHeader(value = AppConstants.Security.AUTH_HEADER, required = false) String authHeader) {
        if (authentication == null) {
            return new ResponseEntity<>(AppConstants.Messages.LOGOUT_FAILURE, HttpStatus.UNAUTHORIZED);
        }
        if (authHeader != null && authHeader.startsWith(AppConstants.Security.BEARER_PREFIX)) {
            String jwt = authHeader.substring(AppConstants.Security.BEARER_PREFIX.length());
            tokenBlacklistService.blacklist(jwt, jwtService.getRemainingTtlSeconds(jwt));
        }
        User user = (User) authentication.getPrincipal();
        refreshTokenService.revokeRefreshToken(user);
        return ResponseEntity.ok(AppConstants.Messages.LOGOUT_SUCCESS);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyUser(@Valid @RequestBody VerifyUserDTO verifyUserDto) {
        authenticationService.verifyUser(verifyUserDto);
        return new ResponseEntity<>(AppConstants.Messages.ACCOUNT_VERIFIED, HttpStatus.CREATED);
    }

    @PostMapping("/resend")
    public ResponseEntity<String> resendVerificationCode(@Valid @RequestBody ResendVerificationDTO dto) {
        authenticationService.resendVerificationCode(dto.getEmail());
        return ResponseEntity.ok(AppConstants.Messages.VERIFICATION_CODE_SENT);
    }
}
