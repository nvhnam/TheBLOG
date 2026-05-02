package com.example.TheBlog.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisPassword;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import java.net.URI;


@Configuration
@ConditionalOnProperty(name = "use.local.config", havingValue = "false")
public class CloudRedisConfig {

    @Value("${REDIS_URL}")
    private String redisUrl;

    @Bean
    @Primary
    public LettuceConnectionFactory redisConnectionFactory() {
        URI uri = URI.create(redisUrl);
        String userInfo = uri.getUserInfo();
        String username = userInfo.substring(0, userInfo.indexOf(':'));
        String password = userInfo.substring(userInfo.indexOf(':') + 1);

        RedisStandaloneConfiguration standalone = new RedisStandaloneConfiguration(uri.getHost(), uri.getPort());
        standalone.setUsername(username);
        standalone.setPassword(RedisPassword.of(password));

        LettuceClientConfiguration clientConfig = LettuceClientConfiguration.builder()
                .useSsl().and().build();

        return new LettuceConnectionFactory(standalone, clientConfig);
    }
}
