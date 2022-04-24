import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: number;

    @Column()
    token!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @Column()
    expired_at!: Date;
}
