import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from "typeorm";

import { TableName } from '../config/table-name'

@Entity(TableName.SCIENTIFIC_SUB_FAMILY)
export class ScientificSubFamilyEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column({ name: "name" })
    name: String;

    @Column({ name: "image_id" })
    imageId: Number;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    
}
