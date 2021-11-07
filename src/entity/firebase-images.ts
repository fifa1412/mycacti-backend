import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from "typeorm";

import { TableName } from '../config/table-name'

@Entity(TableName.FIREBASE_IMAGES)
export class FirebaseImagesEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    imagePath: String;

    @Column()
    objectId: Number;

    @Column()
    objectType: String;

    @Column()
    fileStatus: String = "UNMAPPED"; // initial status for upload image

    @Column()
    generateMapCode: String;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

}
