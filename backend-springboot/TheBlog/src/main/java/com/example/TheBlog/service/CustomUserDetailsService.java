package com.example.TheBlog.service;

import com.example.TheBlog.repository.UserRepository;
import com.example.TheBlog.utils.AppConstants;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByUsername(email)
                .or(() -> userRepository.findByEmail(email)) 
                .orElseThrow(() -> new UsernameNotFoundException(AppConstants.Errors.USER_IDENTIFIER_NOT_FOUND + email));
    }
}
