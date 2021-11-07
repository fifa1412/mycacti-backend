import * as firebaseAdmin from "firebase-admin";
import { config } from '../config';
import { FirebaseImagesEntity } from "../entity/firebase-images";
import { randomString } from "../services/helper/generate-service";
const serviceAccount = require("../../my-cacti-273be-firebase-adminsdk-wobty-bceb953350.json");
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
const defaultStorage = firebaseAdmin.storage();
const bucket = defaultStorage.bucket(config.firebaseStorageBucketName);

import { ResponseEntity } from '../response/base-response';


export const getFirebaseImgUrlFromId = async (imgId) => {
    let firebaseSignedUrl = null;
    const imageObject = await FirebaseImagesEntity.findOne({ id: imgId })
    if(typeof imageObject == 'undefined'){
        return [];
    }
    const firebaseImagePath = imageObject.imagePath;
    let expiredDateTime = new Date(); 
    expiredDateTime.setHours(expiredDateTime.getHours() + config.firebaseSignedURLExpiredHour);
    
    const file = bucket.file(String(firebaseImagePath));
    await file.getSignedUrl({
        action: 'read',
        expires: expiredDateTime
        }).then(signedUrls => {
            firebaseSignedUrl = signedUrls;
        }
    );

    return firebaseSignedUrl[0];
}

export const mapImageWithObject = async (objectId, objectType, generateMapCode) => {
    let imageId = await FirebaseImagesEntity.findOne({ generateMapCode: generateMapCode, fileStatus: "UNMAPPED" })
    if(imageId === undefined){
        return null;
    }
    // Unmapped Old Image //
    await FirebaseImagesEntity.createQueryBuilder("firebase_images")
            .where({ objectId: objectId, objectType: objectType, fileStatus: "MAPPED" })
            .update({ fileStatus: "DELETED" })
            .execute()
    // Mapped With New Image //
    await FirebaseImagesEntity.createQueryBuilder("firebase_images")
            .where({ generateMapCode: generateMapCode })
            .update({ objectId: objectId, objectType: objectType, fileStatus: "MAPPED" })
            .execute()
    return imageId.id;
}

export const uploadImage = async (req, res) => {
     let fileExtension = req.file.originalname.split(".")[1]
     const fileName = `${config.firebaseImageFolder}/${Date.now()}.${fileExtension}`
     const fileUpload = bucket.file(fileName);
     const blobStream = fileUpload.createWriteStream({
         metadata: {
             contentType: req.file.mimetype
         }
     })

    blobStream.on('error', async (error) => {
        return res.status(405).send(
            await ResponseEntity({ 
                success: false,
                message: error.message,
                data: null
            })
        );
    })

    

    blobStream.on('finish', async () => {
        // create new firebase image //
        let generateMapCode = randomString(16);
        let imageObj = new FirebaseImagesEntity();
        imageObj.imagePath = fileName
        imageObj.objectId = null
        imageObj.objectType = null
        imageObj.fileStatus = "UNMAPPED"
        imageObj.generateMapCode = generateMapCode
        await FirebaseImagesEntity.save(imageObj);

        let returnObject = {
            imageCode: generateMapCode
        }

        return res.status(200).send(
            await ResponseEntity({ 
                success: true,
                message: "User upload image successfully",
                data: returnObject
            })
        );
    })

    blobStream.end(req.file.buffer)

 }
