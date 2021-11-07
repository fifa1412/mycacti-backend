import * as express from "express";
import * as ImageController from './../../controller/image-controller';
import * as PlantDataController from './../../controller/plant-data-controller';

const Multer = require('multer');
const multer = Multer({storage: Multer.memoryStorage()});
const router = express.Router();

// App: Image Group //
router.post('/upload-image', multer.single("image_file"), ImageController.uploadImage)

// Manage Plant Data : Subfamily //
router.get('/plant-data/subfamily/list', PlantDataController.userGetSubFamilyList)
router.post('/plant-data/subfamily/add', PlantDataController.userAddSubFamily)
//router.put('/plant-data/subfamily/edit/:id', PlantDataController.userEditSubFamily)
//router.delete('/plant-data/subfamily/delete/:id', PlantDataController.userDeleteSubFamily)

export default router;