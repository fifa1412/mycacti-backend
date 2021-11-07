import { ResponseEntity } from "../../response/base-response";

const isNumber = async (res, value, fieldName) => {
   if(value > 0 == false){
      return res.status(422).send(await ResponseEntity({ success: false, message: `${fieldName} is not number`, data: null, code: 422}));
   }
}