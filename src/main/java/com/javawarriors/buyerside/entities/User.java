package com.javawarriors.buyerside.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Java class that represents users in the database
 */
@Entity
@Table(name = "users")
public class User {

    /**
     * user's unique user id which is automatically generated
     */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long uid;

    /**
     * user's registered email
     */
    @Column(nullable = false, unique = true, length = 45)
    private String email;

    /**
     * user's password
     */
    @Column(nullable = false, length = 64)
    private String password;

    /**
     * user's registered first name
     */
    @Column(name = "first_name", nullable = false, length = 20)
    private String firstName;

    /**
     * user's registered last name
     */
    @Column(name = "last_name", nullable = false, length = 20)
    private String lastName;

    /**
     * user's registered location
     */
    @Column(name = "location", nullable = false, length = 64)
    private String location;

    /**
     * user's unique username
     */
    @Column(name = "username", nullable = false, length = 20)
    private String username;

    /**
     * user's verification code that is needed to enable their account
     */
    @JsonIgnore
    @Column(name = "verification_code", length = 64, updatable = false)
    private String verificationCode;

    /**
     * user's reset password token when they request to reset their passsword
     */
    @JsonIgnore
    @Column(name = "reset_password_token", length = 30)
    private String resetPasswordToken;

    @JsonIgnore
    private boolean enabled;

    /**
     * getters and setters for the variables of the user
     */

    public Long getUid() {
		return this.uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
	}

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getVerificationCode() {
        return this.verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public String getResetPasswordToken() {
        return this.resetPasswordToken;
    }

    public void setResetPasswordToken(String resetPasswordToken) {
        this.resetPasswordToken = resetPasswordToken;
    }

    public boolean isEnabled() {
        return this.enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

}
