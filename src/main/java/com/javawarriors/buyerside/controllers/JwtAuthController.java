package com.javawarriors.buyerside.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

import com.javawarriors.buyerside.services.JwtUserDetailsService;
import com.javawarriors.buyerside.configurations.JwtTokenUtil;
import com.javawarriors.buyerside.entities.User;
import com.javawarriors.buyerside.model.JwtRequest;
import com.javawarriors.buyerside.model.JwtResponse;
import com.javawarriors.buyerside.model.UserDTO;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class JwtAuthController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		final UserDetails userDetails = userDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
	}

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody UserDTO user) throws Exception {
		return ResponseEntity.ok(userDetailsService.addUser(user));
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}

	@RequestMapping(value = "/get-profile", method = RequestMethod.GET)
	public ResponseEntity<?> getUserInfo(Principal user) {
		org.springframework.security.core.userdetails.User userObj = (org.springframework.security.core.userdetails.User)userDetailsService.loadUserByUsername(user.getName());
		User userEntity = userDetailsService.findInRepoByUsername(userObj.getUsername());
		// UserDTO userInfo = new UserDTO();
		// userInfo.setUsername(userObj.getUsername());
		// userInfo.setPassword(userObj.getPassword());
		// userInfo.setEmail(userObj.getEmail());
		// userInfo.setFirstName(userObj.getFirstName());
		// userInfo.setLastName(userObj.getLastName());
		// userInfo.setLocation(userObj.getLocation());

		return ResponseEntity.ok(userEntity);
	}
}