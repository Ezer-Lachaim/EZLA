import { User } from "../models/user";
import client from "./redis-client";

export async function create(uid:string, user:User) {
    return await client.json.set(`user:${uid}`, '$', {...user});
}