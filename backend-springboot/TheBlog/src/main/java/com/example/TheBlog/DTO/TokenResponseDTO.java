package com.example.TheBlog.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenResponseDTO {
    private Integer userId;
    private String username;
    private String accessToken;
    private String refreshToken;
    private Long expiresIn;
}
