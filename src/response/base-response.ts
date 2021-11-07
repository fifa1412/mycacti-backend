import { ExceptionList } from "../response/exception-code";

export const ResponseEntity = async (respObj) => {
    let errorMessage = "";
    if(typeof respObj.message == 'undefined' || respObj.message == null){
        errorMessage = "Unknown Error"
    }else{
        errorMessage = respObj.message;
    }

    let errorObject = await translateErrorMessageToCode(respObj.success, errorMessage);
    let returnCode = errorObject.code;
    if(respObj.code != null){ // use defined code if available
        returnCode = respObj.code;
    }
    let responseObject = {
        responseData:{
            success: respObj.success,
            code: returnCode,
            message: errorObject.translateMessage,
            data: respObj.data
        }
         
    }
    return responseObject;
}

const translateErrorMessageToCode = async (isSuccess, sourceMessage) => {
    let error = {
        code: 0,
        translateMessage: sourceMessage
    }

    if(isSuccess == true){
        error.code = 200;
    }else{
        error.code = 500;
    }

    for await (const exception of ExceptionList){
        if(sourceMessage.includes(exception.likeMessage)){
            error.code = exception.code;
            error.translateMessage = exception.translateMessage
            break;
        }
    }

    return error; 
}
