package org.mihai.back.services;

import org.mihai.back.models.Customer;

import java.util.List;

public interface CustomerService {

    /**
     * Retrieves a list of all customers.
     *
     * @return A list of `Customer` objects, representing all the customers.
     */
    List<Customer> getCustomers();
}
