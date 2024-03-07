import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import PocketBase from 'pocketbase';
import { User } from "../models/User";

@Injectable()
export class EnvironmentService {
    pb = new PocketBase('http://127.0.0.1:8090');
    public isLoggedIn: boolean;

    constructor(private router: Router) {

    }

    logout() {
        this.isLoggedIn = false;
    }

    redirectIfNotLoggedIn() {
        if(!this.isLoggedIn) {
            this.router.navigate(["auth"]);
        }
    }

    register(user: User) {
        const data = {
            "username": "noname",
            "email": user.email,
            "emailVisibility": true,
            "password": user.password,
            "passwordConfirm": user.password
        };

        this.pb.collection('users').create(data);
    }

    login(user: User) {
        this.isLoggedIn = true;

        this.router.navigate(["recipes"]);
    }
}