import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from "typeorm";

import { TableName } from '../config/table-name'

@Entity(TableName.SCIENTIFIC_SPECIES)
export class ScientificSpeciesEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    genusId: Number;

    @Column()
    species: String;

    @Column()
    variety: String;

    @Column()
    forma: String;

    @Column()
    cultivation: String;

    @Column()
    fieldNumber: String;

    @Column()
    commonName: String;

    @Column()
    note: String;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    
}
