package com.example.TheBlog.service;

import com.example.TheBlog.repository.UserRepository;
import org.springframework.context.annotation.Bean;
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
//        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Can't find user with email: " + email));
        return userRepository.findByUsername(email)
                .or(() -> userRepository.findByEmail(email)) // Attempt both email and username
                .orElseThrow(() -> new UsernameNotFoundException("User not found with identifier: " + email));
    }

//    @Bean
//    public UserDetails loadUserByUsernamePost(String username) throws UsernameNotFoundException {
//        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Can't find username: " + username));
//    }
}
