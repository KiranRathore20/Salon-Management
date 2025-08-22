package com.controller;

import com.model.dto.request.LoginRequest;
import com.model.dto.request.RegisterRequest;
import com.model.dto.response.AuthResponse;
import com.repository.UserRepository;
import com.service.impl.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


    @RestController
    @RequestMapping("/api/auth")
    public class AuthController {

        private final UserRepository userRepository;
        private final UserServiceImpl userService;
        private final BCryptPasswordEncoder passwordEncoder;

        public AuthController(UserRepository userRepository, UserServiceImpl userService, BCryptPasswordEncoder passwordEncoder) {
            this.userRepository = userRepository;
            this.userService = userService;
            this.passwordEncoder = passwordEncoder;
        }

        @PostMapping("/register")
        public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
            return ResponseEntity.status(201).body(userService.register(request));
        }

        @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody LoginRequest req) {
            return userRepository.findByEmail(req.getEmail()).map(user -> {
                if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
                    return ResponseEntity.status(401).body("Invalid credentials");
                }
                // Generate JWT token
                String token = userService.createTokenForUserByEmail(user.getEmail());
                // Return token, success message, and role
                return ResponseEntity.ok(new AuthResponse(token, "Login success", user.getRole().name()));
            }).orElseGet(() -> ResponseEntity.status(401).body("Invalid credentials"));
        }
    }


