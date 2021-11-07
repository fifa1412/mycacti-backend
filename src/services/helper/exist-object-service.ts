import { ScientificSubFamilyEntity } from "../../entity/scientific-sub-family";
import { ScientificGenusEntity } from "../../entity/scientific-genus";
import { FirebaseImagesEntity } from "../../entity/firebase-images";

export const subFamilyName = async (subFamilyname) => {
   const object = await ScientificSubFamilyEntity.findOne({ name: subFamilyname })
   if(typeof object == 'undefined'){
      return false;
   }else{
      return true;
   }
}

export const genusName = async (genusName) => {
   const object = await ScientificGenusEntity.findOne({ name: genusName })
   if(typeof object == 'undefined'){
      return false;
   }else{
      return true;
   }
}

export const subFamilyId = async (id) => {
   const object = await ScientificSubFamilyEntity.findOne({ id: id })
   if(typeof object == 'undefined'){
      return false;
   }else{
      return true;
   }
}

export const genusId = async (id) => {
   const object = await ScientificGenusEntity.findOne({ id: id })
   if(typeof object == 'undefined'){
      return false;
   }else{
      return true;
   }
}

export const subFamilyIdInGenus = async (id) => {
   const object = await ScientificGenusEntity.findOne({ subFamilyId: id })
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