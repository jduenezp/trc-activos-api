import internal = require("stream")
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, JoinTable } from "typeorm"

@Entity("informacion", {schema: "trc_activos"})
export class Informacion {

    @PrimaryGeneratedColumn()
    oid: number

    @Column()
    sistema: string
    
    @Column()
    usuario_sistema: string
    
    @Column()
    ip: string
    
    @Column()
    nombre_equipo: string
    
    @Column()
    usuario_red: string
    
    @Column()
    nombre_persona: string
    
    @Column()
    puesto: string
    

}
