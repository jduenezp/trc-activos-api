import internal = require("stream")
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm"
import { Puestos } from "./Puestos"
import { Asentamientos } from "./Asentamientos"
import { Entidades } from "./Entidades"

@Entity("empleados", {schema: "trc_activos"})
export class Empleados {

    @PrimaryColumn({ type: 'varchar', length: 6 })
    clave: string

    @Column()
    nombre: string

    @Column()
    paterno: string
    
    @Column()
    materno: string

    @Column()
    exterior: string

    @Column()
    interior: string
    
    @Column()
    calle: string

    @Column()
    cp:string

    @Column()
    telefono: number;
    
    @Column()
	telefono2: number;

    @Column()
    fecha_nacimiento: string;

    @Column()
    civil: string;

    @Column()
    hijos: number;

    @Column()
    hijosh: number;

    @Column()
    hijosm: number;

    @Column()
    ultima: string;

    @Column()
    contrata: string;

    @Column()
    activo: number;

    @Column()
    sexo: string;

    @Column()
    sindicalizado: boolean;
    
    @Column()
    nombre_completo: string;

    @OneToOne(() => Entidades)
    @JoinColumn({name: 'entidad_oid'})
    entidad: Entidades
    
    @OneToOne(() => Puestos)
    @JoinColumn({name: 'puesto_oid'})
    puesto: Puestos

    @OneToOne(() => Asentamientos)
    @JoinColumn({name: 'asentamiento_oid'})
    asentamiento: Asentamientos

}
