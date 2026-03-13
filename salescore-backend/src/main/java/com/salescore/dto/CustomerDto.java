package com.salescore.dto;

public class CustomerDto {

    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private Boolean active;

    public CustomerDto() {
    }

    public CustomerDto(Long id, String fullName, String email, String phone, String address, Boolean active) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.address = address;
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

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public Boolean getActive() {
        return active;
    }
}