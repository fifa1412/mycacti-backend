import { ResponseEntity } from '../response/base-response';
import { ScientificSubFamilyEntity } from "../entity/scientific-sub-family";
import { TableName } from '../config/table-name';
import { isUnmappedImageCode } from '../services/helper/exist-object-service';
import * as IsExist from '../services/helper/exist-object-service';
import * as Validate from './validate-helper';



////////// SUB FAMILY AREA //////////
////////// SUB FAMILY AREA //////////
////////// SUB FAMILY AREA //////////

export const validateUserAddSubFamily = async (req) =>{
    let errorCodeList = [];
    const { name = null} = req.body;

    if(Validate.isEmpty(name) == true){
        errorCodeList.push(`name(String): is required`)
    }else{
        if(await IsExist.subFamilyName(name) == true){
            errorCodeList.push(`name(String): cannot be duplicate name`)
        }
    }
    
    // Response Back To Controller //
    let returnObject = {success: true, errorCodeList: errorCodeList};
    if(errorCodeList.length != 0){returnObject.success = false;}
    return returnObject;

} 

export const validateUserDeleteSubFamily = async (req) =>{
    let errorCodeList = [];
    const { id: id } = req.params

    if(await IsExist.subFamilyId(id) == false){
        errorCodeList.push(`[Param] subFamilyId(Int): is not found`)
    }
    
    // Response Back To Controller //
    let returnObject = {success: true, errorCodeList: errorCodeList};
    if(errorCodeList.length != 0){returnObject.success = false;}
    return returnObject;

} 

export const validateUserEditSubFamily = async (req) =>{
    let errorCodeList = [];
    const { id: id } = req.params
    const { name = null} = req.body;

    if(await IsExist.subFamilyId(id) == false){
        errorCodeList.push(`[Param] subFamilyId(Int): is not found`)
    }
    if(Validate.isEmpty(name) == true){
        errorCodeList.push(`name(String): is required`)
    }else{
        if(await IsExist.subFamilyName(name) == true){
            errorCodeList.push(`name(String): cannot be duplicate name`)
        }
    }

    // Response Back To Controller //
    let returnObject = {success: true, errorCodeList: errorCodeList};
    if(errorCodeList.length != 0){returnObject.success = false;}
    return returnObject;

} 



////////// GENUS AREA //////////
////////// GENUS AREA //////////
////////// GENUS AREA //////////

export const validateUserAddGenus = async (req) =>{
    let errorCodeList = [];
    const { name = null, subFamilyId = null} = req.body;

    if(Validate.isEmpty(name) == true){
        errorCodeList.push(`name(String): is required`)
    }else{
        if(await IsExist.genusName(name) == true){
            errorCodeList.push(`name(String): cannot be duplicate name`)
        }
    }
    if(Validate.isEmpty(subFamilyId) == true){
        errorCodeList.push(`subFamilyId(Int): is required`)
    }else{
        if(await IsExist.subFamilyId(subFamilyId) == false){
            errorCodeList.push(`subFamilyId(Int): is not found`)
        }
    }
    
    // Response Back To Controller //
    let returnObject = {success: true, errorCodeList: errorCodeList};
    if(errorCodeList.length != 0){returnObject.success = false;}
    return returnObject;

} 


export const validateUserEditGenus = async (req) =>{
    let errorCodeList = [];
    const { id: id } = req.params
    const { name = null, subFamilyId = null} = req.body;

    if(await IsExist.genusId(id) == false){
        errorCodeList.push(`[Param] genusId(Int): is not found`)
    }
    if(Validate.isEmpty(name) == true){
        errorCodeList.push(`name(String): is required`)
    }else{
        if(await IsExist.genusName(name) == true){
            errorCodeList.push(`name(String): cannot be duplicate name`)
        }
    }
    if(Validate.isEmpty(subFamilyId) == true){
        errorCodeList.push(`subFamilyId(Int): is required`)
    }else{
        if(await IsExist.subFamilyId(subFamilyId) == false){
            errorCodeList.push(`subFamilyId(Int): is not found`)
        }
    }

    // Response Back To Controller //
    let returnObject = {success: true, errorCodeList: errorCodeList};
    if(errorCodeList.length != 0){returnObject.success = false;}
    return returnObject;

} 

export const validateUserDeleteGenus = async (req) =>{
    let errorCodeList = [];
    const { id: id } = req.params

    if(await IsExist.genusId(id) == false){
        errorCodeList.push(`[Param] genusId(Int): is not found`)
    }
    
    // Response Back To Controller //
    let returnObject = {success: true, errorCodeList: errorCodeList};
    if(errorCodeList.length != 0){returnObject.success = false;}
    return returnObject;

} 
