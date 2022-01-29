package com.springboot.domain.hello.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @Value("${logging-module.version}")
    private String version;

    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }

    @GetMapping("/")
    public String version() {
        return String.format("Project Version : %s", version);
    }

    @GetMapping("/health")
    public String checkHealth() {
        return "healthy";
    }

//    @GetMapping("/")
//    public String hello2() {
//        return "hello!!";
//    }

//    @GetMapping("/hello/dto")
//    public HelloResponseDto helloDto(@RequestParam("name") String name,
//                                     @RequestParam("amount") int amount) {
//        return new HelloResponseDto(name, amount);
//    }

    // feature branch commit test - 220120

}
