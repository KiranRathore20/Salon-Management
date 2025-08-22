package com.controller;

import com.model.Role;
import com.model.dto.request.UpdateUserRequest;
import com.model.dto.response.UserResponse;
import com.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

        @RestController
        @RequestMapping("/api/users")
        public class UserController {

            private final UserService svc;

            public UserController(UserService svc) { this.svc = svc; }

            // Admin only
            @GetMapping
            @PreAuthorize("hasRole('ADMIN')")
            public ResponseEntity<List<UserResponse>> getAll(@RequestParam(required = false) Role role) {
                if (role != null) return ResponseEntity.ok(svc.getByRole(role));
                return ResponseEntity.ok(svc.getAll());
            }

            @GetMapping("/{id}")
            public ResponseEntity<UserResponse> getById(@PathVariable Long id) {
                return ResponseEntity.ok(svc.getById(id));
            }

            @PutMapping("/{id}")
            public ResponseEntity<UserResponse> update(@PathVariable Long id, @Valid @RequestBody UpdateUserRequest request) {
                return ResponseEntity.ok(svc.update(id, request));
            }

            @DeleteMapping("/{id}")
            @PreAuthorize("hasRole('ADMIN')")
            public ResponseEntity<Void> delete(@PathVariable Long id) {
                svc.delete(id);
                return ResponseEntity.noContent().build();
            }
        }
