"use strict";(()=>{function T(e){e&&(e.classList.contains("cloak")||e.classList.add("cloak"))}function x(e){e&&e.classList.contains("cloak")&&e.classList.remove("cloak")}function ce(){{let e=`.cloak { 
			opacity: 0;
			height: 0px;
      overflow: hidden;
			margin: 0;
      padding-top: 0;
      padding-bottom: 0;
		}`,t=document.createElement("style");t.textContent=e,document.head.appendChild(t)}}var Y=(e,t=!0)=>e.cloneNode(t);var fe=new Set,y=new WeakMap,P=new WeakMap,k=new WeakMap,te=new WeakMap,Se=new WeakMap,V=new WeakMap,z=new WeakMap,A=new WeakSet,N,oe=0,re=0,H="__aa_tgt",j="__aa_del",X="__aa_new",xe=e=>{let t=Be(e);t&&t.forEach(o=>ke(o))},Me=e=>{e.forEach(t=>{t.target===N&&He(),y.has(t.target)&&_(t.target)})};function Ie(e){let t=te.get(e);t?.disconnect();let o=y.get(e),n=0,r=5;o||(o=R(e),y.set(e,o));let{offsetWidth:a,offsetHeight:i}=N,u=[o.top-r,a-(o.left+r+o.width),i-(o.top+r+o.height),o.left-r].map(v=>`${-1*Math.floor(v)}px`).join(" "),p=new IntersectionObserver(()=>{++n>1&&_(e)},{root:N,threshold:1,rootMargin:u});p.observe(e),te.set(e,p)}function _(e){clearTimeout(z.get(e));let t=G(e),o=F(t)?500:t.duration;z.set(e,setTimeout(async()=>{let n=k.get(e);try{await n?.finished,y.set(e,R(e)),Ie(e)}catch{}},o))}function He(){clearTimeout(z.get(N)),z.set(N,setTimeout(()=>{fe.forEach(e=>ge(e,t=>pe(()=>_(t))))},100))}function De(e){setTimeout(()=>{Se.set(e,setInterval(()=>pe(_.bind(null,e)),2e3))},Math.round(2e3*Math.random()))}function pe(e){typeof requestIdleCallback=="function"?requestIdleCallback(()=>e()):requestAnimationFrame(()=>e())}var ne,q,Ne=typeof window<"u"&&"ResizeObserver"in window;Ne&&(N=document.documentElement,ne=new MutationObserver(xe),q=new ResizeObserver(Me),window.addEventListener("scroll",()=>{re=window.scrollY,oe=window.scrollX}),q.observe(N));function Be(e){return e.reduce((n,r)=>[...n,...Array.from(r.addedNodes),...Array.from(r.removedNodes)],[]).every(n=>n.nodeName==="#comment")?!1:e.reduce((n,r)=>{if(n===!1)return!1;if(r.target instanceof Element){if(ee(r.target),!n.has(r.target)){n.add(r.target);for(let a=0;a<r.target.children.length;a++){let i=r.target.children.item(a);if(i){if(j in i)return!1;ee(r.target,i),n.add(i)}}}if(r.removedNodes.length)for(let a=0;a<r.removedNodes.length;a++){let i=r.removedNodes[a];if(j in i)return!1;i instanceof Element&&(n.add(i),ee(r.target,i),P.set(i,[r.previousSibling,r.nextSibling]))}}return n},new Set)}function ee(e,t){!t&&!(H in e)?Object.defineProperty(e,H,{value:e}):t&&!(H in t)&&Object.defineProperty(t,H,{value:e})}function ke(e){var t;let o=e.isConnected,n=y.has(e);o&&P.has(e)&&P.delete(e),k.has(e)&&((t=k.get(e))===null||t===void 0||t.cancel()),X in e?de(e):n&&o?$e(e):n&&!o?Oe(e):de(e)}function M(e){return Number(e.replace(/[^0-9.\-]/g,""))}function _e(e){let t=e.parentElement;for(;t;){if(t.scrollLeft||t.scrollTop)return{x:t.scrollLeft,y:t.scrollTop};t=t.parentElement}return{x:0,y:0}}function R(e){let t=e.getBoundingClientRect(),{x:o,y:n}=_e(e);return{top:t.top+n,left:t.left+o,width:t.width,height:t.height}}function he(e,t,o){let n=t.width,r=t.height,a=o.width,i=o.height,c=getComputedStyle(e);if(c.getPropertyValue("box-sizing")==="content-box"){let p=M(c.paddingTop)+M(c.paddingBottom)+M(c.borderTopWidth)+M(c.borderBottomWidth),v=M(c.paddingLeft)+M(c.paddingRight)+M(c.borderRightWidth)+M(c.borderLeftWidth);n-=v,a-=v,r-=p,i-=p}return[n,a,r,i].map(Math.round)}function G(e){return H in e&&V.has(e[H])?V.get(e[H]):{duration:250,easing:"ease-in-out"}}function we(e){if(H in e)return e[H]}function ie(e){let t=we(e);return t?A.has(t):!1}function ge(e,...t){t.forEach(o=>o(e,V.has(e)));for(let o=0;o<e.children.length;o++){let n=e.children.item(o);n&&t.forEach(r=>r(n,V.has(n)))}}function ae(e){return Array.isArray(e)?e:[e]}function F(e){return typeof e=="function"}function $e(e){let t=y.get(e),o=R(e);if(!ie(e))return y.set(e,o);let n;if(!t)return;let r=G(e);if(typeof r!="function"){let a=t.left-o.left,i=t.top-o.top,[c,u,p,v]=he(e,t,o),I={transform:`translate(${a}px, ${i}px)`},E={transform:"translate(0, 0)"};c!==u&&(I.width=`${c}px`,E.width=`${u}px`),p!==v&&(I.height=`${p}px`,E.height=`${v}px`),n=e.animate([I,E],{duration:r.duration,easing:r.easing})}else{let[a]=ae(r(e,"remain",t,o));n=new Animation(a),n.play()}k.set(e,n),y.set(e,o),n.addEventListener("finish",_.bind(null,e))}function de(e){X in e&&delete e[X];let t=R(e);y.set(e,t);let o=G(e);if(!ie(e))return;let n;if(typeof o!="function")n=e.animate([{transform:"scale(.98)",opacity:0},{transform:"scale(0.98)",opacity:0,offset:.5},{transform:"scale(1)",opacity:1}],{duration:o.duration*1.5,easing:"ease-in"});else{let[r]=ae(o(e,"add",t));n=new Animation(r),n.play()}k.set(e,n),n.addEventListener("finish",_.bind(null,e))}function me(e,t){var o;e.remove(),y.delete(e),P.delete(e),k.delete(e),(o=te.get(e))===null||o===void 0||o.disconnect(),setTimeout(()=>{if(j in e&&delete e[j],Object.defineProperty(e,X,{value:!0,configurable:!0}),t&&e instanceof HTMLElement)for(let n in t)e.style[n]=""},0)}function Oe(e){var t;if(!P.has(e)||!y.has(e))return;let[o,n]=P.get(e);Object.defineProperty(e,j,{value:!0,configurable:!0});let r=window.scrollX,a=window.scrollY;if(n&&n.parentNode&&n.parentNode instanceof Element?n.parentNode.insertBefore(e,n):o&&o.parentNode?o.parentNode.appendChild(e):(t=we(e))===null||t===void 0||t.appendChild(e),!ie(e))return me(e);let[i,c,u,p]=qe(e),v=G(e),I=y.get(e);(r!==oe||a!==re)&&Ue(e,r,a,v);let E,S={position:"absolute",top:`${i}px`,left:`${c}px`,width:`${u}px`,height:`${p}px`,margin:"0",pointerEvents:"none",transformOrigin:"center",zIndex:"100"};if(!F(v))Object.assign(e.style,S),E=e.animate([{transform:"scale(1)",opacity:1},{transform:"scale(.98)",opacity:0}],{duration:v.duration,easing:"ease-out"});else{let[b,D]=ae(v(e,"remove",I));D?.styleReset!==!1&&(S=D?.styleReset||S,Object.assign(e.style,S)),E=new Animation(b),E.play()}k.set(e,E),E.addEventListener("finish",me.bind(null,e,S))}function Ue(e,t,o,n){let r=oe-t,a=re-o,i=document.documentElement.style.scrollBehavior;if(getComputedStyle(N).scrollBehavior==="smooth"&&(document.documentElement.style.scrollBehavior="auto"),window.scrollTo(window.scrollX+r,window.scrollY+a),!e.parentElement)return;let u=e.parentElement,p=u.clientHeight,v=u.clientWidth,I=performance.now();function E(){requestAnimationFrame(()=>{if(!F(n)){let S=p-u.clientHeight,b=v-u.clientWidth;I+n.duration>performance.now()?(window.scrollTo({left:window.scrollX-b,top:window.scrollY-S}),p=u.clientHeight,v=u.clientWidth,E()):document.documentElement.style.scrollBehavior=i}})}E()}function qe(e){let t=y.get(e),[o,,n]=he(e,t,R(e)),r=e.parentElement;for(;r&&(getComputedStyle(r).position==="static"||r instanceof HTMLBodyElement);)r=r.parentElement;r||(r=document.body);let a=getComputedStyle(r),i=y.get(r)||R(r),c=Math.round(t.top-i.top)-M(a.borderTopWidth),u=Math.round(t.left-i.left)-M(a.borderLeftWidth);return[c,u,o,n]}function se(e,t={}){return ne&&q&&(window.matchMedia("(prefers-reduced-motion: reduce)").matches&&!F(t)&&!t.disrespectUserMotionPreference||(A.add(e),getComputedStyle(e).position==="static"&&Object.assign(e.style,{position:"relative"}),ge(e,_,De,r=>q?.observe(r)),F(t)?V.set(e,t):V.set(e,{duration:250,easing:"ease-in-out",...t}),ne.observe(e,{childList:!0}),fe.add(e))),Object.freeze({parent:e,enable:()=>{A.add(e)},disable:()=>{A.delete(e)},isEnabled:()=>A.has(e)})}function $(e,t,o){e&&(e.classList.add(t),setTimeout(function(){e.classList.remove(t)},o))}function W(e){let t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleString("sv",{dateStyle:"short",timeStyle:"short"}).toString()}var O={apiUrl:document.currentScript?.getAttribute("api-url")??atob("aHR0cHM6Ly91dGlscy1hcGkudmVyY2VsLmFwcC9hcGkv"),counterPath:"counter/",jsDelivrUrl:"https://data.jsdelivr.com/v1/packages/gh/ageraplattformen/agera.js/resolved?specifier=latest",wfSiteId:document.querySelector("html")?.dataset.wfSite??"0000",postalCodeUrl:atob("aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2FnZXJhcGxhdHRmb3JtZW4vanMtbW9kdWxlc0BtYWluL3ppcC8=")};var g="data-dash-element",L={filter:"data-dash-counters-filter",firstRow:'[data-dash-element="counter-row"]',updateCounterValueInput:'[data-dash-element="update-counter-value-input"]',counterName:'[data-dash-element="counter-name"]',counterCount:'[data-dash-element="counter-count"]',counterUpdated:'[data-dash-element="counter-updated-date"]',updateButton:'[data-dash-element="update-button"]'},J=class{constructor(){this.list=document.querySelector('[data-dash-counters="list"]'),this.rowTemplate=document.querySelector('[data-dash-element="counter-row"]'),this.filter="data-dash-counters-filter",this.loadingRow=document.querySelector(`[${g}="loading-row"]`),this.newCounterButton=document.querySelector(`[${g}="new-counter-button"]`),this.statusBox=document.querySelector(`[${g}="status-box"]`),this.currentValueLabel=document.querySelector(`[${g}="current-value-label"]`),this.nameLabel=document.querySelector(`[${g}="name-label"]`),this.lastIncrementLabel=document.querySelector(`[${g}="last-increment-label"]`),this.countersSum=document.querySelectorAll(`[${g}="counters-sum"]`),this.noOfCounters=document.querySelectorAll(`[${g}="no-of-counters"]`)}},Z=class{constructor(){this.modalCard=document.querySelector(`[${g}="modal-card"]`),this.modalCloseButtons=document.querySelectorAll(`[${g}="close-button"]`),this.confirmUpdateBlock=document.querySelector(`[${g}="confirm-update-block"]`),this.confirmUpdateText=document.querySelector(`[${g}="confirm-text"]`),this.confirmUpdateButton=document.querySelector(`[${g}="confirm-button"]`),this.newCounterBlock=document.querySelector(`[${g}="new-counter-block"]`),this.confirmNewCounterButton=document.querySelector(`[${g}="confirm-new-counter-button"]`),this.newCounterValueInput=document.querySelector(`[${g}="new-counter-value-input"]`),this.newCounterNameInput=document.querySelector(`[${g}="new-counter-name-input"]`),this.newCounterFormUrlInput=document.querySelector(`[${g}="form-url-input"]`),this.newCounterFormUrlLoadButton=document.querySelector(`[${g}="form-url-button"]`),this.newCounterSiteIDInput=document.querySelector(`[${g}="new-counter-wf-site-id-input"]`)}};var Q=class{async getList(t,o,n=100){let r=o.sort_by;o.sort_by==="count"&&(r="name");let a=`${O.apiUrl}counters${t}?sort_by=${r}&order=${o.order}&limit=${n}`;try{let i=await fetch(a);if(!i.ok)return i.status===404?le():le("Error getting data");let c=await i.json();return o.sort_by==="count"&&(o.order==="desc"?c.sort((u,p)=>p.count-u.count):c.sort((u,p)=>u.count-p.count)),c}catch(i){return console.error(i),le()}}async getInfo(t){let o=`${O.apiUrl}counter/${t}?info=true`;try{let n=await fetch(o);if(!n.ok)throw new Error("Error fetching data");return await n.json()}catch(n){throw new Error(`Error fetching data: ${n}`)}}async put(t){let o=`${O.apiUrl}counter/${t.name}`;try{let n=await fetch(o,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!n.ok)throw new Error("Error fetching data");return await n.json()}catch(n){throw new Error(`Error fetching data: ${n}`)}}async post(t){let o=`${O.apiUrl}counter/${t.name}`;try{let n=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!n.ok)return ue();let r=await n.json();return r.details==="Created new counter"?r:ue()}catch(n){return console.error(`Error fetching data: ${n}`),ue()}}};async function ve(e){if(!e)return null;try{let o=await(await fetch("https://corsproxy.io/?"+encodeURIComponent(e))).text(),n=/data-wf-site="([^"]+)"/.exec(o);return n?n[1]:null}catch(t){return console.error("Error fetching data:",t),null}}function le(e="No counters found"){return[{count:0,name:e,last_updated:"",details:"",id:0,form:"",date_created:"",site_id:""}]}function ue(){return{count:0,name:"No counters found",last_updated:"",details:"",id:0,form:"",date_created:"",site_id:""}}async function Ce(){let e=new J,t=new Z,o=e.list?.getAttribute(L.filter)||"",n=[],r={all:"",this:"/"+O.wfSiteId};r.hasOwnProperty(o)?o=r[o]:o!==""?o=`/${o}`:o=r.this;let a={sort_by:new URLSearchParams(window.location.search).get("sort_by")||"last_updated",order:new URLSearchParams(window.location.search).get("order")||"desc"},i=new Q,c=[],u={name:"",newValue:0,oldValue:0,site_id:""};if(!e.rowTemplate)return;let p=e.rowTemplate.parentElement;if(!p)return;e.rowTemplate.remove(),e.loadingRow&&x(e.loadingRow);let v;function I(d,s){let l=Y(s),m=l.querySelector(L.counterName),h=l.querySelector(L.counterUpdated),f=l.querySelector(L.updateButton),w=l.querySelector(L.counterCount);if(d.name==="No counters found"){let C=l.querySelector(L.updateCounterValueInput);C&&C.remove(),f&&f.remove()}return m&&(m.textContent=d.name),h&&(d.last_updated?h.textContent=W(d.last_updated):h.textContent=W(d.date_created)),w&&(w.textContent=d.count.toString()),f&&w&&f.addEventListener("click",()=>{E(l,d,w)}),l}function E(d,s,l){let m=d.querySelector(L.updateCounterValueInput);t.modalCard&&m&&(!Number.isNaN(parseInt(m.value))&&t.modalCard.classList.contains("cloak")?(u.name=s.name,u.site_id=s.site_id,u.newValue=parseInt(m.value),u.oldValue=parseInt(l?.textContent?.toString()||"0"),v=d,t.confirmUpdateText&&(t.confirmUpdateText.innerHTML=`Name: ${u.name}<br>Current value: ${u.oldValue}<br>New value: ${u.newValue}`),S("update")):$(m,"error",500))}function S(d){if(!t.modalCard)return;x(t.modalCard),t.confirmUpdateBlock&&t.confirmNewCounterButton&&(d==="update"?(x(t.confirmUpdateBlock),T(t.newCounterBlock),s()):d==="new"&&(x(t.newCounterBlock),T(t.confirmUpdateBlock),m())),t.modalCloseButtons.length>0&&t.modalCloseButtons.forEach(f=>{f.addEventListener("click",()=>{T(t.modalCard),t.confirmNewCounterButton?.removeEventListener("click",h),t.confirmUpdateButton?.removeEventListener("click",l)})});function s(){t.confirmUpdateButton&&t.confirmUpdateButton.addEventListener("click",l)}async function l(){if(b("loading"),!!t.modalCard){if(T(t.modalCard),await i.put({name:u.name,count:u.newValue,site_id:u.site_id})){if(n.forEach(f=>{f.name===u.name&&(f.count=u.newValue)}),v){let f=v.querySelector(L.counterCount);f&&(f.textContent=u.newValue.toString())}b("updated")}else b("error");t.confirmUpdateButton&&t.confirmUpdateButton.removeEventListener("click",l)}}function m(){if(!t.confirmNewCounterButton||!t.newCounterValueInput||!t.newCounterNameInput||!t.newCounterSiteIDInput){T(t.modalCard);return}t.newCounterFormUrlLoadButton?.addEventListener("click",async()=>{b("loading",1e3);let f=await ve(t.newCounterFormUrlInput?.value);if(f){if(!t.newCounterSiteIDInput)return;t.newCounterSiteIDInput.value=f,$(t.newCounterSiteIDInput,"new",500)}else{if(!t.newCounterSiteIDInput)return;t.newCounterSiteIDInput.value="Site ID can't be loaded",$(t.newCounterSiteIDInput,"error",500)}}),t.confirmNewCounterButton.addEventListener("click",h)}async function h(){if(!t.newCounterNameInput||!t.newCounterSiteIDInput)return;if(!/^[a-z0-9-]{5,}$/.test(t.newCounterNameInput.value)){$(t.newCounterNameInput,"error",500);return}if(t.newCounterSiteIDInput.value&&!/^[0-9a-f]{22,26}$/.test(t.newCounterSiteIDInput.value)){console.log("invalid site ID",t.newCounterSiteIDInput.value),$(t.newCounterSiteIDInput,"error",500);return}t.confirmNewCounterButton?.removeEventListener("click",h),T(t.modalCard),b("loading");let w=t.newCounterSiteIDInput.value,C=t.newCounterFormUrlInput?.value||"",B=await i.post({name:t.newCounterNameInput.value,site_id:w});if(B.id!==0){if(t.newCounterValueInput&&parseInt(t.newCounterValueInput.value)>0?B=await i.put({name:t.newCounterNameInput.value,count:parseInt(t.newCounterValueInput.value),site_id:w,form_url:C}):B=await i.getInfo(t.newCounterNameInput.value),B&&e.rowTemplate){let U=I(B,e.rowTemplate);c.push(U),K(c,a),x(U),$(U,"new",1e3)}b("created"),t.newCounterValueInput&&(t.newCounterValueInput.value=""),t.newCounterNameInput.value=""}else b("error")}}function b(d,s=3e3){let l=document.querySelector('[data-dash-element="status-box"]');if(!l)return;let m=l.childNodes[0],h=l.childNodes[1];h&&(d==="updated"?(m&&T(m),h.innerText="Updated"):d==="created"?(m&&T(m),h.innerText="Created"):d==="loading"?(h.innerText="",T(h),m&&x(m)):(m&&T(m),h.innerText="Error",l.classList.add("error")),setTimeout(()=>{x(l),x(h)},100),setTimeout(function(){T(l),l.classList.remove("error")},s))}function D(){let d=[{element:e.nameLabel,sort_by:"name",order:"asc"},{element:e.lastIncrementLabel,sort_by:"last_updated",order:"asc"},{element:e.currentValueLabel,sort_by:"count",order:"desc"}];for(let s of d)if(s.element){let l=new URL(window.location.href);l.searchParams.set("sort_by",s.sort_by),s.element.addEventListener("click",m=>{m.preventDefault(),a.sort_by=s.sort_by,a.order=a.order==="asc"?"desc":"asc",l.searchParams.set("order",a.order),history.pushState(null,"",l.href),K(c,a)})}}function Le(){e.newCounterButton&&e.newCounterButton.addEventListener("click",()=>{S("new")})}function Ee(d,s){if(!d)return;let l=d.querySelector(L.counterName),m=d.querySelector(L.counterUpdated),h=d.querySelector(L.updateButton),f=d.querySelector(L.counterCount);l&&(l.textContent=s.name),m&&(s.last_updated?m.textContent=W(s.last_updated):m.textContent=W(s.date_created)),f&&(f.textContent=s.count.toString());function w(){E(d,s,f)}return h&&f&&h.addEventListener("click",w),d}function ye(){return n.map(()=>{let s=Y(e.rowTemplate);return se(s,{duration:1e3}),s})}function K(d,s){let l={name:w=>{let C=w.querySelector(L.counterName);return C&&C.textContent||""},last_updated:w=>{let C=w.querySelector(L.counterUpdated);return C&&C.textContent||""},count:w=>{let C=w.querySelector(L.counterCount);return C&&C.textContent||""}},m=new Intl.Collator(void 0,{numeric:s.sort_by==="count",sensitivity:"base"}),h=d[0]?.parentNode;if(!h)return;Array.from(d).sort((w,C)=>{let[B,U]=s.order==="asc"?[w,C]:[C,w],Te=l[s.sort_by](B),be=l[s.sort_by](U);return m.compare(Te,be)}).forEach(w=>{h.appendChild(w)})}await async function(){if(n.length===0){let s=await i.getList(o,a,100);s&&(n=s),e.loadingRow&&T(e.loadingRow)}c=ye(),se(p),c&&c.length>0&&(c.forEach((s,l)=>{Ee(s,n[l])}),K(c,a),p?.append(...c),c.forEach((s,l)=>{setTimeout(function(){x(s)},10*l)})),D(),Le()}()}function Pe(){ce(),document.addEventListener("DOMContentLoaded",()=>{Ce()})}window.ageraDash||(window.ageraDash=!0,Pe());})();