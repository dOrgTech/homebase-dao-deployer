'use strict';var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{'default':mod};};Object.defineProperty(exports,'__esModule',{value:true});const jsx_runtime_1=require('react/jsx-runtime');const launchdarkly_react_client_sdk_1=require('launchdarkly-react-client-sdk');const react_router_dom_1=require('react-router-dom');const mixpanel_browser_1=__importDefault(require('mixpanel-browser'));const react_query_1=require('react-query');const core_1=require('@material-ui/core');const notistack_1=require('notistack');const router_1=require('./modules/explorer/router');const state_1=require('./modules/creator/state');const ScrollToTop_1=__importDefault(require('./modules/common/ScrollToTop'));require('App.css');const TZKTSubscriptions_1=require('./services/bakingBad/context/TZKTSubscriptions');const Landing_1=require('./modules/home/Landing');const ActionSheets_1=require('./modules/explorer/context/ActionSheets');const legacy_1=require('./theme/legacy');const Footer_1=require('./modules/common/Footer');const FAQ_1=require('./modules/home/FAQ');const config_1=require('./services/config');const router_2=require('./modules/creator/router');const LocalizationProvider_1=require('@mui/x-date-pickers/LocalizationProvider');const AdapterDayjs_1=require('@mui/x-date-pickers/AdapterDayjs');const creator_1=require('./modules/lite/creator');const queryClient=new react_query_1.QueryClient({defaultOptions:{queries:{retryDelay:attemptIndex=>Math.min(1000*Math.pow(2,attemptIndex),60000),retry:false,retryOnMount:false,refetchOnMount:false,refetchOnWindowFocus:true,staleTime:5000,cacheTime:300000}}});const styles=(0,core_1.makeStyles)({success:{backgroundColor:'#4BCF93 !important',padding:'6px 28px',height:54,fontSize:13,lineHeight:'0px',opacity:1},error:{backgroundColor:'#ED254E !important',padding:'6px 28px',height:54,fontSize:13,lineHeight:'0px',opacity:1},info:{backgroundColor:'#3866F9 !important',padding:'6px 28px',height:54,fontSize:13,lineHeight:'0px',opacity:1}});const MIXPANEL_TOKEN=(0,config_1.getEnv)(config_1.EnvKey.REACT_APP_MIXPANEL_TOKEN);const MIXPANEL_DEBUG_ENABLED=(0,config_1.getEnv)(config_1.EnvKey.REACT_APP_MIXPANEL_DEBUG_ENABLED);if(!MIXPANEL_TOKEN){throw new Error(`${config_1.EnvKey.REACT_APP_MIXPANEL_TOKEN} env variable is missing`);}if(!MIXPANEL_DEBUG_ENABLED){throw new Error(`${config_1.EnvKey.REACT_APP_MIXPANEL_DEBUG_ENABLED} env variable is missing`);}mixpanel_browser_1.default.init(MIXPANEL_TOKEN,{debug:MIXPANEL_DEBUG_ENABLED==='true'});mixpanel_browser_1.default.track('Visit');const App=()=>{const classes=styles();return(0,jsx_runtime_1.jsx)(core_1.ThemeProvider,{theme:null,children:(0,jsx_runtime_1.jsx)(notistack_1.SnackbarProvider,{classes:{variantSuccess:classes.success,variantError:classes.error,variantInfo:classes.info},children:(0,jsx_runtime_1.jsx)(react_query_1.QueryClientProvider,{client:queryClient,children:(0,jsx_runtime_1.jsx)(ActionSheets_1.ActionSheetProvider,{children:(0,jsx_runtime_1.jsx)(LocalizationProvider_1.LocalizationProvider,{dateAdapter:AdapterDayjs_1.AdapterDayjs,children:(0,jsx_runtime_1.jsx)(core_1.Box,{bgcolor:'primary.dark',position:'absolute',width:'100%',children:(0,jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter,{children:[(0,jsx_runtime_1.jsx)(ScrollToTop_1.default,{}),(0,jsx_runtime_1.jsxs)(react_router_dom_1.Switch,{children:[(0,jsx_runtime_1.jsx)(react_router_dom_1.Route,{path:'/creator',children:(0,jsx_runtime_1.jsx)(state_1.CreatorProvider,{children:(0,jsx_runtime_1.jsx)(core_1.ThemeProvider,{theme:legacy_1.legacyTheme,children:(0,jsx_runtime_1.jsx)(router_2.DAOCreatorRouter,{})})})}),(0,jsx_runtime_1.jsx)(react_router_dom_1.Route,{path:'/lite',children:(0,jsx_runtime_1.jsx)(core_1.ThemeProvider,{theme:legacy_1.legacyTheme,children:(0,jsx_runtime_1.jsx)(creator_1.CommunityCreator,{})})}),(0,jsx_runtime_1.jsxs)(react_router_dom_1.Route,{path:'/explorer',children:[(0,jsx_runtime_1.jsx)(TZKTSubscriptions_1.TZKTSubscriptionsProvider,{children:(0,jsx_runtime_1.jsx)(router_1.DAOExplorerRouter,{})}),(0,jsx_runtime_1.jsx)(Footer_1.Footer,{})]}),(0,jsx_runtime_1.jsx)(react_router_dom_1.Route,{path:'/faq',children:(0,jsx_runtime_1.jsx)(FAQ_1.FAQ,{})}),(0,jsx_runtime_1.jsx)(react_router_dom_1.Route,{path:'/',children:(0,jsx_runtime_1.jsx)(Landing_1.Landing,{})}),(0,jsx_runtime_1.jsx)(react_router_dom_1.Redirect,{to:'/'})]})]})})})})})})});};const env=(0,config_1.getEnv)(config_1.EnvKey.REACT_APP_ENV);exports.default=(0,launchdarkly_react_client_sdk_1.withLDProvider)({clientSideID:env==='PROD'?(0,config_1.getEnv)(config_1.EnvKey.REACT_APP_LAUNCH_DARKLY_SDK_PROD):(0,config_1.getEnv)(config_1.EnvKey.REACT_APP_LAUNCH_DARKLY_SDK_DEV)})(App);