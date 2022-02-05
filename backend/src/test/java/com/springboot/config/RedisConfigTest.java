package com.springboot.config;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

@SpringBootTest
class RedisConfigTest {

    @Autowired
    private RedisTemplate<String, String> redisStringTemplate;

    @Test
    void testString() {
        ValueOperations<String, String> valueOperations = redisStringTemplate.opsForValue();
        String key = "string_key";

        valueOperations.set(key, "test_value");

        String value = valueOperations.get(key);
        assertEquals(value, "test_value");
    }
}