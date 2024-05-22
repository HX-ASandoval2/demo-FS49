import { Injectable } from "@nestjs/common"

@Injectable()
export class UserRepository {
    private users = [
        {
            id:1,
            name:"Pepito",
            email: "pepi@mail.com"
        },
        {
            id:2,
            name:"Pepita",
            email: "pepa@mail.com"
        },
        {
            id:3,
            name:"Mimis",
            email: "mindy@mail.com"
        }
    ]

   getUsers(){
        return this.users
    }
}