import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Appliance {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToMany(type => Project, project => project.id)
    @JoinTable()
    projectId!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    score?: string;

    @Column()
    energyConsumptionPerYear!: number;

    @Column()
    wattage!: number;

    @CreateDateColumn()
    created_at!: Date;
}
