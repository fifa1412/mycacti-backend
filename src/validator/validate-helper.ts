export const isEmpty = (value) =>{ 
    if(typeof value == 'undefined' || value == null || value == ""){
        return true;
    }else{
        return false;
    }
}