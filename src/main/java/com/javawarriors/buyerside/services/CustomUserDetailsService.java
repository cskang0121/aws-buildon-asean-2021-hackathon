package com.javawarriors.buyerside.services;

import com.javawarriors.buyerside.entities.User;
import com.javawarriors.buyerside.entities.CustomUserDetails;
import com.javawarriors.buyerside.repositories.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/** Implements CustomUserDetails class. */
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;
    
    /**
     * Creates new CustomUserDetails object if user is found in database
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new CustomUserDetails(user);
    }

}