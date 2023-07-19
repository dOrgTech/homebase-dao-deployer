'use strict';var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{'default':mod};};Object.defineProperty(exports,'__esModule',{value:true});exports.TableStatusBadge=exports.ProposalStatus=void 0;const jsx_runtime_1=require('react/jsx-runtime');const core_1=require('@material-ui/core');const styles_1=require('@material-ui/core/styles');const hex_to_rgba_1=__importDefault(require('hex-to-rgba'));var ProposalStatus;(function(ProposalStatus){ProposalStatus['ACTIVE']='active';ProposalStatus['CLOSED']='closed';}(ProposalStatus||(exports.ProposalStatus=ProposalStatus={})));const getStatusColor=(status,theme)=>{const statusToColor={[ProposalStatus.ACTIVE]:theme.palette.secondary.main,[ProposalStatus.CLOSED]:'#7e496f'};return statusToColor[status];};const Badge=(0,styles_1.styled)(core_1.Grid)(({status,theme})=>({'borderRadius':4,'boxSizing':'border-box','minWidth':87,'textAlign':'center','padding':'2px 16px','background':(0,hex_to_rgba_1.default)(getStatusColor(status,theme),0.4),'color':getStatusColor(status,theme),'& > div':{height:'100%'}}));const Text=(0,styles_1.styled)(core_1.Typography)({fontWeight:500,fontSize:16});const TableStatusBadge=({status})=>(0,jsx_runtime_1.jsx)(Badge,{status:status,children:(0,jsx_runtime_1.jsx)(core_1.Grid,{container:true,alignItems:'center',justifyContent:'center',children:(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsxs)(Text,{children:[' ',status.toUpperCase(),' ']})})})});exports.TableStatusBadge=TableStatusBadge;