import { config } from '../config';
import { ResponseEntity } from '../response/base-response';
import { ScientificSubFamilyEntity } from '../entity/scientific-sub-family';
import { ScientificGenusEntity } from '../entity/scientific-genus';
import * as AppValidator from '../validator/app-validator';
import { TableName } from '../config/table-name';

import * as IsExist from '../services/helper/exist-object-service';


////////// SUB FAMILY AREA //////////
////////// SUB FAMILY AREA //////////
////////// SUB FAMILY AREA //////////

export const userGetSubFamilyList = async (req, res) =>{
    const subFamilyList = await ScientificSubFamilyEntity.getRepository().query(
        `SELECT scientific_sub_family.id, scientific_sub_family.name, if(count_sub_family.count>0,count_sub_family.count,0) as genusCount 
        FROM ${TableName.SCIENTIFIC_SUB_FAMILY} as scientific_sub_family 
        LEFT JOIN (
            SELECT subFamilyId, count(*) as count FROM  ${TableName.SCIENTIFIC_GENUS} as scientific_genus GROUP BY subFamilyId
        ) as count_sub_family ON count_sub_family.subFamilyId = scientific_sub_family.id
        ORDER BY scientific_sub_family.created DESC`);

    return res.status(200).send(
        await ResponseEntity({ 
            success: true,
            message: "User get subfamily list successfully",
            data: subFamilyList
        })
    );
}

export const userAddSubFamily = async (req, res) =>{
    let { name } = req.body;

    // validate input //
    let validate = await AppValidator.validateUserAddSubFamily(req)
    if(validate.success == false){
        return res.status(400).send(await ResponseEntity({ success: false, message: "Input Validation Error", data: validate.errorCodeList, code: 400}));
    }

    let newSubfamilyObject = new ScientificSubFamilyEntity();
        newSubfamilyObject.name = name
    const insertObject = await ScientificSubFamilyEntity.save(newSubfamilyObject);

    return res.status(200).send(
        await ResponseEntity({ 
            success: true,
            message: "User add subfamily successfully",
            data: insertObject
        })
    );
}

export const userEditSubFamily = async (req, res) =>{
    const { id: id } = req.params
    const { name = null} = req.body;

    // validate input //
    let validate = await AppValidator.validateUserEditSubFamily(req)
    if(validate.success == false){
        return res.status(400).send(await ResponseEntity({ success: false, message: "Input Validation Error", data: validate.errorCodeList, code: 400}));
    }

    await ScientificSubFamilyEntity.createQueryBuilder(TableName.SCIENTIFIC_SUB_FAMILY)
            .where({ id: id })
            .update({ name: name })
            .execute()

    return res.status(200).send(
        await ResponseEntity({ 
            success: true,
            message: "User edit subfamily successfully",
            data: null
        })
    );
}

export const userDeleteSubFamily = async (req, res) =>{
    const { id: id } = req.params

    // validate input //
    let validate = await AppValidator.validateUserDeleteSubFamily(req)
    if(validate.success == false){
        return res.status(400).send(await ResponseEntity({ success: false, message: "Input Validation Error", data: validate.errorCodeList, code: 400}));
    }

    // check cascade for genus //
    if(await IsExist.subFamilyIdInGenus(id) == true){
        return res.status(422).send(await ResponseEntity({ 
            success: false, 
            message: "Delete Cascade Error (This Subfamily Related With Some Genus)", data: null, code: 422}));
    }

    await ScientificSubFamilyEntity.delete({ id: id});

    return res.status(200).send(
        await ResponseEntity({ 
            success: true,
            message: "User delete subfamily successfully",
            data: null
        })
    );
}





////////// GENUS AREA //////////
////////// GENUS AREA //////////
////////// GENUS AREA //////////

export const userGetGenusList = async (req, res) =>{
    const genusList = await ScientificSubFamilyEntity.getRepository().query(
        `SELECT scientific_genus.id, scientific_genus.subFamilyId, scientific_sub_family.name as subFamilyName, scientific_genus.name 
        FROM ${TableName.SCIENTIFIC_GENUS} as scientific_genus
        LEFT JOIN ${TableName.SCIENTIFIC_SUB_FAMILY} as scientific_sub_family ON scientific_sub_family.id = scientific_genus.subFamilyId
        ORDER BY scientific_genus.created DESC`);

    return res.status(200).send(
        await ResponseEntity({ 
            success: true,
            message: "User get genus list successfully",
            data: genusList
        })
    );
}

export const userAddGenus = async (req, res) =>{
    let { name, subFamilyId } = req.body;

    // validate input //
    let validate = await AppValidator.validateUserAddGenus(req)
    if(validate.success == false){
        return res.status(400).send(await ResponseEntity({ success: false, message: "Input Validation Error", data: validate.errorCodeList, code: 400}));
    }

    let newGenusObject = new ScientificGenusEntity();
        newGenusObject.name = name
        newGenusObject.subFamilyId = subFamilyId
    const insertObject = await ScientificGenusEntity.save(newGenusObject);

    return res.status(200).send(
        await ResponseEntity({ 
            success: true,
            message: "User add genus successfully",
            data: insertObject
        })
    );
}

export const userEditGenus = async (req, res) =>{
    const { id: id } = req.params
    const { name = null, subFamilyId = null} = req.body;

    // validate input //
    let validate = await AppValidator.validateUserEditGenus(req)
    if(validate.success == false){
        return res.status(400).send(await ResponseEntity({ success: false, message: "Input Validation Error", data: validate.errorCodeList, code: 400}));
    }

    await ScientificGenusEntity.createQueryBuilder(TableName.SCIENTIFIC_GENUS)
            .where({ id: id })
            .update({ name: name, subFamilyId: subFamilyId })
            .execute()

    return res.status(200).send(
        await ResponseEntity({ 
            success: true,
            message: "User edit genus successfully",
            data: null
        })
    );
}

export const userDeleteGenus = async (req, res) =>{
    const { id: id } = req.params

    // validate input //
    let validate = await AppValidator.validateUserDeleteGenus(req)
    if(validate.success == false){
        return res.status(400).send(await ResponseEntity({ success: false, message: "Input Validation Error", data: validate.errorCodeList, code: 400}));
    }

    await ScientificGenusEntity.delete({ id: id});

    return res.status(200).send(
        await ResponseEntity({ 
            success: true,
            message: "User delete genus successfully",
            data: null
        })
    );
}