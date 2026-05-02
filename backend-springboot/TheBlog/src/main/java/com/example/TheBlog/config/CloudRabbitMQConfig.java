package com.example.TheBlog.config;

import com.rabbitmq.client.ConnectionFactory;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import java.net.URISyntaxException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;


@Configuration
@ConditionalOnProperty(name = "use.local.config", havingValue = "false")
public class CloudRabbitMQConfig {

    @Value("${CLOUDAMQP_URL}")
    private String cloudAmqpUrl;

    @Bean
    @Primary
    public CachingConnectionFactory connectionFactory()
            throws URISyntaxException, NoSuchAlgorithmException, KeyManagementException {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setUri(cloudAmqpUrl);       
        factory.setAutomaticRecoveryEnabled(true);
        return new CachingConnectionFactory(factory);
    }
}
