package com.springboot.config;

import com.springboot.domain.auth.CustomAccessDeniedHandler;
import com.springboot.domain.auth.CustomAuthenticationEntryPoint;
import com.springboot.domain.auth.JwtAuthenticationFilter;
import com.springboot.domain.auth.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity(debug = true)
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${spring.security.debug:false}")
    private boolean debugMode;

    private final JwtUtil jwtUtil;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;
    private final ValueOperations<String, String> valueOperations;

    private final String[] publicApiList = {
        "/api/v1/auth/**",

        "/api/v1/posts/{id}", "/api/v1/posts/topic/first/**",
        "/api/v1/posts/list", "/api/v1/posts/search",

        "/api/v1/member/profile/{id}", "/api/v1/member/follow/list/{id}",
        "/api/v1/member/follower/list/{id}", "/api/v1/member/posts/list/{id}",
        "/api/v1/member/like/list/{id}",

        "/api/v1/reply/{postsId}", "/api/v1/reply/first/**",

        "/api/v1/topic/list", "/api/v1/topic/search/**", "/api/v1/topic/posts/**",

        "/v3/api-docs", "/v2/api-docs", "/swagger-resources/**",
        "/swagger-ui/**", "/webjars/**", "/swagger-ui/index.html**",

        "/profile",
    };

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .httpBasic().disable()
            .csrf().disable()
            .cors()
            .and()
            .exceptionHandling()
            .authenticationEntryPoint(customAuthenticationEntryPoint)
            .accessDeniedHandler(customAccessDeniedHandler)
            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
            .antMatchers(publicApiList).permitAll()
            .anyRequest().hasRole("USER")
            .and()
            .addFilterBefore(new JwtAuthenticationFilter(jwtUtil, valueOperations),
                UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.debug(debugMode);
    }
}
