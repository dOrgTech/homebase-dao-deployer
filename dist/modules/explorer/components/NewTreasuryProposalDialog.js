'use strict';var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){if(k2===undefined)k2=k;var desc=Object.getOwnPropertyDescriptor(m,k);if(!desc||('get'in desc?!m.__esModule:desc.writable||desc.configurable)){desc={enumerable:true,get:function(){return m[k];}};}Object.defineProperty(o,k2,desc);}:function(o,m,k,k2){if(k2===undefined)k2=k;o[k2]=m[k];});var __setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,'default',{enumerable:true,value:v});}:function(o,v){o['default']=v;});var __importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(mod!=null)for(var k in mod)if(k!=='default'&&Object.prototype.hasOwnProperty.call(mod,k))__createBinding(result,mod,k);__setModuleDefault(result,mod);return result;};var __rest=this&&this.__rest||function(s,e){var t={};for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0)t[p]=s[p];if(s!=null&&typeof Object.getOwnPropertySymbols==='function')for(var i=0,p=Object.getOwnPropertySymbols(s);i<p.length;i++){if(e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i]))t[p[i]]=s[p[i]];}return t;};var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{'default':mod};};Object.defineProperty(exports,'__esModule',{value:true});exports.NewTreasuryProposalDialog=exports.treasuryProposalFormInitialState=exports.treasuryProposalFormSchema=void 0;const jsx_runtime_1=require('react/jsx-runtime');const react_1=__importStar(require('react'));const core_1=require('@material-ui/core');const useDAO_1=require('../../../services/services/dao/hooks/useDAO');const useDAOHoldings_1=require('../../../services/contracts/baseDAO/hooks/useDAOHoldings');const ErrorText_1=require('./styled/ErrorText');const Yup=__importStar(require('yup'));const bignumber_js_1=__importDefault(require('bignumber.js'));const lab_1=require('@material-ui/lab');const react_hook_form_1=require('react-hook-form');const useTezosBalance_1=require('../../../services/contracts/baseDAO/hooks/useTezosBalance');const ProposalFormInput_1=require('./ProposalFormInput');const BatchBar_1=require('./BatchBar');const router_1=require('../pages/DAO/router');const AmountText=(0,core_1.styled)(core_1.Typography)(({theme})=>({color:theme.palette.secondary.main,fontSize:14,lineHeight:'146.3%',marginRight:10}));const DAOBalanceText=(0,core_1.styled)(core_1.Typography)({color:'#ffff',fontSize:14,lineHeight:'100%',marginRight:10});const CustomErrorText=(0,core_1.styled)(ErrorText_1.ErrorText)({textTransform:'capitalize'});const AutoCompletePaper=(0,core_1.styled)(core_1.Paper)({background:'#24282B'});const AmountContainer=(0,core_1.styled)(core_1.Grid)(({theme})=>({[theme.breakpoints.down('sm')]:{paddingRight:0}}));const AutoCompleteField=(0,core_1.styled)(lab_1.Autocomplete)({'& .MuiInputLabel-root':{display:'none'},'& .MuiAutocomplete-inputRoot':{padding:0},'& label + .MuiInput-formControl':{marginTop:'0'},'& .MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-child':{padding:0}});const CustomLabelContainer=(0,core_1.styled)(core_1.Grid)({marginBottom:18});const CustomMaxLabel=(0,core_1.styled)(core_1.Typography)({fontSize:16,paddingBottom:5,textDecoration:'underline',textUnderlineOffset:6,cursor:'pointer'});const DaoBalance=(0,core_1.styled)(core_1.Grid)({height:20});const CurrentAsset=(0,core_1.styled)(core_1.Typography)({opacity:0.7});exports.treasuryProposalFormSchema=Yup.object().shape({transferForm:Yup.object().shape({transfers:Yup.array().of(Yup.object().shape({amount:Yup.number().required('Required').positive('Should be positive'),recipient:Yup.string().required('Required')}))})});const emptyTransfer={recipient:'',amount:0};exports.treasuryProposalFormInitialState={transferForm:{transfers:[emptyTransfer],isBatch:false}};const NewTreasuryProposalDialog=({open})=>{var _a,_b,_c,_d,_e,_f,_g,_h,_j;const {control,getValues,setValue,watch,reset,formState:{errors,touchedFields:touched}}=(0,react_hook_form_1.useFormContext)();const {fields,append}=(0,react_hook_form_1.useFieldArray)({control,name:'transferForm.transfers'});const values=getValues();const [isBatch,setIsBatch]=(0,react_1.useState)(values.transferForm.isBatch);const theme=(0,core_1.useTheme)();const isMobileSmall=(0,core_1.useMediaQuery)(theme.breakpoints.down('sm'));const [activeTransfer,setActiveTransfer]=react_1.default.useState(1);const daoId=(0,router_1.useDAOID)();const {data:daoData,ledger}=(0,useDAO_1.useDAO)(daoId);const dao=daoData;const {tokenHoldings:daoHoldings}=(0,useDAOHoldings_1.useDAOHoldings)(daoId);const {data:tezosBalance}=(0,useTezosBalance_1.useTezosBalance)(daoId);const [showMax,setShowMax]=react_1.default.useState(false);const [max,setMax]=react_1.default.useState(0);const [index,setIndex]=react_1.default.useState(0);const handleIsBatchChange=()=>{setIsBatch(!isBatch);setValue('transferForm.isBatch',!isBatch);setActiveTransfer(1);};const recipientError=(_c=(_b=(_a=errors.transferForm)===null||_a===void 0?void 0:_a.transfers)===null||_b===void 0?void 0:_b[activeTransfer-1])===null||_c===void 0?void 0:_c.recipient;const amountError=(_f=(_e=(_d=errors.transferForm)===null||_d===void 0?void 0:_d.transfers)===null||_e===void 0?void 0:_e[activeTransfer-1])===null||_f===void 0?void 0:_f.amount;const assetsError=(_j=(_h=(_g=errors.transferForm)===null||_g===void 0?void 0:_g.transfers)===null||_h===void 0?void 0:_h[activeTransfer-1])===null||_j===void 0?void 0:_j.asset;const {transfers}=watch('transferForm');const currentTransfer=transfers[activeTransfer-1];const daoAssets=daoHoldings?[...daoHoldings,{balance:tezosBalance||new bignumber_js_1.default(0),token:{symbol:'XTZ'}}]:[];const assetOptions=daoAssets.filter(a=>a.token.symbol).map(a=>a.token);const currentAssetBalance=daoAssets.find(asset=>{var _a;return currentTransfer!==undefined?asset.token.symbol===((_a=currentTransfer.asset)===null||_a===void 0?void 0:_a.symbol):null;});(0,react_1.useMemo)(()=>{if(!open){setMax(0);setShowMax(false);reset();}},[open,reset]);(0,react_1.useEffect)(()=>{var _a;let result=0;if(currentTransfer!==undefined&&((_a=currentTransfer.asset)===null||_a===void 0?void 0:_a.symbol.toString())!=='XTZ'){result=(currentAssetBalance?currentAssetBalance===null||currentAssetBalance===void 0?void 0:currentAssetBalance.balance.toNumber():0)-(ledger&&ledger[0]?ledger[0].staked.toNumber():0);}else{result=currentAssetBalance?currentAssetBalance===null||currentAssetBalance===void 0?void 0:currentAssetBalance.balance.toNumber():0;}setMax(result);},[index,setValue,max,currentAssetBalance,currentTransfer,ledger]);return(0,jsx_runtime_1.jsx)(core_1.DialogContent,{style:{paddingBottom:29},children:(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,direction:'column',style:{gap:31},children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(BatchBar_1.BatchBar,{isBatch:isBatch,stateIsBatch:values.transferForm.isBatch,handleIsBatchChange:handleIsBatchChange,onClickAdd:()=>{append(emptyTransfer);setActiveTransfer(activeTransfer+1);},items:values.transferForm.transfers,activeItem:activeTransfer,setActiveItem:index=>setActiveTransfer(index+1)})}),fields.map((field,index)=>{var _a,_b,_c,_d,_e,_f,_g,_h,_j,_k,_l;return index===activeTransfer-1&&(0,jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment,{children:[(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,direction:'column',children:[(0,jsx_runtime_1.jsx)(ProposalFormInput_1.ProposalFormInput,{label:'Recipient',children:(0,jsx_runtime_1.jsx)(react_hook_form_1.Controller,{name:`transferForm.transfers.${index}.recipient`,control:control,rules:{required:true},render:({field})=>(0,jsx_runtime_1.jsx)(core_1.TextField,Object.assign({},field,{type:'string',InputProps:{disableUnderline:true},placeholder:'Type an Address Here'}))},field.id)}),recipientError&&((_c=(_b=(_a=errors.transferForm)===null||_a===void 0?void 0:_a.transfers)===null||_b===void 0?void 0:_b[activeTransfer-1])===null||_c===void 0?void 0:_c.recipient)?(0,jsx_runtime_1.jsx)(CustomErrorText,{children:recipientError.type}):null]}),(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,style:{gap:26},children:[(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,xs:isMobileSmall?12:6,children:[(0,jsx_runtime_1.jsx)(ProposalFormInput_1.ProposalFormInput,{label:'Asset',children:(0,jsx_runtime_1.jsx)(react_hook_form_1.Controller,{name:`transferForm.transfers.${index}.asset`,control:control,rules:{required:true},render:_a=>{var _b=_a.field,{onChange}=_b,props=__rest(_b,['onChange']);return(0,jsx_runtime_1.jsx)(AutoCompleteField,Object.assign({options:assetOptions||[],PaperComponent:AutoCompletePaper,getOptionLabel:option=>option.symbol,renderInput:params=>(0,jsx_runtime_1.jsx)(core_1.TextField,Object.assign({},params,{InputProps:Object.assign(Object.assign({},params.InputProps),{disableUnderline:true}),label:'Select asset'})),onChange:(e,data)=>{data!==null?setShowMax(true):setShowMax(false);setValue(`transferForm.transfers.${index}.amount`,0);onChange(data);setIndex(index);}},props));}},field.id)}),assetsError&&((_f=(_e=(_d=errors.transferForm)===null||_d===void 0?void 0:_d.transfers)===null||_e===void 0?void 0:_e[activeTransfer-1])===null||_f===void 0?void 0:_f.asset)?(0,jsx_runtime_1.jsx)(CustomErrorText,{children:assetsError.type}):null]}),(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,xs:isMobileSmall?12:true,children:[(0,jsx_runtime_1.jsxs)(CustomLabelContainer,{container:true,direction:'row',item:true,justifyContent:'space-between',children:[(0,jsx_runtime_1.jsx)(core_1.Typography,{children:'Amount'}),showMax?(0,jsx_runtime_1.jsx)(CustomMaxLabel,{color:'secondary',onClick:()=>{setValue(`transferForm.transfers.${index}.amount`,max);},children:'Use Max'}):null]}),(0,jsx_runtime_1.jsx)(ProposalFormInput_1.ProposalFormInput,{children:(0,jsx_runtime_1.jsx)(react_hook_form_1.Controller,{name:`transferForm.transfers.${index}.amount`,control:control,rules:{validate:()=>{return getValues(`transferForm.transfers.${index}.amount`)>0;}},render:({field})=>{var _a;return(0,jsx_runtime_1.jsx)(core_1.TextField,Object.assign({},field,{type:'tel',placeholder:'0',InputProps:{inputProps:{step:0.01,min:dao&&dao.data.extra.min_xtz_amount,max:dao&&dao.data.extra.max_xtz_amount},disableUnderline:true,endAdornment:(0,jsx_runtime_1.jsx)(core_1.InputAdornment,{position:'start',children:(0,jsx_runtime_1.jsxs)(CurrentAsset,{color:'textPrimary',variant:'subtitle2',children:[' ',((_a=values.transferForm.transfers[activeTransfer-1].asset)===null||_a===void 0?void 0:_a.symbol)||'-']})})}}));}},field.id)}),amountError&&((_j=(_h=(_g=errors.transferForm)===null||_g===void 0?void 0:_g.transfers)===null||_h===void 0?void 0:_h[activeTransfer-1])===null||_j===void 0?void 0:_j.amount)?(0,jsx_runtime_1.jsx)(ErrorText_1.ErrorText,{children:'Must be greater than zero'}):null]}),(0,jsx_runtime_1.jsxs)(DaoBalance,{container:true,direction:'row',alignItems:'center',justifyContent:'space-between',children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,xs:6,children:(0,jsx_runtime_1.jsx)(DAOBalanceText,{children:'DAO Balance'})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,xs:6,children:daoAssets?(0,jsx_runtime_1.jsxs)(AmountContainer,{item:true,container:true,direction:'row',justifyContent:'flex-end',children:[currentAssetBalance!==undefined&&currentTransfer!==undefined&&((_k=currentTransfer.asset)===null||_k===void 0?void 0:_k.symbol.toString())!=='XTZ'?(0,jsx_runtime_1.jsx)(AmountText,{children:((currentAssetBalance?currentAssetBalance===null||currentAssetBalance===void 0?void 0:currentAssetBalance.balance.toNumber():0)-(ledger&&ledger[0]?ledger[0].staked.toNumber():0)).toString()||'-'}):currentAssetBalance!==undefined&&currentTransfer!==undefined?(0,jsx_runtime_1.jsx)(AmountText,{children:(currentAssetBalance===null||currentAssetBalance===void 0?void 0:currentAssetBalance.balance.toString())||'-'}):null,(0,jsx_runtime_1.jsx)(AmountText,{children:currentTransfer!==undefined&&((_l=currentTransfer.asset)===null||_l===void 0?void 0:_l.symbol.toString())||'-'})]}):null})]})]})]});})]})});};exports.NewTreasuryProposalDialog=NewTreasuryProposalDialog;