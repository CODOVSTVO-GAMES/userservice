import { Account } from 'src/app.service';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column()
    userId: string

    @Column()
    permission: string

    @Column({ type: "bigint" })
    lastActive: number

    @Column({ type: "bigint" })
    createDate: number

    @Column({ nullable: true, type: 'json' })
    accounts: Account[]
}