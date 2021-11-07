import { ResponseEntity } from '../response/base-response';
import { ScientificSubFamilyEntity } from "../entity/scientific-sub-family";
import { TableName } from '../config/table-name';
import { isUnmappedImageCode } from '../services/helper/exist-object-service';
import * as IsExist from '../services/helper/exist-object-service';
import * as Validate from './validate-helper';


export const validateUserAddSubFamily = async (req) =>{
    let errorCodeList = [];
    const { 
        name = null, // required
        subFamilyImageCode = null // if(required) => not mapped
    } = req.body;

    if(Validate.isEmpty(name) == true){
        errorCodeList.push(`name(String): is required`)
    }else{
        if(await IsExist.subFamilyname(name) == true){
            errorCodeList.push(`name(String): cannot be duplicate name`)
        }
    }
    if(Validate.isEmpty(subFamilyImageCode) == false){
        if(await IsExist.isUnmappedImageCode(subFamilyImageCode) == false){
            errorCodeList.push(`subFamilyImageCode(String): imageCode not available`)
        }
    }
    
    // Response Back To Controller //
    let returnObject = {success: true, errorCodeList: errorCodeList};
    if(errorCodeList.length != 0){returnObject.success = false;}
    return returnObject;

} 


