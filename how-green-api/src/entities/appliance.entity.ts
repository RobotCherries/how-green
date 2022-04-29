import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';

/**
 * @swagger
 * components:
 *   schemas:
 *     Appliance:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Appliance id
 *           example: 1
 *         name:
 *           type: string
 *           description: Appliance name
 *           example: Coffee Maker
 *         description:
 *           type: string
 *           description: Appliance description
 *           example: Bosch coffee maker
 *         energyClass:
 *           type: number
 *           description: Project energy class score (from 0 meaning A++, the best energy class to 7 meaning F, the worst energy class)
 *           example: 1
 *         energyConsumptionPerYear:
 *           type: number
 *           description: Appliance energy consumption per year (kWh/year)
 *           example: 125
 *         wattage:
 *           type: number
 *           description: Appliance wattage
 *           example: 900
 *         createdAt:
 *           type: string
 *           description: Appliance creation date and time
 *           example: 2022-04-24 12:31:54.439375
 *         projectId:
 *           type: integer
 *           description: Id of the appliance of the project (owned by the current user)
 *           example: 1
 */
@Entity()
export class Appliance {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Project, project => project.id, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'projectId', referencedColumnName: 'id' })
    project!: Project;

    @Column({ nullable: true })
    projectId!: number;

    @Column()
    name!: string;

    @Column({ nullable: true })
    description!: string;

    @Column()
    energyClass!: number;

    @Column({ nullable: true })
    energyConsumptionPerYear!: number;

    @Column({ nullable: true })
    wattage!: number;

    @CreateDateColumn()
    createdAt!: Date;
}
