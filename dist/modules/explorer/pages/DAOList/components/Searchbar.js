'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.SearchInput=void 0;const jsx_runtime_1=require('react/jsx-runtime');const core_1=require('@material-ui/core');const icons_1=require('@material-ui/icons');const StyledInput=(0,core_1.withStyles)(theme=>({root:{'& label.MuiInputLabel-root':{display:'none'},'& div.MuiInputBase-root':{'fontSize':18,'height':54,'boxSizing':'border-box','background':theme.palette.primary.main,'padding':'18px 22px','width':'100%','borderRadius':4,'marginTop':'0px !important','maxWidth':571,'& input':{'color':theme.palette.text.primary,'textAlign':'start','&:placeholder':{opacity:0.8}},'&:focus-visible':{outline:'none'}},'& .MuiInput-underline:before':{borderBottomColor:'transparent'},'& .MuiInput-underline:hover:before':{borderBottomColor:'transparent'},'& .MuiInput-underline:after':{borderBottomColor:'transparent'}},input:{disabled:{}}}))(core_1.TextField);const SearchIcon=(0,core_1.styled)(icons_1.SearchOutlined)({marginRight:5});const SearchInput=({search})=>{return(0,jsx_runtime_1.jsx)(StyledInput,{id:'standard-search',label:'Search field',type:'search',placeholder:'Search',onChange:e=>search(e.target.value),InputProps:{startAdornment:(0,jsx_runtime_1.jsx)(core_1.InputAdornment,{position:'start',children:(0,jsx_runtime_1.jsx)(SearchIcon,{color:'secondary'})})}});};exports.SearchInput=SearchInput;