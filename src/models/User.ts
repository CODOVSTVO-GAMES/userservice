import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column()
    userId: string

    @Column()
    accountsId: string

    @Column()
    permission: string

    @Column()
    zone: string

    @Column({ type: "bigint" })
    lastActive: number

    @Column({ type: "bigint" })
    createDate: number
}