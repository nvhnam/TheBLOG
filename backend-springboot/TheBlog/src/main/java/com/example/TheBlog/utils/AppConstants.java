package com.example.TheBlog.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class AppConstants {

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static final class Cache {
        public static final String POSTS_PAGINATED = "posts";
        public static final String POSTS = "postCache";
        public static final String CATEGORIES = "categoryCache";
        public static final String KEY_ALL_POSTS = "'all'";
    }

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static final class Messaging {
        public static final String EMAIL_QUEUE = "emailQueue";
        public static final String EMAIL_EXCHANGE = "emailExchange";
        public static final String EMAIL_ROUTING_KEY = "emailRoutingKey";
    }

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static final class DateFormat {
        public static final String POST_CREATED_AT = "yyyy-MM-dd HH:mm:ss";
    }

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static final class Api {
        public static final String AUTH_BASE = "/auth/**";
        public static final String POSTS_BASE = "/posts/**";
        public static final String CATEGORIES_BASE = "/categories/**";
        public static final String POST_UPLOAD = "/posts/upload";
    }

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static final class Security {
        public static final String AUTH_HEADER = "Authorization";
        public static final String BEARER_PREFIX = "Bearer ";
        public static final String CONTENT_TYPE_HEADER = "Content-Type";
        public static final String[] ALLOWED_METHODS = {"GET", "POST", "PUT", "DELETE", "OPTIONS"};
    }

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static final class Email {
        public static final String VERIFICATION_SUBJECT = "Account Verification";
        public static final String VERIFICATION_CODE_PREFIX = "VERIFICATION CODE ";
        public static final String VERIFICATION_EMAIL_TEMPLATE = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">%s</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";
    }

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static final class Storage {
        public static final String S3_URL_FORMAT = "%s/%s/%s";
        public static final Set<String> ALLOWED_MIME_TYPES = Set.of("image/jpeg", "image/png", "image/webp");
        public static final long MAX_IMAGE_SIZE_BYTES = 10L * 1024 * 1024;
    }

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static final class Pagination {
        public static final String DEFAULT_PAGE_NUMBER = "0";
        public static final String DEFAULT_PAGE_SIZE = "10";
        public static final String DEFAULT_SORT_BY = "createdAt";
    }

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static final class Messages {
        public static final String LOGOUT_SUCCESS = "Logout successfully";
        public static final String LOGOUT_FAILURE = "Logout unsuccessfully";
        public static final String ACCOUNT_VERIFIED = "Account verified successfully";
        public static final String VERIFICATION_CODE_SENT = "Verification code sent successfully";
    }

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static final class Errors {
        public static final String USER_NOT_FOUND = "User not found";
        public static final String POST_NOT_FOUND = "Post not found";
        public static final String ACCOUNT_NOT_VERIFIED = "Account not verified. Please verify your account.";
        public static final String VERIFICATION_CODE_EXPIRED = "Verification code has expired";
        public static final String INVALID_VERIFICATION_CODE = "Invalid verification code";
        public static final String ALREADY_VERIFIED = "Account is already verified";
        public static final String USER_IDENTIFIER_NOT_FOUND = "User not found with identifier: ";
        public static final String MIME_TYPE_NOT_ALLOWED = "File type not allowed. Accepted types: JPEG, PNG, WebP";
        public static final String S3_UPLOAD_FAILED = "Failed to upload to S3: ";
        public static final String S3_CONNECTION_ERROR = "Cannot connect to S3 endpoint. Ensure LocalStack is running: docker-compose up -d";
    }

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static final class Cloudinary {
        public static final String CLOUD_NAME = "cloud_name";
        public static final String API_KEY = "api_key";
        public static final String API_SECRET = "api_secret";
        public static final String SECURE_URL = "secure_url";
    }
}
