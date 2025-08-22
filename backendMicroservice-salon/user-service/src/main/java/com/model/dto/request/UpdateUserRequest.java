package com.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class UpdateUserRequest {
        private String name;
        private String phone;
        private String password; // optional, if updating
    }


