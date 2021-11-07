import { createConnection } from "typeorm";

import { FirebaseImagesEntity } from "../entity/firebase-images";
import { ScientificSubFamilyEntity } from "../entity/scientific-sub-family";

export async function initDatabaseConnection(environment) {
    const connection = await createConnection(environment);
    FirebaseImagesEntity.useConnection(connection);
    ScientificSubFamilyEntity.useConnection(connection);
}