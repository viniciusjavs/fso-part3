(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{40:function(e,n,t){"use strict";t.r(n);var r=t(16),a=t.n(r),c=t(3),o=t(1),u=t(0),i=function(e){var n=e.name,t=e.handleChange;return Object(u.jsxs)("div",{children:["filter shown with: ",Object(u.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.addPerson,t=e.name,r=e.handleNameChange,a=e.number,c=e.handleNumberChange;return Object(u.jsxs)("form",{onSubmit:n,children:[Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{htmlFor:"name",children:"name:"}),Object(u.jsx)("input",{id:"name",value:t,onChange:r})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{htmlFor:"number",children:"number:"}),Object(u.jsx)("input",{value:a,onChange:c})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},s=function(e){var n=e.name,t=e.number,r=e.id,a=e.handleClick;return Object(u.jsxs)("div",{children:[n," ",t," \xa0",Object(u.jsx)("button",{onClick:function(){return a(n,r)},children:"delete"})]})},l=function(e){var n=e.persons,t=e.handleDel;return Object(u.jsx)("div",{children:n.map((function(e){var n=e.name,r=e.number,a=e.id;return Object(u.jsx)(s,{name:n,number:r,id:a,handleClick:t},a)}))})},b=t(4),h=t.n(b),j="/api/persons",m={getAll:function(){return h.a.get(j).then((function(e){return e.data}))},create:function(e){return h.a.post(j,e).then((function(e){return e.data}))},del:function(e){return h.a.delete("".concat(j,"/").concat(e)).then((function(e){}))},update:function(e,n){return h.a.put("".concat(j,"/").concat(e),n).then((function(e){return e.data}))}},f=function(e){var n=e.noteObj,t=n.message,r={color:"red",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"};return!0===n.success&&(r.color="green"),void 0===t?null:Object(u.jsx)("div",{style:r,children:t})},O=function(){var e=Object(o.useState)([]),n=Object(c.a)(e,2),t=n[0],r=n[1],a=Object(o.useState)(""),s=Object(c.a)(a,2),b=s[0],h=s[1],j=Object(o.useState)(""),O=Object(c.a)(j,2),v=O[0],p=O[1],x=Object(o.useState)(""),g=Object(c.a)(x,2),C=g[0],w=g[1],k=Object(o.useState)({}),y=Object(c.a)(k,2),S=y[0],D=y[1],N=function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],t={message:e,success:n};D(t),setTimeout((function(){D({})}),5e3)};Object(o.useEffect)((function(){m.getAll().then((function(e){r(e)}))}),[]);var A=function(e){return r(t.filter((function(n){return n.id!==e})))},P=""===C?t:t.filter((function(e){return e.name.toLowerCase().startsWith(C.toLowerCase())}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(f,{noteObj:S}),Object(u.jsx)(i,{name:C,handleChange:function(e){var n=e.target.value;return w(n)}}),Object(u.jsx)("h3",{children:"Add a new"}),Object(u.jsx)(d,{addPerson:function(e){e.preventDefault();var n={name:b,number:v},a=t.find((function(e){return e.name===n.name}));void 0!==a?window.confirm("".concat(a.name," is already added to phonebook, replace the old number with a new one?"))&&m.update(a.id,n).then((function(e){r(t.map((function(n){return n.id===a.id?e:n}))),N("Updated ".concat(n.name,"'s number"))})).catch((function(e){console.error(e.response),404===e.response.status?(N("Information of ".concat(n.name," has already been removed from server"),!1),A(a.id)):N(e.response.data.error,!1)})):m.create(n).then((function(e){r(t.concat(e)),N("Added ".concat(n.name))})).catch((function(e){console.error(e.response),N(e.response.data.error,!1)})),h(""),p("")},name:b,handleNameChange:function(e){var n=e.target.value;return h(n)},number:v,handleNumberChange:function(e){var n=e.target.value;return p(n)}}),Object(u.jsx)("h3",{children:"Numbers"}),Object(u.jsx)(l,{persons:P,handleDel:function(e,n){window.confirm("Delete ".concat(e," ?"))&&m.del(n).then((function(){A(n),N("Deleted ".concat(e))})).catch((function(){N("".concat(e," had already been removed from server"),!1),A(n)}))}})]})};a.a.render(Object(u.jsx)(O,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.94e1c049.chunk.js.map