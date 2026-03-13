package com.salescore.controller;

import com.salescore.dto.UserDto;
import com.salescore.dto.UserRequestDto;
import com.salescore.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public UserDto createUser(@RequestBody UserRequestDto request) {
        return userService.createUser(request);
    }
}