import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from "typeorm";

import { TableName } from '../config/table-name'

@Entity(TableName.SCIENTIFIC_GENUS)
export class ScientificGenusEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    subFamilyId: Number;

    @Column()
    name: String;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    
}
