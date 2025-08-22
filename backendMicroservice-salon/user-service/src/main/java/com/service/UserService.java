package com.service;

import com.model.Role;
import com.model.dto.request.RegisterRequest;
import com.model.dto.request.UpdateUserRequest;
import com.model.dto.response.UserResponse;

import java.util.List;


public interface UserService {
    UserResponse register(RegisterRequest request);
    String createTokenForUserByEmail(String email);
    List<UserResponse> getAll();
    List<UserResponse> getByRole(Role role);
    UserResponse getById(Long id);
    UserResponse update(Long id, UpdateUserRequest request);
    void delete(Long id);
}



