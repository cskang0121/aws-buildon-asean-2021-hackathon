package com.javawarriors.buyerside.repositories;

import com.javawarriors.buyerside.entities.*;

import java.util.*;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Spring JPA Repository programming model for users
 */
@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    /**
     * used to find a user using their email
     * @param email is the email of the user
     */ 
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    public User findByEmail(String email);

    /**
     * used to find a user using their username
     * @param username is the username of the user
     */ 
    public User findByUsername(String username);
     
    /**
     * used to find a user using their verification code
     * @param code contains the verification code that is needed to verify the user's account
     */
    @Query("SELECT u FROM User u WHERE u.verificationCode = ?1")
    public User findByVerificationCode(String code);
    
    /**
     * used to validate the token when the user clicks the change password link
     * @param token is the password reset token that has been sent to the user's email
     */
    public User findByResetPasswordToken(String token);

    /**
     * Use an SQL query to delete user from database where email is matched.
     * 
     * @param email of user.
     * @return number of rows deleted.
     */
    long deleteByEmail(String email);

}