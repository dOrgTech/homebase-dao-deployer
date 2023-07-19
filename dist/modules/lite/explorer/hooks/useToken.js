'use strict';var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator['throw'](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{'default':mod};};Object.defineProperty(exports,'__esModule',{value:true});exports.useToken=void 0;const useNotification_1=require('../../../common/hooks/useNotification');const react_1=require('react');const config_1=require('../../../../services/config');const node_fetch_1=__importDefault(require('node-fetch'));const useToken=daoId=>{const [tokenAddress,setTokenAddress]=(0,react_1.useState)('');const openNotification=(0,useNotification_1.useNotification)();(0,react_1.useEffect)(()=>{function fetchData(){return __awaiter(this,void 0,void 0,function*(){try{if(daoId){const communityId=daoId;yield(0,node_fetch_1.default)(`${(0,config_1.getEnv)(config_1.EnvKey.REACT_APP_LITE_API_URL)}/token/${communityId}`).then(response=>__awaiter(this,void 0,void 0,function*(){if(!response.ok){openNotification({message:'An error has occurred',autoHideDuration:2000,variant:'error'});return;}const record=yield response.json();if(!record){return;}setTokenAddress(record.tokenAddress);}));}}catch(_a){return;}});}fetchData();return;},[daoId,setTokenAddress]);return tokenAddress;};exports.useToken=useToken;