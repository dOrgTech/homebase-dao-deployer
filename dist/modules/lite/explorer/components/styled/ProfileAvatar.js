'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.ProfileAvatar=void 0;const jsx_runtime_1=require('react/jsx-runtime');const core_1=require('@material-ui/core');const Blockie_1=require('../../../../common/Blockie');const useProfileClaim_1=require('../../../../../services/tzprofiles/hooks/useProfileClaim');const StyledAvatar=(0,core_1.styled)(core_1.Avatar)(({size})=>({width:size||40,height:size||40}));const ProfileAvatar=({address,size})=>{const {data:profile}=(0,useProfileClaim_1.useProfileClaim)(address);return(0,jsx_runtime_1.jsx)(jsx_runtime_1.Fragment,{children:profile?(0,jsx_runtime_1.jsx)(StyledAvatar,{alt:profile.credentialSubject.alias,src:profile.credentialSubject.logo,size:size}):(0,jsx_runtime_1.jsx)(Blockie_1.Blockie,{address:address,size:size})});};exports.ProfileAvatar=ProfileAvatar;