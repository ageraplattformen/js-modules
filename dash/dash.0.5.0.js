"use strict";(()=>{function T(e){e&&(e.classList.contains("cloak")||e.classList.add("cloak"))}function M(e){e&&e.classList.contains("cloak")&&e.classList.remove("cloak")}function ae(){{let e=`.cloak { 
			opacity: 0;
			height: 0px;
      overflow: hidden;
			margin: 0;
      padding-top: 0;
      padding-bottom: 0;
		}`,t=document.createElement("style");t.textContent=e,document.head.appendChild(t)}}var R=(e,t=!0)=>e.cloneNode(t);var q=(e=document)=>e.documentElement.getAttribute("data-wf-site");var ie=new Set,C=new WeakMap,_=new WeakMap,N=new WeakMap,Y=new WeakMap,Le=new WeakMap,$=new WeakMap,A=new WeakMap,U=new WeakSet,D,H="__aa_tgt",G="__aa_del",Ce=e=>{let t=Me(e);t&&t.forEach(n=>Se(n))},ye=e=>{e.forEach(t=>{t.target===D&&xe(),C.has(t.target)&&B(t.target)})};function Te(e){let t=Y.get(e);t==null||t.disconnect();let n=C.get(e),o=0,r=5;n||(n=O(e),C.set(e,n));let{offsetWidth:u,offsetHeight:s}=D,d=[n.top-r,u-(n.left+r+n.width),s-(n.top+r+n.height),n.left-r].map(y=>`${-1*Math.floor(y)}px`).join(" "),f=new IntersectionObserver(()=>{++o>1&&B(e)},{root:D,threshold:1,rootMargin:d});f.observe(e),Y.set(e,f)}function B(e){clearTimeout(A.get(e));let t=j(e),n=typeof t=="function"?500:t.duration;A.set(e,setTimeout(async()=>{let o=N.get(e);try{await(o==null?void 0:o.finished),C.set(e,O(e)),Te(e)}catch{}},n))}function xe(){clearTimeout(A.get(D)),A.set(D,setTimeout(()=>{ie.forEach(e=>le(e,t=>se(()=>B(t))))},100))}function be(e){setTimeout(()=>{Le.set(e,setInterval(()=>se(B.bind(null,e)),2e3))},Math.round(2e3*Math.random()))}function se(e){typeof requestIdleCallback=="function"?requestIdleCallback(()=>e()):requestAnimationFrame(()=>e())}var K,I;typeof window!="undefined"&&(D=document.documentElement,K=new MutationObserver(Ce),I=new ResizeObserver(ye),I.observe(D));function Me(e){return e.reduce((o,r)=>[...o,...Array.from(r.addedNodes),...Array.from(r.removedNodes)],[]).every(o=>o.nodeName==="#comment")?!1:e.reduce((o,r)=>{if(o===!1)return!1;if(r.target instanceof Element){if(X(r.target),!o.has(r.target)){o.add(r.target);for(let u=0;u<r.target.children.length;u++){let s=r.target.children.item(u);if(s){if(G in s)return!1;X(r.target,s),o.add(s)}}}if(r.removedNodes.length)for(let u=0;u<r.removedNodes.length;u++){let s=r.removedNodes[u];if(G in s)return!1;s instanceof Element&&(o.add(s),X(r.target,s),_.set(s,[r.previousSibling,r.nextSibling]))}}return o},new Set)}function X(e,t){!t&&!(H in e)?Object.defineProperty(e,H,{value:e}):t&&!(H in t)&&Object.defineProperty(t,H,{value:e})}function Se(e){var t;let n=e.isConnected,o=C.has(e);n&&_.has(e)&&_.delete(e),N.has(e)&&((t=N.get(e))===null||t===void 0||t.cancel()),o&&n?Ne(e):o&&!n?Be(e):De(e)}function S(e){return Number(e.replace(/[^0-9.\-]/g,""))}function He(e){let t=e.parentElement;for(;t;){if(t.scrollLeft||t.scrollTop)return{x:t.scrollLeft,y:t.scrollTop};t=t.parentElement}return{x:0,y:0}}function O(e){let t=e.getBoundingClientRect(),{x:n,y:o}=He(e);return{top:t.top+o,left:t.left+n,width:t.width,height:t.height}}function ue(e,t,n){let o=t.width,r=t.height,u=n.width,s=n.height,c=getComputedStyle(e);if(c.getPropertyValue("box-sizing")==="content-box"){let f=S(c.paddingTop)+S(c.paddingBottom)+S(c.borderTopWidth)+S(c.borderBottomWidth),y=S(c.paddingLeft)+S(c.paddingRight)+S(c.borderRightWidth)+S(c.borderLeftWidth);o-=y,u-=y,r-=f,s-=f}return[o,u,r,s].map(Math.round)}function j(e){return H in e&&$.has(e[H])?$.get(e[H]):{duration:250,easing:"ease-in-out"}}function ce(e){if(H in e)return e[H]}function Z(e){let t=ce(e);return t?U.has(t):!1}function le(e,...t){t.forEach(n=>n(e,$.has(e)));for(let n=0;n<e.children.length;n++){let o=e.children.item(n);o&&t.forEach(r=>r(o,$.has(o)))}}function Ne(e){let t=C.get(e),n=O(e);if(!Z(e))return C.set(e,n);let o;if(!t)return;let r=j(e);if(typeof r!="function"){let u=t.left-n.left,s=t.top-n.top,[c,d,f,y]=ue(e,t,n),x={transform:`translate(${u}px, ${s}px)`},b={transform:"translate(0, 0)"};c!==d&&(x.width=`${c}px`,b.width=`${d}px`),f!==y&&(x.height=`${f}px`,b.height=`${y}px`),o=e.animate([x,b],{duration:r.duration,easing:r.easing})}else o=new Animation(r(e,"remain",t,n)),o.play();N.set(e,o),C.set(e,n),o.addEventListener("finish",B.bind(null,e))}function De(e){let t=O(e);C.set(e,t);let n=j(e);if(!Z(e))return;let o;typeof n!="function"?o=e.animate([{transform:"scale(.98)",opacity:0},{transform:"scale(0.98)",opacity:0,offset:.5},{transform:"scale(1)",opacity:1}],{duration:n.duration*1.5,easing:"ease-in"}):(o=new Animation(n(e,"add",t)),o.play()),N.set(e,o),o.addEventListener("finish",B.bind(null,e))}function Be(e){var t;if(!_.has(e)||!C.has(e))return;let[n,o]=_.get(e);Object.defineProperty(e,G,{value:!0}),o&&o.parentNode&&o.parentNode instanceof Element?o.parentNode.insertBefore(e,o):n&&n.parentNode?n.parentNode.appendChild(e):(t=ce(e))===null||t===void 0||t.appendChild(e);function r(){var b;e.remove(),C.delete(e),_.delete(e),N.delete(e),(b=Y.get(e))===null||b===void 0||b.disconnect()}if(!Z(e))return r();let[u,s,c,d]=ke(e),f=j(e),y=C.get(e),x;Object.assign(e.style,{position:"absolute",top:`${u}px`,left:`${s}px`,width:`${c}px`,height:`${d}px`,margin:0,pointerEvents:"none",transformOrigin:"center",zIndex:100}),typeof f!="function"?x=e.animate([{transform:"scale(1)",opacity:1},{transform:"scale(.98)",opacity:0}],{duration:f.duration,easing:"ease-out"}):(x=new Animation(f(e,"remove",y)),x.play()),N.set(e,x),x.addEventListener("finish",r)}function ke(e){let t=C.get(e),[n,,o]=ue(e,t,O(e)),r=e.parentElement;for(;r&&(getComputedStyle(r).position==="static"||r instanceof HTMLBodyElement);)r=r.parentElement;r||(r=document.body);let u=getComputedStyle(r),s=C.get(r)||O(r),c=Math.round(t.top-s.top)-S(u.borderTopWidth),d=Math.round(t.left-s.left)-S(u.borderLeftWidth);return[c,d,n,o]}function ee(e,t={}){return K&&I&&(window.matchMedia("(prefers-reduced-motion: reduce)").matches&&typeof t!="function"&&!t.disrespectUserMotionPreference||(U.add(e),getComputedStyle(e).position==="static"&&Object.assign(e.style,{position:"relative"}),le(e,B,be,r=>I==null?void 0:I.observe(r)),typeof t=="function"?$.set(e,t):$.set(e,{duration:250,easing:"ease-in-out",...t}),K.observe(e,{childList:!0}),ie.add(e))),Object.freeze({parent:e,enable:()=>{U.add(e)},disable:()=>{U.delete(e)},isEnabled:()=>U.has(e)})}function W(e,t,n){e&&(e.classList.add(t),setTimeout(function(){e.classList.remove(t)},n))}function V(e){let t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleString("sv",{dateStyle:"short",timeStyle:"short"}).toString()}var L="data-dash-element",v={filter:"data-dash-counters-filter",firstRow:'[data-dash-element="counter-row"]',updateCounterValueInput:'[data-dash-element="update-counter-value-input"]',counterName:'[data-dash-element="counter-name"]',counterCount:'[data-dash-element="counter-count"]',counterUpdated:'[data-dash-element="counter-updated-date"]',updateButton:'[data-dash-element="update-button"]'},F=class{constructor(){this.list=document.querySelector('[data-dash-counters="list"]'),this.rowTemplate=document.querySelector('[data-dash-element="counter-row"]'),this.filter="data-dash-counters-filter",this.loadingRow=document.querySelector(`[${L}="loading-row"]`),this.newCounterButton=document.querySelector(`[${L}="new-counter-button"]`),this.statusBox=document.querySelector(`[${L}="status-box"]`),this.currentValueLabel=document.querySelector(`[${L}="current-value-label"]`),this.nameLabel=document.querySelector(`[${L}="name-label"]`),this.lastIncrementLabel=document.querySelector(`[${L}="last-increment-label"]`)}},z=class{constructor(){this.modalCard=document.querySelector(`[${L}="modal-card"]`),this.modalCloseButtons=document.querySelectorAll(`[${L}="close-button"]`),this.confirmUpdateBlock=document.querySelector(`[${L}="confirm-update-block"]`),this.confirmUpdateText=document.querySelector(`[${L}="confirm-text"]`),this.confirmUpdateButton=document.querySelector(`[${L}="confirm-button"]`),this.newCounterBlock=document.querySelector(`[${L}="new-counter-block"]`),this.confirmNewCounterButton=document.querySelector(`[${L}="confirm-new-counter-button"]`),this.newCounterValueInput=document.querySelector(`[${L}="new-counter-value-input"]`),this.newCounterNameInput=document.querySelector(`[${L}="new-counter-name-input"]`)}};var P={apiUrl:"https://utils-api.vercel.app/api/",counterPath:"counter/",jsDelivrUrl:"https://data.jsdelivr.com/v1/packages/gh/ageraplattformen/agera.js/resolved?specifier=latest"};var Q=class{async getList(t,n,o=100){let r=n.sort_by;n.sort_by==="count"&&(r="name");let u=`${P.apiUrl}counters${t}?sort_by=${r}&order=${n.order}&limit=${o}`;try{let s=await fetch(u);if(!s.ok)return s.status===404?te():te("Error getting data");let c=await s.json();return n.sort_by==="count"&&(n.order==="desc"?c.sort((d,f)=>f.count-d.count):c.sort((d,f)=>d.count-f.count)),c}catch{return te()}}async getInfo(t){let n=`${P.apiUrl}counter/${t}?info=true`;try{let o=await fetch(n);if(!o.ok)throw new Error("Error fetching data");return await o.json()}catch{throw new Error("Error fetching data")}}async put(t){let n=`${P.apiUrl}counter/${t.name}`;try{let o=await fetch(n,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!o.ok)throw new Error("Error fetching data");return o.json()}catch{throw new Error("Error fetching data")}}async post(t){let n=`${P.apiUrl}counter/${t.name}`;try{let o=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!o.ok)return ne();let r=await o.json();return r.details==="Created new counter"?r:ne()}catch{return ne()}}};function te(e="No counters found"){return[{count:0,name:e,last_updated:"",details:"",id:0,form:"",date_created:"",site_id:""}]}function ne(){return{count:0,name:"No counters found",last_updated:"",details:"",id:0,form:"",date_created:"",site_id:""}}function de(){var re;let e=new F,t=new z,n=((re=e.list)==null?void 0:re.getAttribute(v.filter))||"",o=[],r={all:"",this:"/"+q()};r.hasOwnProperty(n)?n=r[n]:n!==""?n=`/${n}`:n=r.this;let u={sort_by:"name",order:"asc"},s=new Q,c=[],d={name:"",newValue:0,oldValue:0,site_id:""};if(!e.rowTemplate)return;let f=e.rowTemplate.parentElement;if(!f)return;e.rowTemplate.remove(),e.loadingRow&&M(e.loadingRow);let y;function x(l,a){let i=R(a),m=i.querySelector(v.counterName),w=i.querySelector(v.counterUpdated),p=i.querySelector(v.updateButton),g=i.querySelector(v.counterCount);if(l.name==="No counters found"){let h=i.querySelector(v.updateCounterValueInput);h&&h.remove(),p&&p.remove()}return m&&(m.textContent=l.name),w&&(l.last_updated?w.textContent=V(l.last_updated):w.textContent=V(l.date_created)),g&&(g.textContent=l.count.toString()),p&&g&&p.addEventListener("click",()=>{b(i,l,g)}),i}function b(l,a,i){var w;let m=l.querySelector(v.updateCounterValueInput);t.modalCard&&m&&(!Number.isNaN(parseInt(m.value))&&t.modalCard.classList.contains("cloak")?(d.name=a.name,d.site_id=a.site_id,d.newValue=parseInt(m.value),d.oldValue=parseInt(((w=i==null?void 0:i.textContent)==null?void 0:w.toString())||"0"),y=l,t.confirmUpdateText&&(t.confirmUpdateText.innerHTML=`Name: ${d.name}<br>Current value: ${d.oldValue}<br>New value: ${d.newValue}`),oe("update")):W(m,"error",500))}function oe(l){if(!t.modalCard)return;M(t.modalCard),t.confirmUpdateBlock&&t.confirmNewCounterButton&&(l==="update"?(M(t.confirmUpdateBlock),T(t.newCounterBlock),a()):l==="new"&&(M(t.newCounterBlock),T(t.confirmUpdateBlock),m())),t.modalCloseButtons.length>0&&t.modalCloseButtons.forEach(p=>{p.addEventListener("click",()=>{var g,h;T(t.modalCard),(g=t.confirmNewCounterButton)==null||g.removeEventListener("click",w),(h=t.confirmUpdateButton)==null||h.removeEventListener("click",i)})});function a(){t.confirmUpdateButton&&t.confirmUpdateButton.addEventListener("click",i)}async function i(){if(k("loading"),!!t.modalCard){if(T(t.modalCard),await s.put({name:d.name,count:d.newValue,site_id:d.site_id})){if(o.forEach(p=>{p.name===d.name&&(p.count=d.newValue)}),y){let p=y.querySelector(v.counterCount);p&&(p.textContent=d.newValue.toString())}k("updated")}else k("error");t.confirmUpdateButton&&t.confirmUpdateButton.removeEventListener("click",i)}}function m(){if(!t.confirmNewCounterButton||!t.newCounterValueInput||!t.newCounterNameInput){T(t.modalCard);return}t.confirmNewCounterButton.addEventListener("click",w)}async function w(){var h;if(!t.newCounterNameInput)return;if(!/^[a-z0-9-]{5,}$/.test(t.newCounterNameInput.value)){W(t.newCounterNameInput,"error",500);return}(h=t.confirmNewCounterButton)==null||h.removeEventListener("click",w),T(t.modalCard),k("loading");let g=await s.post({name:t.newCounterNameInput.value,site_id:q()||"0000"});if(g.id!==0){if(t.newCounterValueInput&&parseInt(t.newCounterValueInput.value)>0?g=await s.put({name:t.newCounterNameInput.value,count:parseInt(t.newCounterValueInput.value),site_id:q()||"0000"}):g=await s.getInfo(t.newCounterNameInput.value),g&&e.rowTemplate){let E=x(g,e.rowTemplate);c.push(E),J(c,u),M(E),W(E,"new",1e3)}k("created"),t.newCounterValueInput&&(t.newCounterValueInput.value=""),t.newCounterNameInput.value=""}else k("error")}}function k(l){let a=document.querySelector('[data-dash-element="status-box"]');if(!a)return;let i=a.childNodes[0],m=a.childNodes[1];m&&(l==="updated"?(i&&T(i),m.innerText="Updated"):l==="created"?(i&&T(i),m.innerText="Created"):l==="loading"?(T(m),i&&M(i)):(i&&T(i),m.innerText="Error",a.classList.add("error")),setTimeout(()=>{M(a),M(m)},100),setTimeout(function(){T(a),a.classList.remove("error")},3e3))}function me(){let l=[{element:e.nameLabel,sort_by:"name",order:"asc"},{element:e.lastIncrementLabel,sort_by:"last_updated",order:"asc"},{element:e.currentValueLabel,sort_by:"count",order:"desc"}];for(let a of l)if(a.element){let i=new URL(window.location.href);i.searchParams.set("sort_by",a.sort_by),a.element.addEventListener("click",m=>{m.preventDefault(),u.sort_by=a.sort_by,u.order=u.order==="asc"?"desc":"asc",i.searchParams.set("order",u.order),history.pushState(null,"",i.href),J(c,u)})}}function fe(l,a){if(!l)return;let i=l.querySelector(v.counterName),m=l.querySelector(v.counterUpdated),w=l.querySelector(v.updateButton),p=l.querySelector(v.counterCount);i&&(i.textContent=a.name),m&&(a.last_updated?m.textContent=V(a.last_updated):m.textContent=V(a.date_created)),p&&(p.textContent=a.count.toString());function g(){b(l,a,p)}return w&&p&&w.addEventListener("click",g),l}function pe(){return o.map(()=>{let a=R(e.rowTemplate);return ee(a,{duration:1e3}),a})}function he(){e.newCounterButton&&e.newCounterButton.addEventListener("click",()=>{oe("new")})}function J(l,a){var g;let i={name:h=>{let E=h.querySelector(v.counterName);return E&&E.textContent||""},last_updated:h=>{let E=h.querySelector(v.counterUpdated);return E&&E.textContent||""},count:h=>{let E=h.querySelector(v.counterCount);return E&&E.textContent||""}},m=new Intl.Collator(void 0,{numeric:a.sort_by==="count",sensitivity:"base"}),w=(g=l[0])==null?void 0:g.parentNode;if(!w)return;Array.from(l).sort((h,E)=>{let[ge,we]=a.order==="asc"?[h,E]:[E,h],ve=i[a.sort_by](ge),Ee=i[a.sort_by](we);return m.compare(ve,Ee)}).forEach(h=>{w.appendChild(h)})}(async function(){if(u.sort_by=new URLSearchParams(window.location.search).get("sort_by")||"count",u.order=new URLSearchParams(window.location.search).get("order")||"asc",o.length===0){let a=await s.getList(n,u,100);a&&(o=a),e.loadingRow&&T(e.loadingRow)}c=pe(),ee(f),c&&c.length>0&&(c.forEach((a,i)=>{fe(a,o[i])}),J(c,u),f==null||f.append(...c),c.forEach((a,i)=>{setTimeout(function(){M(a)},10*i)})),me(),he()})()}function Ie(){ae(),document.addEventListener("DOMContentLoaded",()=>{de()})}window.ageraDash||(window.ageraDash=!0,Ie());})();
