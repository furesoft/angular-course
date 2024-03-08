import { Pipe, PipeTransform } from "@angular/core";
import { AuthService } from "./auth.service";
import { User } from "../models/User";
import { RecordModel } from "pocketbase";

@Pipe({
    name: "resolveAuthor"
})
export class ResolveAuthorPipe implements PipeTransform {
    constructor(private auth: AuthService) {

    }
    
    transform(value: any, ...args: any[]) {
        return this.auth.getUserById(value).then((user: User) => {
            return user.username;
        });
    }
}