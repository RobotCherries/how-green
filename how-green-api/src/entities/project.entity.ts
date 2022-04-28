import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Project id
 *           example: 1
 *         userId:
 *           type: number
 *           description: Id of the user who created the project
 *           example: 2
 *         title:
 *           type: string
 *           description: Project title
 *           example: Office
 *         description:
 *           type: string
 *           description: Project description
 *           example: The main office of X company
 *         score:
 *           type: number
 *           description: Project energy class score (from 0 meaning A++, the best energy class to 7 meaning F, the worst energy class)
 *           example: 0
 *         createdAt:
 *           type: string
 *           description: Project creation date and time
 *           example: 2022-04-24 12:31:54.439375
 */
@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.id, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user!: User;

    @Column({ nullable: true })
    userId!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    score?: string;

    @CreateDateColumn()
    createdAt!: Date;
}
