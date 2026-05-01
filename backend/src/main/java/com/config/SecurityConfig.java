package com.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfigurationSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class SecurityConfig {
    private final static Logger log = LoggerFactory.getLogger(SecurityConfig.class);

    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(csrf -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .csrfTokenRequestHandler(new CsrfTokenRequestAttributeHandler()))

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
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl(frontendUrl)
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID"))
                .requestCache(cache -> cache
                        .requestCache(new org.springframework.security.web.savedrequest.HttpSessionRequestCache()))
                .oauth2Login(login ->{
                    login.failureHandler((request, response, exception) ->
                    {
                        log.error("OAuth login failed");
                        if(exception instanceof OAuth2AuthenticationException oauthEx){
                            OAuth2Error error = oauthEx.getError();

                            log.error("OAuth error code: {}", error.getErrorCode());
                            log.error("OAuth error description: {}", error.getDescription());
                        }else {
                            log.error("Other Exception found with message: {}", exception.getMessage());
                        }
                        response.sendRedirect("/oauth2/authorization/spotify");
                    });

                        login.defaultSuccessUrl(frontendUrl + "/callback", true);
                });

        return http.build();
    }
}
