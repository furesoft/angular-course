import { Injectable } from "@angular/core";
import PocketBase from 'pocketbase'

@Injectable()
export class EnvironmentService {
    pb = new PocketBase("http://127.0.0.1:8090")
}