package com.example.nastassia_hardzeenka.expense.config;

import java.io.IOException;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.nastassia_hardzeenka.expense.utils.JwtTokenUtil;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {
   @Autowired
   private JwtTokenUtil jwtTokenUtil;

   @Override
   protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
         throws ServletException, IOException {
      String authHeader = request.getHeader("Authorization");
      String username = null;
      String jwt = null;
      if (authHeader != null && authHeader.startsWith("Bearer ")) {
         jwt = authHeader.substring(7);
         try {
            username = jwtTokenUtil.getUsername(jwt);
         } catch (ExpiredJwtException e) {
            // log.debug("Время жизни токена вышло");
         } catch (SignatureException e) {
            // log.debug("Подпись неправильная");
         }
      }
      if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
         UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
               username,
               null,
               jwtTokenUtil.getRoles(jwt).stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
         SecurityContextHolder.getContext().setAuthentication(token);
      }
      filterChain.doFilter(request, response);
   }
}
