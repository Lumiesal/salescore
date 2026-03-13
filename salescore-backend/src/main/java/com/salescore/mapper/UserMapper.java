package com.salescore.mapper;

import com.salescore.dto.UserDto;
import com.salescore.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDto toDto(User user) {
        return new UserDto(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name(),
                user.getActive()
        );
    }
}