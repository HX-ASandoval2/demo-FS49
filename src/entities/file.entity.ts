import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'files' })
export class File {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    mymeType:string;

    @Column({ type:"bytea" })
    data:Buffer;
}