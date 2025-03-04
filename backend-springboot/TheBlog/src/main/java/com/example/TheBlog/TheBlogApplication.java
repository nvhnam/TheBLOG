package com.example.TheBlog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
//@EnableJpaRepositories("com.example.TheBlog.repository")
public class TheBlogApplication {

	public static void main(String[] args) {
		SpringApplication.run(TheBlogApplication.class, args);
	}

}
