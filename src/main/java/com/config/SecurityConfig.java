package com.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.web.cors.CorsConfigurationSource;

/**
 * 1. @Bean -> call method marked with it on startup and save the return as a bean
 * of type SecurityFilterChain
 * 2. SecurityFilterChain -> List of filters executed in EACH HTTP request.
 * 3. HttpSecurity -> configurator. What filters and in what order?
 * 4. requestMatchers(...).permitAll -> everyone can enter /ping
 * 5. anyRequest().authenticated() -> in order to enter all other endpoints you
 * need to be authenticated.
 * 6. oauth2Login() -> If request requires authentication and user is not logged in
 * start the OAuth flow2. What does it do?
 * - redirect to Spotify
 * - get code
 * - exchange tokens
 * - save context
 * 7. AuthenticationEntryPoint -> strategy, when a user that has not been logged in, tries to access a resource that
 * requires authorization.
 * 8. In order for the authentication to be remembered - create an HTTP session
 */


@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(
                                "/",
                                "/oauth2/**",
                                "/login/oauth2/**",
                                "/error").permitAll()
                        .anyRequest().authenticated())
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(
                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)
                        )
                )


                .requestCache(cache -> cache
                        .requestCache(new org.springframework.security.web.savedrequest.HttpSessionRequestCache()))
                .oauth2Login(login ->
                        login.defaultSuccessUrl("http://127.0.0.1:5173", true));

        return http.build();
    }
}
