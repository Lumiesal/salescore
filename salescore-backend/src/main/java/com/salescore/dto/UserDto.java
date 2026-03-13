package com.salescore.dto;

public class UserDto {

    private Long id;
    private String fullName;
    private String email;
    private String role;
    private Boolean active;

    public UserDto() {
    }

    public UserDto(Long id, String fullName, String email, String role, Boolean active) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public Boolean getActive() {
        return active;
    }
}