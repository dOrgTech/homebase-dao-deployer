'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.TemplateHeader=void 0;const jsx_runtime_1=require('react/jsx-runtime');const core_1=require('@material-ui/core');const RectangleHeader_1=require('./styled/RectangleHeader');const CopyAddress_1=require('../../common/CopyAddress');const useDAO_1=require('../../../services/services/dao/hooks/useDAO');const router_1=require('../pages/DAO/router');const Container=(0,core_1.styled)(core_1.Grid)(({theme})=>({background:theme.palette.primary.main,boxSizing:'border-box',display:'flex',alignItems:'center'}));const CustomRectangleContainer=(0,core_1.styled)(RectangleHeader_1.RectangleContainer)(({theme})=>({borderBottom:'none',paddingBottom:'0',[theme.breakpoints.down('sm')]:{paddingBottom:40}}));const TemplateHeader=({template,children})=>{const theme=(0,core_1.useTheme)();const isMobileSmall=(0,core_1.useMediaQuery)(theme.breakpoints.down('sm'));const daoId=(0,router_1.useDAOID)();const {data:dao}=(0,useDAO_1.useDAO)(daoId);return(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,xs:12,children:(0,jsx_runtime_1.jsx)(CustomRectangleContainer,{container:true,justifyContent:'space-between',children:(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,xs:12,children:[(0,jsx_runtime_1.jsxs)(Container,{container:true,direction:isMobileSmall?'column':'row',children:[(0,jsx_runtime_1.jsxs)(core_1.Grid,{item:true,xs:12,sm:6,children:[(0,jsx_runtime_1.jsx)(core_1.Typography,{variant:'subtitle1',color:'secondary',align:isMobileSmall?'center':'left',children:dao===null||dao===void 0?void 0:dao.data.name}),(0,jsx_runtime_1.jsx)(core_1.Typography,{variant:'h5',color:'textSecondary',align:isMobileSmall?'center':'left',style:{margin:isMobileSmall?'15px 0 25px 0':0},children:template.charAt(0).toUpperCase()+template.slice(1,template.length)})]}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,xs:12,sm:6,container:true,justifyContent:isMobileSmall?'center':'flex-end',children:children})]}),dao&&!isMobileSmall&&(0,jsx_runtime_1.jsx)(CopyAddress_1.CopyAddress,{address:dao.data.address,justifyContent:isMobileSmall?'center':'flex-start'})]})})});};exports.TemplateHeader=TemplateHeader;