package org.mihai.back.controllers;

import lombok.RequiredArgsConstructor;
import org.mihai.back.models.Customer;
import org.mihai.back.services.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@CrossOrigin
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping("/api/customers")
    public ResponseEntity<List<Customer>> customer() {
        return ResponseEntity.ok(customerService.getCustomers());
    }
}
