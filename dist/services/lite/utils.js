'use strict';var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator['throw'](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{'default':mod};};Object.defineProperty(exports,'__esModule',{value:true});exports.getSignature=exports.formatByDecimals=exports.nFormatter=exports.numberWithCommas=exports.getTreasuryPercentage=exports.getTotalVoters=exports.calculateProposalTotal=exports.calculateChoiceTotal=exports.calculateWeight=exports.isProposalActive=exports.getTurnoutValue=exports.hasTokenBalance=exports.getUserTotalSupplyAtReferenceBlock=exports.getTotalSupplyAtReferenceBlock=exports.getCurrentBlock=void 0;const tzip16_1=require('@taquito/tzip16');const dayjs_1=__importDefault(require('dayjs'));const relativeTime_1=__importDefault(require('dayjs/plugin/relativeTime'));const updateLocale_1=__importDefault(require('dayjs/plugin/updateLocale'));const bakingBad_1=require('../bakingBad');const beacon_sdk_1=require('@airgap/beacon-sdk');const bignumber_js_1=__importDefault(require('bignumber.js'));const node_fetch_1=__importDefault(require('node-fetch'));const getCurrentBlock=network=>__awaiter(void 0,void 0,void 0,function*(){const url=`https://api.${bakingBad_1.networkNameMap[network]}.tzkt.io/v1/head`;const response=yield(0,node_fetch_1.default)(url);if(!response.ok){throw new Error('Failed to fetch contract current block');}const result=yield response.json();return result.level;});exports.getCurrentBlock=getCurrentBlock;const getTotalSupplyAtReferenceBlock=(network,address,level)=>__awaiter(void 0,void 0,void 0,function*(){const url=`https://api.${bakingBad_1.networkNameMap[network]}.tzkt.io/v1/contracts/${address}/bigmaps/token_total_supply/historical_keys/${level}`;const response=yield(0,node_fetch_1.default)(url);if(!response.ok){throw new Error('Failed to fetch contract current block');}const result=yield response.json();return result[0].value;});exports.getTotalSupplyAtReferenceBlock=getTotalSupplyAtReferenceBlock;const getUserTotalSupplyAtReferenceBlock=(network,address,level,userAddress)=>__awaiter(void 0,void 0,void 0,function*(){const url=`https://api.${bakingBad_1.networkNameMap[network]}.tzkt.io/v1/contracts/${address}/bigmaps/ledger/historical_keys/${level}`;const response=yield(0,node_fetch_1.default)(url);if(!response.ok){throw new Error('Failed to fetch contract current block');}const result=yield response.json();let userBalance;if(result&&result.length>0){userBalance=result.find(elem=>elem.key.address===userAddress);return userBalance.value;}return 0;});exports.getUserTotalSupplyAtReferenceBlock=getUserTotalSupplyAtReferenceBlock;const hasTokenBalance=(network,account,contract)=>__awaiter(void 0,void 0,void 0,function*(){const url=`https://api.${bakingBad_1.networkNameMap[network]}.tzkt.io/v1/tokens/balances?account=${account}&token.contract=${contract}`;const response=yield(0,node_fetch_1.default)(url);if(!response.ok){throw new Error('Failed to fetch contract current block');}const result=yield response.json();let hasBalance=false;if(result&&result[0]){if(result[0].balance>0){hasBalance=true;}else{hasBalance=false;}}else{hasBalance=false;}return hasBalance;});exports.hasTokenBalance=hasTokenBalance;const getTurnoutValue=(network,address,level,voters)=>__awaiter(void 0,void 0,void 0,function*(){const url=`https://api.${bakingBad_1.networkNameMap[network]}.tzkt.io/v1/contracts/${address}/bigmaps/ledger/historical_keys/${level}`;const response=yield(0,node_fetch_1.default)(url);if(!response.ok){throw new Error('Failed to fetch contract current block');}const result=yield response.json();if(result){return voters*100/result.length;}return 0;});exports.getTurnoutValue=getTurnoutValue;const isProposalActive=date=>{const config={rounding:Math.floor};dayjs_1.default.extend(relativeTime_1.default,config);dayjs_1.default.extend(updateLocale_1.default);dayjs_1.default.updateLocale('en',{relativeTime:{future:'%s left',past:'%s ago',s:'a few seconds',m:'1 minute',mm:'%d minutes',h:'1 hour',hh:'%d hours',d:'a day',dd:'%d days',M:'1 month',MM:'%d months',y:'1 year',yy:'%d years'}});const remainingDate=(0,dayjs_1.default)(date).fromNow();return remainingDate;};exports.isProposalActive=isProposalActive;const calculateWeight=(totalSupply,balance,decimals)=>{const formattedTotalSupply=new bignumber_js_1.default(totalSupply).div(new bignumber_js_1.default(10).pow(decimals));const percent=balance.div(formattedTotalSupply).multipliedBy(100);return percent;};exports.calculateWeight=calculateWeight;const calculateChoiceTotal=(choice_voters,decimals)=>{let total=new bignumber_js_1.default(0);choice_voters.map(voter=>{total=new bignumber_js_1.default(voter.balanceAtReferenceBlock).plus(total);});const result=new bignumber_js_1.default(total).div(new bignumber_js_1.default(10).pow(decimals));return result;};exports.calculateChoiceTotal=calculateChoiceTotal;const calculateProposalTotal=(choices,decimals)=>{let total=new bignumber_js_1.default(0);choices.map(choice=>{choice.walletAddresses.map(elem=>{total=new bignumber_js_1.default(elem.balanceAtReferenceBlock).plus(total);});});const result=total.div(new bignumber_js_1.default(10).pow(decimals));return result;};exports.calculateProposalTotal=calculateProposalTotal;const getUsers=options=>{const addresses=[];options.map(option=>{return option.walletAddresses.map(wallet=>addresses.push(wallet.address));});return new Set(addresses);};const getTotalVoters=choices=>{const totalVoters=getUsers(choices);return totalVoters.size;};exports.getTotalVoters=getTotalVoters;const getTreasuryPercentage=(proposalTotal,totalSupply,decimals)=>{const formattedTotalSupply=new bignumber_js_1.default(totalSupply).div(new bignumber_js_1.default(10).pow(decimals));const value=proposalTotal.div(new bignumber_js_1.default(formattedTotalSupply)).multipliedBy(100);return value;};exports.getTreasuryPercentage=getTreasuryPercentage;const numberWithCommas=x=>{return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');};exports.numberWithCommas=numberWithCommas;const SI_SYMBOL=['','k','M','G','T','P','E'];const nFormatter=(num,digits)=>{return num.toString();};exports.nFormatter=nFormatter;const formatByDecimals=(value,decimals)=>{return(0,exports.nFormatter)(new bignumber_js_1.default(value).div(new bignumber_js_1.default(10).pow(decimals)),1);};exports.formatByDecimals=formatByDecimals;const getSignature=(userAddress,wallet,data)=>__awaiter(void 0,void 0,void 0,function*(){const formattedInput=['Tezos Signed Message:',process.env.REACT_APP_BASE_URL,new Date().toISOString(),data].join(' ');const bytes=(0,tzip16_1.char2Bytes)(formattedInput);const payloadBytes='05'+'0100'+(0,tzip16_1.char2Bytes)(bytes.length.toString())+bytes;const payload={signingType:beacon_sdk_1.SigningType.MICHELINE,payload:payloadBytes,sourceAddress:userAddress};const signedPayload=yield wallet===null||wallet===void 0?void 0:wallet.client.requestSignPayload(payload);const {signature}=signedPayload;return{signature,payloadBytes};});exports.getSignature=getSignature;