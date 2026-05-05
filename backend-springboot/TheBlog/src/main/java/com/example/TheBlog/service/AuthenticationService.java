package com.example.TheBlog.service;

import com.example.TheBlog.DTO.EmailMessageDTO;
import com.example.TheBlog.DTO.LoginUserDTO;
import com.example.TheBlog.DTO.RegisterUserDTO;
import com.example.TheBlog.DTO.VerifyUserDTO;
import com.example.TheBlog.exception.UserAlreadyExistsException;
import com.example.TheBlog.exception.UserNotFoundException;
import com.example.TheBlog.model.Role;
import com.example.TheBlog.model.User;
import com.example.TheBlog.repository.UserRepository;
import com.example.TheBlog.utils.AppConstants;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;
import java.security.SecureRandom;


@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailProducer emailProducer;
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            EmailProducer emailProducer
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailProducer = emailProducer;
    }

    public User signup(RegisterUserDTO input) {
        if (userRepository.findByEmail(input.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException(AppConstants.Errors.USER_ALREADY_EXISTS + ": " + input.getEmail());
        }
        if (userRepository.findByUsername(input.getUsername()).isPresent()) {
            throw new UserAlreadyExistsException(AppConstants.Errors.USER_ALREADY_EXISTS + ": " + input.getUsername());
        }
        User user = new User(input.getEmail(), input.getUsername(), passwordEncoder.encode(input.getPassword()), null);
        user.setRole(Role.USER);
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
        user.setEnabled(false);
        sendVerificationEmail(user);
        return userRepository.save(user);
    }

    public User authenticate(LoginUserDTO input) {
        User user = userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new UserNotFoundException(AppConstants.Errors.USER_NOT_FOUND));

        if (!user.isEnabled()) {
            throw new IllegalArgumentException(AppConstants.Errors.ACCOUNT_NOT_VERIFIED);
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return user;
    }

    public void verifyUser(VerifyUserDTO input) {
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())) {
                throw new IllegalArgumentException(AppConstants.Errors.VERIFICATION_CODE_EXPIRED);
            }
            if (user.getVerificationCode().equals(input.getVerificationCode())) {
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationCodeExpiresAt(null);
                userRepository.save(user);
            } else {
                throw new IllegalArgumentException(AppConstants.Errors.INVALID_VERIFICATION_CODE);
            }
        } else {
            throw new UserNotFoundException(AppConstants.Errors.USER_NOT_FOUND);
        }
    }

    public void resendVerificationCode(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.isEnabled()) {
                throw new IllegalArgumentException(AppConstants.Errors.ALREADY_VERIFIED);
            }
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiresAt(LocalDateTime.now().plusHours(1));
            sendVerificationEmail(user);
            userRepository.save(user);
        } else {
            throw new UserNotFoundException(AppConstants.Errors.USER_NOT_FOUND);
        }
    }

    private void sendVerificationEmail(User user) {
        String subject = AppConstants.Email.VERIFICATION_SUBJECT;
        String verificationCode = AppConstants.Email.VERIFICATION_CODE_PREFIX + user.getVerificationCode();
        String htmlMessage = String.format(AppConstants.Email.VERIFICATION_EMAIL_TEMPLATE, verificationCode);

        EmailMessageDTO emailMessage = new EmailMessageDTO(user.getEmail(), subject, htmlMessage);
        emailProducer.sendEmailMessage(emailMessage);
    }
    private String generateVerificationCode() {
        int code = SECURE_RANDOM.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}