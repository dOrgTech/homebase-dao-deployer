'use strict';var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){if(k2===undefined)k2=k;var desc=Object.getOwnPropertyDescriptor(m,k);if(!desc||('get'in desc?!m.__esModule:desc.writable||desc.configurable)){desc={enumerable:true,get:function(){return m[k];}};}Object.defineProperty(o,k2,desc);}:function(o,m,k,k2){if(k2===undefined)k2=k;o[k2]=m[k];});var __setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,'default',{enumerable:true,value:v});}:function(o,v){o['default']=v;});var __importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(mod!=null)for(var k in mod)if(k!=='default'&&Object.prototype.hasOwnProperty.call(mod,k))__createBinding(result,mod,k);__setModuleDefault(result,mod);return result;};var __rest=this&&this.__rest||function(s,e){var t={};for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0)t[p]=s[p];if(s!=null&&typeof Object.getOwnPropertySymbols==='function')for(var i=0,p=Object.getOwnPropertySymbols(s);i<p.length;i++){if(e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i]))t[p[i]]=s[p[i]];}return t;};Object.defineProperty(exports,'__esModule',{value:true});exports.NFTTransferForm=exports.nftTransferFormInitialState=exports.nftTransferSchema=void 0;const jsx_runtime_1=require('react/jsx-runtime');const react_1=__importStar(require('react'));const core_1=require('@material-ui/core');const useDAOHoldings_1=require('../../../services/contracts/baseDAO/hooks/useDAOHoldings');const ErrorText_1=require('./styled/ErrorText');const Yup=__importStar(require('yup'));const lab_1=require('@material-ui/lab');const react_hook_form_1=require('react-hook-form');const NFT_1=require('./NFT');const BatchBar_1=require('./BatchBar');const ProposalFormInput_1=require('./ProposalFormInput');const router_1=require('../pages/DAO/router');const AutoCompletePaper=(0,core_1.styled)(core_1.Paper)({background:'#24282B'});const AutoCompleteField=(0,core_1.styled)(lab_1.Autocomplete)({'& .MuiInputLabel-root':{display:'none'},'& .MuiAutocomplete-inputRoot':{padding:0},'& label + .MuiInput-formControl':{marginTop:'0'},'& .MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-child':{padding:0}});const NFTContainer=(0,core_1.styled)(core_1.Grid)({maxHeight:246,maxWidth:272,padding:32,boxSizing:'border-box'});exports.nftTransferSchema=Yup.object().shape({nftTransferForm:Yup.object().shape({transfers:Yup.array().of(Yup.object().shape({amount:Yup.number().required('Required').positive('Should be positive'),recipient:Yup.string().required('Required')}))})});const emptyTransfer={recipient:'',amount:1};exports.nftTransferFormInitialState={nftTransferForm:{transfers:[emptyTransfer],isBatch:false}};const NFTTransferForm=({open})=>{var _a,_b,_c;const {control,getValues,setValue,watch,reset,formState:{errors,touchedFields:touched}}=(0,react_hook_form_1.useFormContext)();const {fields,append}=(0,react_hook_form_1.useFieldArray)({control,name:'nftTransferForm.transfers'});const values=getValues();const [isBatch,setIsBatch]=(0,react_1.useState)(values.nftTransferForm.isBatch);const [activeTransfer,setActiveTransfer]=react_1.default.useState(1);const daoId=(0,router_1.useDAOID)();const {nftHoldings}=(0,useDAOHoldings_1.useDAONFTHoldings)(daoId);const handleIsBatchChange=()=>{setIsBatch(!isBatch);setValue('nftTransferForm.isBatch',!isBatch);setActiveTransfer(1);};const recipientError=(_c=(_b=(_a=errors.nftTransferForm)===null||_a===void 0?void 0:_a.transfers)===null||_b===void 0?void 0:_b[activeTransfer-1])===null||_c===void 0?void 0:_c.recipient;const {transfers}=watch('nftTransferForm');const activeAsset=transfers[activeTransfer-1].asset;const takenNFTs=transfers.map(t=>{var _a,_b;return`${(_a=t.asset)===null||_a===void 0?void 0:_a.contract}-${(_b=t.asset)===null||_b===void 0?void 0:_b.token_id}`;});const nonSelectedNFTs=nftHoldings?nftHoldings.filter(nft=>{var _a,_b;return!takenNFTs.includes(`${(_a=nft===null||nft===void 0?void 0:nft.token)===null||_a===void 0?void 0:_a.contract}-${(_b=nft===null||nft===void 0?void 0:nft.token)===null||_b===void 0?void 0:_b.token_id}`);}):[];const nftOptions=nonSelectedNFTs.map(n=>n.token);(0,react_1.useMemo)(()=>{if(!open){reset();}},[open,reset]);return(0,jsx_runtime_1.jsx)(core_1.DialogContent,{children:(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,direction:'column',style:{gap:31},children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(BatchBar_1.BatchBar,{isBatch:isBatch,stateIsBatch:values.nftTransferForm.isBatch,handleIsBatchChange:handleIsBatchChange,onClickAdd:()=>{append(emptyTransfer);setActiveTransfer(activeTransfer+1);},items:values.nftTransferForm.transfers,activeItem:activeTransfer,setActiveItem:index=>setActiveTransfer(index+1)})}),fields.map((field,index)=>{var _a,_b,_c;return index===activeTransfer-1&&(0,jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment,{children:[(0,jsx_runtime_1.jsxs)(ProposalFormInput_1.ProposalFormInput,{label:'Recipient',children:[(0,jsx_runtime_1.jsx)(react_hook_form_1.Controller,{name:`nftTransferForm.transfers.${index}.recipient`,control:control,render:({field})=>(0,jsx_runtime_1.jsx)(core_1.TextField,Object.assign({},field,{type:'string',placeholder:'Type an Address Here',InputProps:{disableUnderline:true}}))},field.id),recipientError&&((_c=(_b=(_a=touched.nftTransferForm)===null||_a===void 0?void 0:_a.transfers)===null||_b===void 0?void 0:_b[activeTransfer-1])===null||_c===void 0?void 0:_c.recipient)?(0,jsx_runtime_1.jsx)(ErrorText_1.ErrorText,{children:recipientError}):null]}),(0,jsx_runtime_1.jsx)(ProposalFormInput_1.ProposalFormInput,{label:'NFT ID',children:(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,direction:'column',children:[(0,jsx_runtime_1.jsx)(react_hook_form_1.Controller,{name:`nftTransferForm.transfers.${index}.asset`,control:control,render:_a=>{var _b=_a.field,{onChange}=_b,props=__rest(_b,['onChange']);return(0,jsx_runtime_1.jsx)(AutoCompleteField,Object.assign({PaperComponent:AutoCompletePaper,options:nftOptions,getOptionLabel:option=>`${option.symbol}#${option.token_id}`,renderInput:params=>(0,jsx_runtime_1.jsx)(core_1.TextField,Object.assign({},params,{label:'Select NFT',InputProps:Object.assign(Object.assign({},params.InputProps),{disableUnderline:true})})),onChange:(e,data)=>onChange(data)},props));}},field.id),activeAsset&&(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(core_1.Grid,{container:true,justifyContent:'center',children:(0,jsx_runtime_1.jsx)(NFTContainer,{item:true,children:(0,jsx_runtime_1.jsx)(NFT_1.NFT,{qmHash:activeAsset.artifact_hash,name:activeAsset.name,mediaType:activeAsset.mediaType})})})})]})})]});})]})});};exports.NFTTransferForm=NFTTransferForm;