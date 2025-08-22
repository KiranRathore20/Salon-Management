package com.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HomeController {
    @GetMapping
    public String HomeControllerHandler(){
        return "user service offering microservice Salon booking System ";
    }
}













