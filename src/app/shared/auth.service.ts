import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import PocketBase from 'pocketbase';
import { User } from "../models/User";

@Injectable()
export class AuthService {
    pb = new PocketBase('http://127.0.0.1:8090');
    
    constructor(private router: Router) {
        
    }

    public get isLoggedIn() {
        return this.pb.authStore.isValid;
    }

    getUser() {
        return <User>this.pb.authStore.model;
    }

    logout() {
        this.pb.authStore.clear();

        this.router.navigate(["auth"]);
    }

    redirectIfNotLoggedIn() {
        if (!this.isLoggedIn) {
            this.router.navigate(["auth"]);
        }
    }

    register(user: User) {
        const data = {
            "username": user.username,
            "email": user.email,
            "emailVisibility": true,
            "password": user.password,
            "passwordConfirm": user.password
        };

        this.pb.collection('users').create(data).then(d => {
            console.log(d);
        }).catch(err => {
            console.log(err);
        });
    }

    login(user: User) {
        return this.pb.collection("users").authWithPassword(user.email, user.password).then(d => {
            this.router.navigate(["recipes"]);
        });
    }
}