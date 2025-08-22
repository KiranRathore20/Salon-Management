package com.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    private String phone;

    @NotBlank @Size(min = 6)
    private String password;

    @NotBlank
    private String role; // ADMIN, SALON_OWNER, CUSTOMER
}

