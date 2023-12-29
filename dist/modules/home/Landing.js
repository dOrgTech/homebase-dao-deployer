'use strict';var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{'default':mod};};Object.defineProperty(exports,'__esModule',{value:true});exports.Landing=void 0;const jsx_runtime_1=require('react/jsx-runtime');const core_1=require('@material-ui/core');const LandingHeader_1=require('./LandingHeader');const homebase_logo_svg_1=__importDefault(require('../../assets/logos/homebase_logo.svg'));const Vector1_svg_1=__importDefault(require('../../assets/vectors/Vector1.svg'));const Vector2_svg_1=__importDefault(require('../../assets/vectors/Vector2.svg'));const GitHub_1=__importDefault(require('@material-ui/icons/GitHub'));const discord_svg_1=require('../../assets/logos/discord.svg');const MainButton_1=require('../common/MainButton');const StyledToolbar=(0,core_1.styled)(core_1.Grid)({padding:'22px 37px',boxSizing:'border-box',height:'86px'});const IconContainer=(0,core_1.styled)('div')({'height':'27px','width':'33px','& > svg':{width:'100%'}});const Background=(0,core_1.styled)(core_1.Grid)({backgroundImage:`url(${Vector1_svg_1.default}), url(${Vector2_svg_1.default})`,backgroundPosition:'top right, bottom right',backgroundRepeat:'no-repeat',height:'100vh'});const MainContainer=(0,core_1.styled)(core_1.Grid)({maxWidth:970,padding:30,boxSizing:'border-box',width:'100%'});const LogoContainer=(0,core_1.styled)(core_1.Box)(({theme})=>({width:408,height:370,[theme.breakpoints.down('xs')]:{width:290,height:265}}));const BigLogo=(0,core_1.styled)('img')({width:'100%',height:'100%'});const TitleText=(0,core_1.styled)(core_1.Typography)(({theme})=>({color:theme.palette.text.primary,fontSize:40,fontWeight:'bold'}));const SubtitleText=(0,core_1.styled)(core_1.Typography)(({theme})=>({color:theme.palette.text.primary,fontWeight:300}));const Landing=()=>{const theme=(0,core_1.useTheme)();const isExtraSmall=(0,core_1.useMediaQuery)(theme.breakpoints.down('xs'));return(0,jsx_runtime_1.jsxs)(Background,{container:true,direction:'column',justifyContent:'space-between',wrap:'nowrap',children:[!isExtraSmall&&(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(LandingHeader_1.Header,{})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(core_1.Grid,{container:true,justifyContent:'center',children:(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(MainContainer,{item:true,children:(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,justifyContent:'space-between',direction:isExtraSmall?'column-reverse':'row',style:isExtraSmall?{gap:50}:{},children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,xs:true,children:(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,direction:'column',style:{gap:32},justifyContent:'center',children:[!isExtraSmall&&(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(TitleText,{children:'Tezos Homebase'})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(SubtitleText,{align:isExtraSmall?'center':'left',children:'Homebase is a web application that enables users to create and manage/use DAOs on the Tezos blockchain. This application aims to help empower community members and developers to launch and participate in Tezos-based DAOs'})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,style:{gap:16},wrap:'nowrap',justifyContent:isExtraSmall?'center':'flex-start',children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(core_1.Link,{href:`/explorer`,underline:'none',children:(0,jsx_runtime_1.jsx)(MainButton_1.MainButton,{variant:'contained',color:'secondary',children:'Enter App'})})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(core_1.Link,{href:'/faq',underline:'none',children:(0,jsx_runtime_1.jsx)(MainButton_1.MainButton,{variant:'contained',color:'secondary',children:'Learn More'})})})]})})]})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,xs:true,children:(0,jsx_runtime_1.jsxs)(core_1.Grid,{container:true,direction:'column',alignItems:'flex-end',justifyContent:'center',style:{gap:20},children:[isExtraSmall&&(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(TitleText,{children:'Tezos Homebase'})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(LogoContainer,{children:(0,jsx_runtime_1.jsx)(BigLogo,{src:homebase_logo_svg_1.default})})})]})})]})})})})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsxs)(StyledToolbar,{container:true,direction:'row',alignItems:'center',wrap:'wrap',justifyContent:isExtraSmall?'center':'flex-start',style:{gap:25},children:[(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(core_1.Link,{target:'_blank',href:'https://github.com/dOrgTech/homebase-app',children:(0,jsx_runtime_1.jsx)(IconContainer,{children:(0,jsx_runtime_1.jsx)(GitHub_1.default,{color:'secondary'})})})}),(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:(0,jsx_runtime_1.jsx)(core_1.Link,{target:'_blank',href:'https://discord.gg/XufcBNu277',children:(0,jsx_runtime_1.jsx)(IconContainer,{children:(0,jsx_runtime_1.jsx)(core_1.SvgIcon,{children:(0,jsx_runtime_1.jsx)(discord_svg_1.ReactComponent,{})})})})})]})})]});};exports.Landing=Landing;