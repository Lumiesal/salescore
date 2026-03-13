package com.salescore.dto;

public class UserRequestDto {

    private String fullName;
    private String email;
    private String password;
    private String role;
    private Boolean active;

    public UserRequestDto() {
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    public Boolean getActive() {
        return active;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}