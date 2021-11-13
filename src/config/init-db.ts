import { createConnection } from "typeorm";

import { FirebaseImagesEntity } from "../entity/firebase-images";
import { ScientificSubFamilyEntity } from "../entity/scientific-sub-family";
import { ScientificGenusEntity } from "../entity/scientific-genus";
import { ScientificSpeciesEntity } from "../entity/scientific-species";

export async function initDatabaseConnection(environment) {
    const connection = await createConnection(environment);
    FirebaseImagesEntity.useConnection(connection);
    ScientificSubFamilyEntity.useConnection(connection);
    ScientificGenusEntity.useConnection(connection);
    ScientificSpeciesEntity.useConnection(connection);
}