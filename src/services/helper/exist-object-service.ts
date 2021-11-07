import { ScientificSubFamilyEntity } from "../../entity/scientific-sub-family";
import { FirebaseImagesEntity } from "../../entity/firebase-images";

export const subFamilyname = async (subFamilyname) => {
   const object = await ScientificSubFamilyEntity.findOne({ name: subFamilyname })
   if(typeof object == 'undefined'){
      return false;
   }else{
      return true;
   }
}

export const isUnmappedImageCode = async (code) => {
   const object = await FirebaseImagesEntity.findOne({ generateMapCode : code, fileStatus: 'UNMAPPED' })
   if(typeof object == 'undefined'){
      //return null;
      return false;
   }else{
      //return object.id;
      return true;
   }
}