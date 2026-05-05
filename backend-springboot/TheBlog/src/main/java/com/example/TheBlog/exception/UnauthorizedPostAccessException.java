package com.example.TheBlog.exception;

public class UnauthorizedPostAccessException extends RuntimeException {
    public UnauthorizedPostAccessException(String message) {
        super(message);
    }
}
