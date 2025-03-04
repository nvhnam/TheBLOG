package com.example.TheBlog.DTO;

public class LoginResponseDTO {

    private Integer id;
    private String username;
//
//    private String img;

    private String token;
    private Long expiresIn;

    public LoginResponseDTO(Integer id, String username, String token, Long expiresIn) {
        this.id = id;
        this.username = username;
        this.token = token;
        this.expiresIn = expiresIn;
    }

    public LoginResponseDTO() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
