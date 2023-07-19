'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.Success=void 0;const jsx_runtime_1=require('react/jsx-runtime');const react_1=require('react');const core_1=require('@material-ui/core');const MainButton_1=require('../../../common/MainButton');const Toolbar_1=require('../../../common/Toolbar');const react_router_dom_1=require('react-router-dom');const Blockie_1=require('../../../common/Blockie');const CopyAddress_1=require('../../../common/CopyAddress');const PageContainer=(0,core_1.styled)(core_1.Grid)(({theme})=>({background:theme.palette.primary.main}));const PageContent=(0,core_1.styled)(core_1.Grid)(({theme})=>({marginTop:60,width:'1000px',height:'100%',margin:'auto',padding:'28px 0',flexDirection:'row',paddingTop:0,['@media (max-width:1167px)']:{width:'86vw'},[theme.breakpoints.down('sm')]:{marginTop:10}}));const Title=(0,core_1.styled)(core_1.Typography)({fontSize:24,textAlign:'center'});const CardContainer=(0,core_1.styled)(core_1.Grid)(({theme})=>({background:theme.palette.primary.dark,borderRadius:8,padding:'36px 47px'}));const DescriptionContainer=(0,core_1.styled)(core_1.Grid)(({theme})=>({display:'inline-flex',[theme.breakpoints.down('sm')]:{paddingLeft:'4%',paddingRight:'4%'}}));const OptionsContainer=(0,core_1.styled)(core_1.Grid)(({theme})=>({marginTop:40,[theme.breakpoints.down('sm')]:{paddingLeft:'4%',paddingRight:'4%',marginTop:40}}));const ChoicesContainer=(0,core_1.styled)(core_1.Grid)(({theme})=>({marginTop:50,paddingLeft:'24%',paddingRight:'24%',[theme.breakpoints.down('sm')]:{paddingLeft:'2%',paddingRight:'2%'}}));const DescriptionText=(0,core_1.styled)(core_1.Typography)(({theme})=>({fontWeight:200,color:theme.palette.text.secondary,[theme.breakpoints.down('sm')]:{fontSize:14}}));const OptionButton=(0,core_1.styled)(core_1.Link)(({theme})=>({[theme.breakpoints.down('sm')]:{width:'95%',display:'flex',textAlign:'center'}}));const Success=()=>{const location=(0,react_router_dom_1.useLocation)();const [address,setAddress]=(0,react_1.useState)('');const history=(0,react_router_dom_1.useHistory)();(0,react_1.useEffect)(()=>{if(location&&location.state&&location.state.address){setAddress(location.state.address);}else{history.push('/explorer');}},[location,history]);return(0,jsx_runtime_1.jsx)(jsx_runtime_1.Fragment,{children:(0,jsx_runtime_1.jsxs)(PageContainer,{container:true,direction:'row',children:[(0,jsx_runtime_1.jsx)(Toolbar_1.Navbar,{mode:'creator'}),(0,jsx_runtime_1.jsx)(PageContent,{children:(0,jsx_runtime_1.jsxs)(CardContainer,{children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{container:true,direction:'row',children:(0,jsx_runtime_1.jsx)(Title,{color:'textSecondary',children:'Governance token successfully deployed!'})}),(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,direction:'column',children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(DescriptionText,{style:{marginTop:40,marginBottom:20},children:'Your Token Address:'})}),(0,jsx_runtime_1.jsx)(DescriptionContainer,{item:true,children:(0,jsx_runtime_1.jsxs)(DescriptionText,{style:{display:'inline-flex',alignItems:'center'},children:[(0,jsx_runtime_1.jsx)(Blockie_1.Blockie,{address:address,size:35,style:{marginRight:16}}),address&&(0,jsx_runtime_1.jsx)(CopyAddress_1.CopyAddress,{address:address,typographyProps:{variant:'body1',color:'textSecondary'}})]})}),(0,jsx_runtime_1.jsx)(OptionsContainer,{item:true,children:(0,jsx_runtime_1.jsx)(DescriptionText,{children:'Would you like to continue and create a DAO?'})})]}),(0,jsx_runtime_1.jsxs)(ChoicesContainer,{container:true,direction:'row',alignContent:'center',justifyContent:'center',children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,xs:true,children:(0,jsx_runtime_1.jsx)(OptionButton,{underline:'none',href:`/creator/build/dao`,children:(0,jsx_runtime_1.jsx)(MainButton_1.MainButton,{variant:'contained',color:'secondary',children:'Create DAO'})})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,xs:true,children:(0,jsx_runtime_1.jsx)(OptionButton,{underline:'none',href:`/explorer`,children:(0,jsx_runtime_1.jsx)(core_1.Typography,{color:'secondary',style:{padding:'6px 16px'},children:'I\'m done'})})})]})]})})]})});};exports.Success=Success;