package com.example.TheBlog.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailMessageDTO implements Serializable {
    private String to;
    private String subject;
    private String body;
}
