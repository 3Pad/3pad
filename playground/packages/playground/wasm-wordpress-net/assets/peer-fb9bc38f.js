import{s as e,g as n,e as i}from"./config-f9a77146.js";import{s as l,P as g,l as w}from"./setup-playground-sync-687c452b.js";async function p(r,o,s){const a=await e({iframe:r,remoteUrl:n().toString()}),t=await a.absoluteUrl;console.log({clientId:o,siteURL:t}),await l(a,{autoincrementOffset:s,transport:new g,middlewares:[w(o)]}),await i(a,{username:"admin",password:"password"}),await a.goTo("/")}export{p as runDemo};
