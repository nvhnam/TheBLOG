package com.example.TheBlog.DTO;

import lombok.AllArgsConstructor;

public class LoginUserDTO {
    private String email;
    private String password;

    public LoginUserDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public LoginUserDTO() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
