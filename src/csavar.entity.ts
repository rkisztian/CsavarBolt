import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Rendeles } from "./rendeles.entity";


@Entity()
export class Csavar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipus: string;

    @Column()
    hossz: number;

    @Column()
    keszlet: number;

    @Column({type: 'decimal',precision: 30, scale: 2})
    ar: number;

    @OneToMany(() => Rendeles, (rendeles) => rendeles.csavar_id)
    rendelesek:Rendeles[]


}