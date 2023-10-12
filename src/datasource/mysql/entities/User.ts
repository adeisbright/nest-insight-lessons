import { Column , PrimaryGeneratedColumn , Entity, Index } from "typeorm"; 

@Entity("users")
export class User {
    @PrimaryGeneratedColumn() 
    id : number 

    @Index({unique : true})
    @Column() 
    email : string

    @Column() 
    first_name : string 
}