package com.example.TheBlog.service;

import com.example.TheBlog.DTO.EmailMessageDTO;
import com.example.TheBlog.utils.AppConstants;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmailConsumer {

    private final EmailService emailService;

    public EmailConsumer(EmailService emailService) {
        this.emailService = emailService;
    }

    @RabbitListener(queues = AppConstants.Messaging.EMAIL_QUEUE)
    public void consumeEmailMessage(EmailMessageDTO emailMessage) {
        try {
            emailService.sendVerificationEmail(emailMessage.getTo(), emailMessage.getSubject(), emailMessage.getBody());
        } catch (MessagingException e) {
            log.error("Failed to send verification email to {}", emailMessage.getTo(), e);
        }
    }
}
