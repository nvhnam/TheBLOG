package com.example.TheBlog.DTO;

public class VerifyUserDTO {
    private String email;
    private String verificationCode;

    public VerifyUserDTO(String email, String verificationCode) {
        this.email = email;
        this.verificationCode = verificationCode;
    }

    public VerifyUserDTO() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }
}
