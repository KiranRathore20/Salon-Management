package com.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
    @Configuration
    @EnableMethodSecurity
    public class SecurityConfig {

        private final JwtAuthFilter jwtAuthFilter;

        public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
            this.jwtAuthFilter = jwtAuthFilter;
        }

        @Bean
        public BCryptPasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http
                    .csrf(csrf -> csrf.disable())
                    .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                    .authorizeHttpRequests(auth -> auth
                            .requestMatchers("/api/auth/**", "/actuator/**", "/health", "/info").permitAll()
                            .anyRequest().authenticated()
                    )
                    .httpBasic(Customizer.withDefaults());

            http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
            return http.build();
        }
    }

