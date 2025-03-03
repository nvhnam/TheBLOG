package com.example.TheBlog.DTO;

public class LoginResponseDTO {

//    private Integer id;
    private String username;
//
//    private String img;

    private String token;
    private Long expiresIn;

    public LoginResponseDTO(String username, String token, Long expiresIn) {
        this.username = username;
        this.token = token;
        this.expiresIn = expiresIn;
    }

    public LoginResponseDTO() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }
}
