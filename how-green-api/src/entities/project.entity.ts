import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user!: User;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    score?: string;

    @Column()
    status!: boolean;

    @CreateDateColumn()
    created_at!: Date;
}
