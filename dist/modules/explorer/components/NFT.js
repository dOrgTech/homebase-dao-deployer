'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.NFT=void 0;const jsx_runtime_1=require('react/jsx-runtime');const core_1=require('@material-ui/core');const ipfs_1=require('../../../services/ipfs');const StyledLink=(0,core_1.styled)(core_1.Link)({display:'block',height:'100%'});const NFTImg=(0,core_1.styled)('img')({maxHeight:'100%',maxWidth:'100%',width:'auto',display:'block'});const NFTVideo=(0,core_1.styled)('video')({maxHeight:'100%',maxWidth:'100%',width:'auto',margin:'auto',display:'block'});const NFTAudio=(0,core_1.styled)('audio')({maxHeight:'100%',maxWidth:'100%',width:'256px',margin:'auto',display:'block'});const NFTContainerGrid=(0,core_1.styled)(core_1.Grid)({height:'100%'});const NFTContainer=({children})=>(0,jsx_runtime_1.jsx)(NFTContainerGrid,{container:true,direction:'column',justifyContent:'center',alignItems:'center',children:(0,jsx_runtime_1.jsx)(core_1.Grid,{item:true,children:children})});const NFT=({qmHash,name,mediaType})=>{return(0,jsx_runtime_1.jsx)(StyledLink,{href:`${ipfs_1.IPFS_GATEWAY_URI}/${qmHash}`,rel:'noopener',target:'_blank',style:{height:'100%',display:'block'},onClick:e=>{e.stopPropagation();},children:mediaType==='image'?(0,jsx_runtime_1.jsx)(NFTImg,{src:`${ipfs_1.IPFS_GATEWAY_URI}/${qmHash}`,alt:`${name}-thumbnail`}):mediaType==='audio'?(0,jsx_runtime_1.jsx)(NFTContainer,{children:(0,jsx_runtime_1.jsx)(NFTAudio,{src:`${ipfs_1.IPFS_GATEWAY_URI}/${qmHash}`,controls:true})}):mediaType==='video'?(0,jsx_runtime_1.jsx)(NFTVideo,{src:`${ipfs_1.IPFS_GATEWAY_URI}/${qmHash}`,controls:true,autoPlay:true,muted:true}):(0,jsx_runtime_1.jsx)(NFTContainer,{children:(0,jsx_runtime_1.jsx)(core_1.Typography,{variant:'body1',color:'textPrimary',children:'No Media Available'})})});};exports.NFT=NFT;