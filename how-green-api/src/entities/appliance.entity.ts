import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Appliance {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Project, project => project.id, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'projectId', referencedColumnName: 'id' })
    project!: Project;

    @Column()
    name!: string;

    @Column()
    description?: string;

    @Column()
    energyEfficiencyClass!: number;

    @Column()
    energyConsumptionPerYear?: number;

    @Column()
    wattage?: number;

    @CreateDateColumn()
    createdAt!: Date;
}
