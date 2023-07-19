'use strict';var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{'default':mod};};Object.defineProperty(exports,'__esModule',{value:true});exports.ProposalForm=void 0;const jsx_runtime_1=require('react/jsx-runtime');const material_1=require('@mui/material');const BackButton_1=__importDefault(require('../../../../../common/BackButton'));const Choices_1=require('../../../components/Choices');const ProposalContainer=(0,material_1.styled)(material_1.Grid)(({theme})=>({boxSizing:'border-box',padding:'0px 15px',[theme.breakpoints.down('md')]:{marginTop:30}}));const ProposalChoices=(0,material_1.styled)(material_1.Grid)({flexGrow:1,minHeight:250});const ProposalForm=()=>{return(0,jsx_runtime_1.jsxs)(material_1.Container,{children:[(0,jsx_runtime_1.jsx)(material_1.Grid,{container:true,mx:2,my:3,children:(0,jsx_runtime_1.jsx)(BackButton_1.default,{})}),(0,jsx_runtime_1.jsxs)(material_1.Grid,{container:true,children:[(0,jsx_runtime_1.jsxs)(ProposalContainer,{container:true,flexDirection:'column',style:{gap:30},xs:12,md:6,lg:8,children:[(0,jsx_runtime_1.jsx)(material_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(material_1.TextField,{placeholder:'Proposal Title'})}),(0,jsx_runtime_1.jsx)(material_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(material_1.TextField,{placeholder:'Proposal Details',multiline:true,minRows:15,maxRows:Infinity})})]}),(0,jsx_runtime_1.jsxs)(ProposalContainer,{container:true,flexDirection:'column',style:{gap:30},item:true,xs:12,md:6,lg:4,children:[(0,jsx_runtime_1.jsx)(material_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(material_1.TextField,{placeholder:'Proposal Title'})}),(0,jsx_runtime_1.jsx)(material_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(material_1.TextField,{placeholder:'Proposal Title'})}),(0,jsx_runtime_1.jsx)(ProposalChoices,{children:(0,jsx_runtime_1.jsx)(Choices_1.Choices,{})})]})]})]});};exports.ProposalForm=ProposalForm;