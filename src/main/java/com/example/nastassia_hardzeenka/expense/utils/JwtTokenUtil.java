package com.example.nastassia_hardzeenka.expense.utils;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenUtil {
   @Value("{jwt.secret}")
   private String secret_key;
   // @Value("{jwt.lifetime}")
   private Duration jwtLifetime = Duration.ofMinutes(60);

   private JwtParser jwtParser;

   private final String TOKEN_HEADER = "Authorization";
   private final String TOKEN_PREFIX = "Bearer ";

   public void JwtUtil() {
      this.jwtParser = Jwts.parser().setSigningKey(secret_key);
   }

   public String createToken(UserDetails userDetails) {
      Map<String, Object> claims = new HashMap<>();
      List<String> rolesList = userDetails.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList());
      claims.put("roles", rolesList);
      Date issuedDate = new Date();
      Date expiredDate = new Date(issuedDate.getTime() + jwtLifetime.toMillis());
      return Jwts.builder()
            .setClaims(claims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(issuedDate)
            .setExpiration(expiredDate)
            .signWith(SignatureAlgorithm.HS256, secret_key)
            .compact();
   }

   private Claims parseJwtClaims(String token) {
      return jwtParser.parseClaimsJws(token).getBody();
   }

   public Claims resolveClaims(HttpServletRequest req) {
      try {
         String token = resolveToken(req);
         if (token != null) {
            return parseJwtClaims(token);
         }
         return null;
      } catch (ExpiredJwtException ex) {
         req.setAttribute("expired", ex.getMessage());
         throw ex;
      } catch (Exception ex) {
         req.setAttribute("invalid", ex.getMessage());
         throw ex;
      }
   }

   public String resolveToken(HttpServletRequest request) {

      String bearerToken = request.getHeader(TOKEN_HEADER);
      if (bearerToken != null && bearerToken.startsWith(TOKEN_PREFIX)) {
         return bearerToken.substring(TOKEN_PREFIX.length());
      }
      return null;
   }

   public boolean validateClaims(Claims claims) throws AuthenticationException {
      try {
         return claims.getExpiration().after(new Date());
      } catch (Exception e) {
         throw e;
      }
   }

   public String getUsername(String token) {
      return getAllClaimsFromToken(token).getSubject();
   }

   public List<String> getRoles(String token) {
      return getAllClaimsFromToken(token).get("roles", List.class);
   }

   private Claims getAllClaimsFromToken(String token) {
      return Jwts.parser()
            .setSigningKey(secret_key)
            .parseClaimsJws(token)
            .getBody();
   }
}
