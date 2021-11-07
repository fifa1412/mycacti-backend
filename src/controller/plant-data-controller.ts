import { config } from '../config';
import { ResponseEntity } from '../response/base-response';
import { ScientificSubFamilyEntity } from '../entity/scientific-sub-family';
import * as AppValidator from '../validator/app-validator';
import { TableName } from '../config/table-name';


export const userGetSubFamilyList = async (req, res) =>{
    let subFamilyList = await ScientificSubFamilyEntity.getRepository()
        .query(`SELECT * FROM ${TableName.SCIENTIFIC_SUB_FAMILY}`);

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