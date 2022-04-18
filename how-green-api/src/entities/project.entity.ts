import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    published!: boolean;

    @CreateDateColumn()
    created_at!: Date;
}
