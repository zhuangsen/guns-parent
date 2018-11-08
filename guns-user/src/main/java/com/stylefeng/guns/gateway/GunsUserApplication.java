package com.stylefeng.guns.gateway;

import com.alibaba.dubbo.spring.boot.annotation.EnableDubboConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.stylefeng.guns")
@EnableDubboConfiguration
public class GunsUserApplication {

    public static void main(String[] args) {
        SpringApplication.run(GunsUserApplication.class, args);
    }
}
