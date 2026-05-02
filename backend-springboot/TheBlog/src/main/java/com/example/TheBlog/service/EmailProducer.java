package com.example.TheBlog.service;

import com.example.TheBlog.DTO.EmailMessageDTO;
import com.example.TheBlog.utils.AppConstants;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class EmailProducer {

    private final RabbitTemplate rabbitTemplate;

    public EmailProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendEmailMessage(EmailMessageDTO emailMessage) {
        rabbitTemplate.convertAndSend(
                AppConstants.Messaging.EMAIL_EXCHANGE,
                AppConstants.Messaging.EMAIL_ROUTING_KEY,
                emailMessage
        );
    }
}
