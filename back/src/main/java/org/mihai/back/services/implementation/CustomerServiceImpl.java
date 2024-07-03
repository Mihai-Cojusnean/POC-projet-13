package org.mihai.back.services.implementation;

import lombok.RequiredArgsConstructor;
import org.mihai.back.models.Customer;
import org.mihai.back.repositories.CustomerRepository;
import org.mihai.back.services.CustomerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepo;

    public List<Customer> getCustomers() {
        return customerRepo.findAll();
    }
}
