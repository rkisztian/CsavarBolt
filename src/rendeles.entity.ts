import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Rendeles {
    @PrimaryGeneratedColumn()
    if: number;

    @Column()
    csavar_id: number;

    @Column()
    db: number;
}