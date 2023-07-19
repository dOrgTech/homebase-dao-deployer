'use strict';var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator['throw'](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};Object.defineProperty(exports,'__esModule',{value:true});exports.useAllDAOs=void 0;const react_query_1=require('react-query');const services_1=require('../services');const lite_services_1=require('../../lite/lite-services');const useAllDAOs=network=>{return(0,react_query_1.useQuery)(['daos',network],()=>__awaiter(void 0,void 0,void 0,function*(){const homebase_daos=yield(0,services_1.getDAOs)(network);const lite_daos=yield(0,lite_services_1.getLiteDAOs)(network);return[...homebase_daos,...lite_daos];}),{enabled:!!network});};exports.useAllDAOs=useAllDAOs;