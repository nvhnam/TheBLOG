package com.example.TheBlog.exception;

public class MimeTypeNotAllowedException extends RuntimeException {
    public MimeTypeNotAllowedException(String message) {
        super(message);
    }
}
