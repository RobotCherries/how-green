import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: User id
 *           example: 1
 *         name:
 *           type: string
 *           description: User name
 *           example: Leanne Graham
 *         email:
 *           type: string
 *           description: User email address
 *           example: leanne.graham@gmail.com
 *         password:
 *           type: string
 *           description: User password
 *           example: 1234
 */
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({
        unique: true
    })
    email!: string;

    @Column()
    password!: string;
}
