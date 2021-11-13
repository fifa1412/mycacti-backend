import * as express from "express";
import * as ImageController from './../../controller/image-controller';
import * as PlantDataController from './../../controller/plant-data-controller';

const Multer = require('multer');
const multer = Multer({storage: Multer.memoryStorage()});
const router = express.Router();

// App: Image Group //
router.post('/upload-image', multer.single("image_file"), ImageController.uploadImage)

// Manage Plant Data : Subfamily (อนุวงศ์) //
router.get('/plant-data/subfamily/list', PlantDataController.userGetSubFamilyList)
router.post('/plant-data/subfamily/add', PlantDataController.userAddSubFamily)
router.put('/plant-data/subfamily/edit/:id', PlantDataController.userEditSubFamily)
router.delete('/plant-data/subfamily/delete/:id', PlantDataController.userDeleteSubFamily)

// Manage Plant Data : Genus (วงศ์) //
router.get('/plant-data/genus/list', PlantDataController.userGetGenusList)
router.post('/plant-data/genus/add', PlantDataController.userAddGenus)
router.put('/plant-data/genus/edit/:id', PlantDataController.userEditGenus)
router.delete('/plant-data/genus/delete/:id', PlantDataController.userDeleteGenus)

// Manage Plant Data : Species (วงศ์) //
router.get('/plant-data/species/list', PlantDataController.userGetSpeciesList)
router.post('/plant-data/species/add', PlantDataController.userAddSpecies)

export default router;