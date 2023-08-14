"use strict";(()=>{var u=(r,i=!0)=>r.cloneNode(i);var d=(r=document)=>r.documentElement.getAttribute("data-wf-site");function h(r=""){let i={all:"",this:"/"+d()};r=i.hasOwnProperty(r)?i[r]:i.this;let a={name:"",newValue:0,oldValue:0,site_id:""};function p(){return[{count:0,name:"No counters found",last_updated:"",details:"",id:0,form:"",date_created:"",site_id:""}]}let f=document.querySelector('[data-dash-element="confirm-text"]'),m,v=`https://utils-api.vercel.app/api/counters${r}?sort_by=name&order=asc&limit=100`;async function E(){try{let e=await fetch(v);return!e.ok&&e.status===404?p():await e.json()}catch{return p()}}function T(e){let t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleString("sv",{dateStyle:"short",timeStyle:"short"}).toString()}function S(e,t){let o=u(t),n=o.querySelector('[data-dash-element="counter-name"]'),s=o.querySelector('[data-dash-element="counter-updated"]'),l=o.querySelector('[data-dash-element="update-button"]'),c=o.querySelector('[data-dash-element="counter-count"]');if(e.name==="No counters found"){let L=o.querySelector('[data-dash-element="value-input"]');L&&L.remove(),l&&l.remove()}return n&&(n.textContent=e.name),s&&(s.textContent=T(e.last_updated)),c&&(c.textContent=e.count.toString()),l&&c&&l.addEventListener("click",()=>{g(o,e,c)}),o}function g(e,t,o){var l;let n=document.querySelector('[data-dash-element="modal-card"]'),s=e.querySelector('[data-dash-element="value-input"]');n&&s&&(!Number.isNaN(parseInt(s.value))&&n.classList.contains("cloak")?(a.name=t.name,a.site_id=t.site_id,a.newValue=parseInt(s.value),a.oldValue=parseInt(((l=o.textContent)==null?void 0:l.toString())||"0"),m=e,f&&(f.innerHTML=`Name: ${a.name}<br>Current value: ${a.oldValue}<br>New value: ${a.newValue}`),n.classList.remove("cloak")):(s.classList.add("error"),setTimeout(function(){s.classList.remove("error")},500)))}function y(){let e=document.querySelector('[data-dash-element="modal-card"]');if(!e)return;let t=document.querySelector('[data-dash-element="confirm-button"]');t==null||t.addEventListener("click",async()=>{if(await C({name:a.name,count:a.newValue,site_id:a.site_id})){if(e.classList.add("cloak"),m){let n=m.querySelector('[data-dash-element="counter-count"]');n&&(n.textContent=a.newValue.toString()),x(!0)}}else x(!1),e.classList.add("cloak")});let o=document.querySelectorAll('[data-dash-element="close-button"]');o.length>0&&o.forEach(n=>{n.addEventListener("click",()=>{e.classList.add("cloak")})})}function x(e){let t=document.querySelector('[data-dash-element="status-box"]');if(!t)return;let o=t.childNodes[0];e?(o&&(o.innerText="Updated"),t.classList.remove("cloak")):(o&&(o.innerText="Error"),t.classList.add("error"),t.classList.remove("cloak")),setTimeout(function(){t.classList.add("cloak"),t.classList.remove("error")},3e3)}async function C(e){let t="https://utils-api.vercel.app/api/counter/"+e.name;try{return!!(await fetch(t,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok}catch{return!1}}(async function(){let t=document.querySelector('[data-dash-element="counter-row"]'),o=await E();if(!o||!t)return;let n=t.parentElement;t.remove();let s=o.map(l=>S(l,t));n==null||n.append(...s),s.forEach(l=>{setTimeout(function(){l.classList.remove("cloak")},1e3)}),y()})()}{let r=`.cloak { 
		opacity: 0;
		height: 0px;
		overflow: hidden;
		margin: auto;
	}`,i=document.createElement("style");i.textContent=r,document.head.appendChild(i)}document.addEventListener("DOMContentLoaded",()=>{let r=document.querySelector('[data-dash-counters="list"]'),i=(r==null?void 0:r.getAttribute("data-dash-counters-filter"))||void 0;r&&h(i)});})();