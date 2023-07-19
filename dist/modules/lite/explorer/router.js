'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.LiteExplorerRouter=void 0;const jsx_runtime_1=require('react/jsx-runtime');const react_router_1=require('react-router');const router_1=require('./pages/CommunityDetails/router');const react_router_dom_1=require('react-router-dom');const core_1=require('@material-ui/core');const Toolbar_1=require('../../explorer/components/Toolbar');const explorer_1=require('./context/ActionSheets/explorer');const PageContainer=(0,core_1.styled)(core_1.Grid)(({theme})=>({background:theme.palette.primary.dark}));const LiteExplorerRouter=()=>{const match=(0,react_router_1.useRouteMatch)();const {id}=(0,react_router_dom_1.useParams)();return(0,jsx_runtime_1.jsxs)(PageContainer,{container:true,direction:'row',children:[(0,jsx_runtime_1.jsx)(Toolbar_1.Navbar,{disableMobileMenu:true}),(0,jsx_runtime_1.jsx)(explorer_1.AppContextProvider,{children:(0,jsx_runtime_1.jsxs)(react_router_1.Switch,{children:[(0,jsx_runtime_1.jsx)(react_router_1.Route,{path:`${match.url}/community`,children:(0,jsx_runtime_1.jsx)(router_1.CommunityDetailsRouter,{id:id})}),(0,jsx_runtime_1.jsx)(react_router_1.Redirect,{to:`${match.url}/community`})]})})]});};exports.LiteExplorerRouter=LiteExplorerRouter;