package com.example.TheBlog.controller;

import com.example.TheBlog.DTO.LoginResponseDTO;
import com.example.TheBlog.DTO.LoginUserDTO;
import com.example.TheBlog.DTO.RegisterUserDTO;
import com.example.TheBlog.DTO.ResendVerificationDTO;
import com.example.TheBlog.DTO.VerifyUserDTO;
import com.example.TheBlog.model.User;
import com.example.TheBlog.service.AuthenticationService;
import com.example.TheBlog.service.JwtService;
import com.example.TheBlog.utils.AppConstants;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("${CLIENT_URL}")
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterUserDTO registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> authenticate(@Valid @RequestBody LoginUserDTO loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        LoginResponseDTO loginResponse = new LoginResponseDTO(
                authenticatedUser.getId(), authenticatedUser.getUsername(),
                jwtToken, jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> loggingOut(Authentication authentication,
                                              HttpServletRequest request,
                                              HttpServletResponse response) {
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
            return ResponseEntity.ok(AppConstants.Messages.LOGOUT_SUCCESS);
        }
        return new ResponseEntity<>(AppConstants.Messages.LOGOUT_FAILURE, HttpStatus.UNAUTHORIZED);
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
