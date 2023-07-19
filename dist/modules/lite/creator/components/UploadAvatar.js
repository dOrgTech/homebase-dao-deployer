'use strict';var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){if(k2===undefined)k2=k;var desc=Object.getOwnPropertyDescriptor(m,k);if(!desc||('get'in desc?!m.__esModule:desc.writable||desc.configurable)){desc={enumerable:true,get:function(){return m[k];}};}Object.defineProperty(o,k2,desc);}:function(o,m,k,k2){if(k2===undefined)k2=k;o[k2]=m[k];});var __setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,'default',{enumerable:true,value:v});}:function(o,v){o['default']=v;});var __importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(mod!=null)for(var k in mod)if(k!=='default'&&Object.prototype.hasOwnProperty.call(mod,k))__createBinding(result,mod,k);__setModuleDefault(result,mod);return result;};Object.defineProperty(exports,'__esModule',{value:true});exports.UploadAvatar=void 0;const jsx_runtime_1=require('react/jsx-runtime');const react_1=__importStar(require('react'));const core_1=require('@material-ui/core');const SmallButton_1=require('../../../common/SmallButton');const AvatarCardContainer=(0,core_1.styled)(core_1.Grid)(({theme})=>({height:'100%',background:theme.palette.primary.dark,borderRadius:8}));const StyledAvatar=(0,core_1.styled)(core_1.Avatar)({width:126,height:126});const AvatarContainer=(0,core_1.styled)(core_1.Grid)(({theme})=>({marginTop:70,marginBottom:30,[theme.breakpoints.down('sm')]:{marginTop:30}}));const AvatarBox=(0,core_1.styled)(core_1.Grid)(({theme})=>({borderBottom:`0.3px solid ${theme.palette.primary.light}`,paddingLeft:26,height:54,display:'grid',alignItems:'center'}));const UploadAvatar=({setFieldValue,values,disabled})=>{const [avatarPreview,setAvatarPreview]=(0,react_1.useState)('');const hiddenFileInput=react_1.default.useRef(null);const handleClick=()=>{var _a;if(hiddenFileInput){(_a=hiddenFileInput.current)===null||_a===void 0?void 0:_a.click();}};return(0,jsx_runtime_1.jsxs)(AvatarCardContainer,{container:true,direction:'column',children:[(0,jsx_runtime_1.jsx)(AvatarBox,{item:true,children:(0,jsx_runtime_1.jsx)(core_1.Typography,{color:'textSecondary',children:'Avatar'})}),(0,jsx_runtime_1.jsxs)(AvatarContainer,{container:true,item:true,style:{gap:28},alignItems:'center',direction:'column',children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(StyledAvatar,{src:avatarPreview})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsxs)(SmallButton_1.SmallButton,{variant:'contained',color:'secondary',onClick:handleClick,children:['Upload',(0,jsx_runtime_1.jsx)('input',{ref:hiddenFileInput,name:'picUri',accept:'image/*',type:'file',style:{display:'none'},onChange:e=>{var _a;const fileReader=new FileReader();fileReader.onload=()=>{if(fileReader.readyState===2){setFieldValue('picUri',fileReader.result);setAvatarPreview(fileReader.result);}};if(e.target&&e.target.files&&((_a=e.target.files)===null||_a===void 0?void 0:_a.length)>0){fileReader.readAsDataURL(e.target.files[0]);}}})]})})]})]});};exports.UploadAvatar=UploadAvatar;