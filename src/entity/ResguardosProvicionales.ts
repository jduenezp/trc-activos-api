import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("resguardos_provisionales", {schema: "trc_activos"})
export class Resguardo_Provicional {

    @PrimaryGeneratedColumn()
    oid: number

    @Column()
    no_oficio: string

    @Column()
    anio: number

    @Column()
    dependencia: string

    @Column()
    descripcion: string
    
    @Column()
    proveedor: string

    @Column()
    factura: string

    @Column()
    fecha: Date

    @Column()
    valor: number

    @Column()
    modelo: string

    @Column()
    serie: string
    
    @Column()
    color: string

    @Column()
    no_eco: string

    @Column()
    resguardante: string

    @Column()
    no_nomina: string
    
    @Column()
    observaciones: string

    @Column()
    ubicacion: string

    @Column()
    solicitud_pago: string

    @Column()
    elaboro: string
    
    @Column()
    extra: string

    @Column()
    column15: string

    @Column()
    column16: string

    @Column()
    fecha_factura: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creacion_fecha: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    modificacion_fecha: Date;
}
