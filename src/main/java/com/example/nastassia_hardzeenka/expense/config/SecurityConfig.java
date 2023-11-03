package com.example.nastassia_hardzeenka.expense.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.nastassia_hardzeenka.expense.service.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {
   private CustomUserDetailsService userDetailsService;
   private JwtRequestFilter jwtRequestFilter;

   public SecurityConfig(
         CustomUserDetailsService customUserDetailsService,
         JwtRequestFilter jwtRequestFilter) {
      this.userDetailsService = customUserDetailsService;
      this.jwtRequestFilter = jwtRequestFilter;
   }

   @Bean
   public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
         throws Exception {
      return authenticationConfiguration.getAuthenticationManager();
   }

   @Bean
   public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

      http
            .cors()
            .and()
            .authorizeRequests()
            .antMatchers("/h2-console/**").permitAll()
            .antMatchers("/rest/api/**").permitAll()
            .anyRequest().authenticated()
            .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
      http.csrf().ignoringAntMatchers("/h2-console/**");
      http.csrf().ignoringAntMatchers("/rest/api/**");
      http.csrf().ignoringAntMatchers("/user/**");
      http.headers().frameOptions().sameOrigin();
      http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
      return http.build();
   }

   @Bean
   public DaoAuthenticationProvider daoAuthenticationProvider() {
      DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
      daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
      daoAuthenticationProvider.setUserDetailsService(userDetailsService);
      return daoAuthenticationProvider;
   }

   @Bean
   public BCryptPasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
   }

   @Bean
   CorsConfigurationSource corsConfigurationSource() {
      CorsConfiguration configuration = new CorsConfiguration();
      configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
      configuration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE",
            "PUT"));
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", configuration);
      return source;
   }
}
