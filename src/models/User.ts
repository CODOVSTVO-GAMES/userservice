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
    zoneId: string

    @Column()
    chunk: string

    @Column({ type: "bigint" })
    lastActive: number

    @Column({ type: "bigint" })
    createDate: number
}