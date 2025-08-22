package com.service.impl;

import com.config.security.JwtTokenProvider;
import com.exception.EmailAlreadyExistsException;
import com.exception.UserNotFoundException;
import com.model.Role;
import com.model.User;
import com.model.dto.request.RegisterRequest;
import com.model.dto.request.UpdateUserRequest;
import com.model.dto.response.UserResponse;
import com.repository.UserRepository;
import com.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

    @Service
    public class UserServiceImpl implements UserService {

        private final UserRepository repo;
        private final BCryptPasswordEncoder passwordEncoder;
        private final JwtTokenProvider tokenProvider;

        public UserServiceImpl(UserRepository repo, BCryptPasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
            this.repo = repo;
            this.passwordEncoder = passwordEncoder;
            this.tokenProvider = tokenProvider;
        }

        @Override
        public UserResponse register(RegisterRequest request) {
            if (repo.existsByEmail(request.getEmail())) {
                throw new EmailAlreadyExistsException("Email already registered");
            }
            Role role = Role.valueOf(request.getRole().toUpperCase());
            User u = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .phone(request.getPhone())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(role)
                    .build();
            User saved = repo.save(u);
            return toDto(saved);
        }

        @Override
        public String createTokenForUserByEmail(String email) {
            User u = repo.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
            return tokenProvider.generateToken(String.valueOf(u.getId()), u.getRole().name());
        }

        @Override
        public List<UserResponse> getAll() {
            return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
        }

        @Override
        public List<UserResponse> getByRole(Role role) {
            return repo.findByRole(role).stream().map(this::toDto).collect(Collectors.toList());
        }

        @Override
        public UserResponse getById(Long id) {
            User u = repo.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
            return toDto(u);
        }

        @Override
        public UserResponse update(Long id, UpdateUserRequest request) {
            User u = repo.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
            if (request.getName() != null && !request.getName().isBlank()) u.setName(request.getName());
            if (request.getPhone() != null && !request.getPhone().isBlank()) u.setPhone(request.getPhone());
            if (request.getPassword() != null && !request.getPassword().isBlank()) {
                u.setPassword(passwordEncoder.encode(request.getPassword()));
            }
            User saved = repo.save(u);
            return toDto(saved);
        }

        @Override
        public void delete(Long id) {
            if (!repo.existsById(id)) throw new UserNotFoundException("User not found");
            repo.deleteById(id);
        }

        private UserResponse toDto(User u) {
            return new UserResponse(
                    u.getId(),
                    u.getName(),
                    u.getEmail(),
                    u.getPhone(),
                    u.getRole().name(),
                    u.getCreatedAt() == null ? null : u.getCreatedAt().toString(),
                    u.getUpdatedAt() == null ? null : u.getUpdatedAt().toString()
            );
        }
    }

