package com.todoProject.MySecurityConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.todoProject.Services.CustomUserDetailServices;

@EnableWebSecurity
@Configuration
public class MySecurityConfig extends WebSecurityConfigurerAdapter{

	@Autowired
	private CustomUserDetailServices customUserDetailServices;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {		
		
		http.cors().disable()
		.csrf().disable()
		.authorizeRequests()
		.antMatchers(HttpMethod.PUT, "/todo/**").permitAll()
		.antMatchers("/login","/public/register").permitAll()
		.anyRequest().authenticated()
		.and().httpBasic();
		
		http.cors();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(customUserDetailServices).passwordEncoder(passwordEncoder());
	}
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
}
