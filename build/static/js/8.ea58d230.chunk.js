(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[8],{614:function(e,t,a){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}a.d(t,"a",(function(){return n}))},615:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(614);function r(e,t){if(e){if("string"===typeof e)return Object(n.a)(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Object(n.a)(e,t):void 0}}},617:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(615);function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var a=[],n=!0,r=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(n=(c=i.next()).done)&&(a.push(c.value),!t||a.length!==t);n=!0);}catch(u){r=!0,o=u}finally{try{n||null==i.return||i.return()}finally{if(r)throw o}}return a}}(e,t)||Object(n.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},633:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a(614);var r=a(615);function o(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(r.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},654:function(e,t,a){"use strict";a.r(t);var n=a(633),r=a(617),o=a(1),c=a.n(o),i=a(613);t.default=function(){var e=Object(o.useState)([{position:"static"},{position:"static"},{position:"top-right",autohide:3e3}]),t=Object(r.a)(e,2),a=t[0],u=t[1],l=Object(o.useState)("top-right"),s=Object(r.a)(l,2),m=s[0],f=s[1],b=Object(o.useState)(!0),h=Object(r.a)(b,2),d=h[0],p=h[1],y=Object(o.useState)(5e3),E=Object(r.a)(y,2),v=E[0],j=E[1],O=Object(o.useState)(!0),g=Object(r.a)(O,2),k=g[0],S=g[1],w=Object(o.useState)(!0),A=Object(r.a)(w,2),N=A[0],T=A[1],x=a.reduce((function(e,t){return e[t.position]=e[t.position]||[],e[t.position].push(t),e}),{});return c.a.createElement(i.j,null,c.a.createElement(i.n,null,"Toasts."),c.a.createElement(i.k,null,c.a.createElement(i.w,null,c.a.createElement(i.wb,null,c.a.createElement(i.u,{sm:"12",lg:"6"},c.a.createElement(i.J,null,c.a.createElement("h5",null,"Add toast with following props:"),c.a.createElement(i.K,{variant:"custom-checkbox",className:"my-2 mt-4"},c.a.createElement(i.T,{id:"autohide",checked:d,onChange:function(e){p(e.target.checked)},custom:!0}),c.a.createElement(i.cb,{variant:"custom-checkbox",htmlFor:"autohide"},"Autohide of the toast")),d&&c.a.createElement(i.K,{className:"my-2"},c.a.createElement(i.cb,{htmlFor:"ccyear"},"Time to autohide"),c.a.createElement(i.S,{type:"number",value:v,onChange:function(e){j(Number(e.target.value))}})),c.a.createElement(i.K,{className:"my-2"},c.a.createElement(i.cb,{htmlFor:"ccyear"},"Position"),c.a.createElement("select",{className:"form-control",value:m,onChange:function(e){f(e.target.value)}},["static","top-left","top-center","top-right","top-full","bottom-left","bottom-center","bottom-right","bottom-full"].map((function(e,t){return c.a.createElement("option",{key:t},e)})))),c.a.createElement(i.K,{variant:"custom-checkbox",className:"my-2"},c.a.createElement(i.T,{id:"fade",checked:N,onChange:function(e){T(e.target.checked)},custom:!0}),c.a.createElement(i.cb,{variant:"custom-checkbox",htmlFor:"fade"},"fade")),c.a.createElement(i.K,{variant:"custom-checkbox",className:"my-2"},c.a.createElement(i.T,{id:"close",custom:!0,checked:k,onChange:function(e){S(e.target.checked)}}),c.a.createElement(i.cb,{variant:"custom-checkbox",htmlFor:"close"},"closeButton")),c.a.createElement(i.f,{className:"mr-1 w-25",color:"success",onClick:function(){u([].concat(Object(n.a)(a),[{position:m,autohide:d&&v,closeButton:k,fade:N}]))}},"Add toast"))),c.a.createElement(i.u,{sm:"12",lg:"6"},Object.keys(x).map((function(e){return c.a.createElement(i.Pb,{position:e,key:"toaster"+e},x[e].map((function(t,a){return c.a.createElement(i.Mb,{key:"toast"+a,show:!0,autohide:t.autohide,fade:t.fade},c.a.createElement(i.Ob,{closeButton:t.closeButton},"Toast title"),c.a.createElement(i.Nb,null,"This is a toast in ".concat(e," positioned toaster number ").concat(a+1,".")))})))})))))))}}}]);
//# sourceMappingURL=8.ea58d230.chunk.js.map