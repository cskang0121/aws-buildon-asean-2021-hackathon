// package com.javawarriors.buyerside.controllers;

// import com.javawarriors.buyerside.entities.*;
// import com.javawarriors.buyerside.services.*;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.RequestBody;

// @CrossOrigin(origins={ "http://localhost:3000" })
// @Controller
// public class UserController {
//     @Autowired
//     private UserService userService;
    
//     /**
//      * Open index page
//      * 
//      * @return path to index.html
//      */
//     @GetMapping("/index")
//     public String viewIndexPage() {
//         return "index";
//     }

//     /**
//      * Open registration page
//      * 
//      * @return path to signup_form.html
//      */
//     @GetMapping("/register")
//     public String showSignUpForm(Model model) {
//         model.addAttribute("user", new User());
//         return "signup_form";
//     }

//     /**
//      * Save user information from signup form to database.
//      * 
//      * @param user to set.
//      * @return path to user/register_successful.html.
//      */
//     @PostMapping("/process_register")
//     public String processRegistration(@RequestBody User user) {
//         try {
//             userService.addUser(user);
//         } catch (Exception e) {
//             return "register_fail";
//         }
//         return "register_success";
//     }

//     @GetMapping("/register/error")
//     public String error() {
//         return "error";
//     }

//     /**
//      * Open home page
//      * 
//      * @return path to "home.html"
//      */
//     @GetMapping("/home")
//     public String viewHomePage() {
//         return "home";
//     }

//     /**
//      * Delete user information from database
//      * 
//      * @return path to "index.html"
//      */
//     @PostMapping("/delete_account")
//     public String confirmDeleteUser() {
//         return "confirm_delete";
//     }

//     @GetMapping("/confirm_delete")
//     public String deleteUser() {
//         userService.deleteByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
//         return "delete_success";
//     }

//     @GetMapping("/after_logout")
//     public String afterLogout() {
//         return "after_logout";
//     }

//     @GetMapping("/login")
//     public String login() {
//         return "login";
//     }

// }
