package com.javawarriors.buyerside.services;

import com.javawarriors.buyerside.entities.User;
import com.javawarriors.buyerside.repositories.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Adding/removal of user information.
 */

@Service
public class UserService {

    @Autowired
    private UserRepo repo;
    
    /**
     * Encodes user password and saves user details to database
     * 
     * @param user to save to database
     */
    public void addUser(User user) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        repo.save(user);
    }
    
    /**
     * Takes in the email of the user and deletes the information of the user from the database
     * Logs out user from account
     */
    @Transactional
    public void deleteByEmail(String email) {
        repo.deleteByEmail(email); // Delete user
        SecurityContextHolder.getContext().setAuthentication(null); // Log out user
    }
}
