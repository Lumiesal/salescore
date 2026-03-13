package com.salescore.dto;

public class CustomerRequestDto {

    private String fullName;
    private String email;
    private String phone;
    private String address;
    private Boolean active;

    public CustomerRequestDto() {
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

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}