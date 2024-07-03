import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('appointments')
export class Appointments extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: 'date'})
    date!: Date

    @Column({ name: 'user_id'})
    user_id!: number

    @Column({name: 'service_id'})
    service_id!: number

    @Column({name: 'created_at'})
    created_at!: Date

    @Column({name: 'updated_at'})
    updated_at!: Date

}