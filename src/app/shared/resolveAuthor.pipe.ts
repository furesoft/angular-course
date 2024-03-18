import { Pipe, PipeTransform } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Pipe({
    name: "resolveAuthor"
})
export class ResolveAuthorPipe implements PipeTransform {
    constructor(private auth: AuthService) {

    }

    async transform(value: any, ...args: any[]) {
        const user = await this.auth.getUserById(value);

        return user.username;
    }
}