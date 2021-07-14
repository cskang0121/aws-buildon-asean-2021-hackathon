package com.javawarriors.buyerside.services;

import java.util.ArrayList;

import com.javawarriors.buyerside.repositories.UserRepo;
import com.javawarriors.buyerside.entities.User;
import com.javawarriors.buyerside.model.UserDTO;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
    private UserRepo repo;
    
    /**
     * Encodes user password and saves user details to database
     * 
     * @param userDetails to save to database
     */
    public User addUser(UserDTO userDetails) {
		User user = new User();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(userDetails.getPassword());
		user.setUsername(userDetails.getUsername());
		user.setEmail(userDetails.getEmail());
        user.setPassword(encodedPassword);
		user.setFirstName(userDetails.getFirstName());
		user.setLastName(userDetails.getLastName());
		user.setLocation(userDetails.getLocation());
        return repo.save(user);
    }

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = repo.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
	}

	public User findInRepoByUsername(String username) {
		return repo.findByUsername(username);
	}

	public User findInRepoById(Long id) {
		return repo.findById(id).get();
	}

}