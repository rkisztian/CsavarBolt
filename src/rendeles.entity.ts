import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Csavar } from "./csavar.entity";


@Entity()
export class Rendeles {
    @PrimaryGeneratedColumn()
    if: number;

    @ManyToOne(() => Csavar, (csavar) => csavar.id)
    csavar_id: number;

    @Column()
    db: number;
}