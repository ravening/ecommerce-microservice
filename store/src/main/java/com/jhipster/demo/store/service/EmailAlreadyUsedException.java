package com.jhipster.demo.store.service;

public class EmailAlreadyUsedException extends RuntimeException {

    public EmailAlreadyUsedException() {
        super("Email is already in use!");
    }

}
