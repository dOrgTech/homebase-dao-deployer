'use strict';var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{'default':mod};};Object.defineProperty(exports,'__esModule',{value:true});exports.ProposalCodeEditorInput=exports.ProposalFormInput=void 0;const jsx_runtime_1=require('react/jsx-runtime');const react_simple_code_editor_1=__importDefault(require('react-simple-code-editor'));const core_1=require('@material-ui/core');const StyledBody=(0,core_1.styled)(core_1.Grid)(({theme})=>({'borderRadius':4,'background':theme.palette.primary.main,'padding':'0 20px','minHeight':54,'& input':{minHeight:54,padding:0,textAlign:'start'},'& .MuiInputBase-input':{fontWeight:300}}));const ProposalFormInput=({label,children})=>{return(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,direction:'column',style:{gap:18},children:[label?(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(core_1.Typography,{style:{fontWeight:400},color:'textPrimary',children:label})}):null,(0,jsx_runtime_1.jsx)(StyledBody,{children:children})]});};exports.ProposalFormInput=ProposalFormInput;const StyledEditorWrapper=(0,core_1.styled)(core_1.Grid)(()=>({'borderRadius':4,'background':'#121416','maxHeight':500,'overflow':'scroll','& input':{maxHeight:500,padding:0,textAlign:'start',overflow:'scroll'},'& .MuiInputBase-input':{fontWeight:300}}));const StyledEditor=(0,core_1.styled)(react_simple_code_editor_1.default)({'& textarea':{outline:'none !important'},'& textarea:focus-visited':{outline:'none !important'}});const ProposalCodeEditorInput=props=>{const {label,containerstyle}=props;return(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,direction:'column',style:Object.assign({gap:18},containerstyle),children:[label?(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(core_1.Typography,{style:{fontWeight:400},color:'textPrimary',children:label})}):null,(0,jsx_runtime_1.jsx)(StyledEditorWrapper,{children:(0,jsx_runtime_1.jsx)(StyledEditor,Object.assign({},props))})]});};exports.ProposalCodeEditorInput=ProposalCodeEditorInput;