import { configUatList } from "./config/config-uat";
import { configProdList } from "./config/config-prod";

export const config = configUatList;

// export const config = (key) => {
//     /*if(environment == "development"){
//         return configUatList[key];
//     }else{
//         return configProdList[key]; 
//     }*/

//     // fix always return dev env //
//     return configUatList[key];
    
// }