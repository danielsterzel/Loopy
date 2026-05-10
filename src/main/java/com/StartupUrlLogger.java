package com;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class StartupUrlLogger implements ApplicationListener<ApplicationReadyEvent>{
    private final Environment env;

    public StartupUrlLogger(Environment env){this.env = env;}
    @Override
    public void onApplicationEvent(ApplicationReadyEvent event){
        String port = env.getProperty("server.port", "8080");
        String contextPath = env.getProperty("server.servlet.context-path", "");
        String host = "127.0.0.1";
        System.out.println();
        System.out.println("APPLICATION RUNNING AT:");
        System.out.println("http://" + host + ":" + port + contextPath);
        System.out.println();
    }
}
