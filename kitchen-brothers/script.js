const menuToggle=document.querySelector("#menuToggle"),mainNav=document.querySelector("#mainNav");
menuToggle.addEventListener("click",()=>{const open=mainNav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.textContent=open?"×":"☰";});
mainNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{mainNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.textContent="☰";}));
document.querySelector("#year").textContent=new Date().getFullYear();

// Product data transcribed from the four supplied menu photographs.
// Prices are in ZAR. Restaurant should verify availability and current pricing before launch.
const products=[
{id:"beef1",name:"Cheesy Bhuda",category:"beef",price:100,desc:"Beef patty, lettuce, tomatoes, cheese, fries and Chef's sauce."},
{id:"beef2",name:"Cheesy Bacon Bhuda",category:"beef",price:110,desc:"Beef patty, bacon, lettuce, tomatoes, cheese, fries and Chef's sauce."},
{id:"beef3",name:"Spicy Jalapeno",category:"beef",price:105,desc:"Beef patty, lettuce, cheese, jalapeno sauce and Chef's sauce."},
{id:"beef4",name:"Cheesy Guacamole",category:"beef",price:110,desc:"Beef patty, lettuce, guacamole, cheese and Chef's sauce."},
{id:"beef5",name:"Double Guacamole Juicy Monster",category:"beef",price:130,desc:"Double beef patties, bacon, lettuce, guacamole, tomatoes, cheese and Chef's sauce."},
{id:"beef6",name:"Juicy Monster",category:"beef",price:130,desc:"Double beef patties, bacon, lettuce, tomatoes, cheese and Chef's sauce."},
{id:"beef7",name:"Triple Juicy Monster",category:"beef",price:170,desc:"Triple beef patties, triple bacon, lettuce, guacamole, tomatoes, triple cheese and Chef's sauce."},
{id:"chick1",name:"Single Grilled Chicken Burger",category:"chicken",price:100,desc:"Chicken fillet, lettuce, tomatoes, cheese, fries and Chef's sauce."},
{id:"chick2",name:"Mexican Crispy Chicken Burger",category:"chicken",price:110,desc:"Crispy fried fillet, lettuce and coleslaw."},
{id:"chick3",name:"Double Mexican Crispy Burger",category:"chicken",price:130,desc:"Double crispy fried fillets, lettuce, coleslaw and Chef's sauce."},
{id:"chick4",name:"Juicy Chicken Burger",category:"chicken",price:120,desc:"Double grilled fillets, lettuce, salsa, bacon and Chef's sauce."},
{id:"kota1",name:"Normal / Classic Kota",category:"kotas",price:50,desc:"Quarter bread, lettuce, russian, fries, cheese and Chef's sauce."},
{id:"kota2",name:"Juicy Kota",category:"kotas",price:90,desc:"Quarter bread, lettuce, fries, beef patty, cheese, russian and Chef's sauce."},
{id:"kota3",name:"Juicy Kota Monster",category:"kotas",price:105,desc:"Quarter bread, lettuce, fries, beef patty, cheese, russian and Chef's sauce."},
{id:"wrap1",name:"Chicken Quesadilla",category:"wraps",price:95,desc:"Chicken strips, salsa, cheese, guacamole and Chef's sauce."},
{id:"wrap2",name:"Chicken Wrap",category:"wraps",price:90,desc:"Grilled chicken, lettuce, cheese and Chef's sauce."},
{id:"wrap3",name:"Chicken Taco",category:"wraps",price:95,desc:"Chicken strips, lettuce, salsa and Chef's sauce in a tortilla."},
{id:"wrap4",name:"Chicken Burrito",category:"wraps",price:95,desc:"Guacamole, fries, lettuce, grilled chicken and Chef's sauce."},
{id:"wrap5",name:"Beef Quesadilla",category:"wraps",price:105,desc:"Mince, salsa, cheese, guacamole and Chef's sauce."},
{id:"wrap6",name:"Beef Burrito",category:"wraps",price:95,desc:"Beef mince with lettuce, guacamole, fries and Chef's sauces."},
{id:"wrap7",name:"Shrimp Taco",category:"wraps",price:120,desc:"Red cabbage, salsa, grilled shrimp, guacamole and chilli mayo."},
{id:"extra1",name:"Chicken Strips",category:"extras",price:85,desc:"Chicken strips."},
{id:"extra2",name:"3 × Wings",category:"extras",price:65,desc:"Three chicken wings."},
{id:"extra3",name:"4 × Wings",category:"extras",price:80,desc:"Four chicken wings."},
{id:"extra4",name:"6 × Wings",category:"extras",price:110,desc:"Six chicken wings."},
{id:"extra5",name:"Bacon",category:"extras",price:10,desc:"Add bacon."},
{id:"extra6",name:"Cheese",category:"extras",price:10,desc:"Add cheese."},
{id:"extra7",name:"Jalapeno",category:"extras",price:10,desc:"Add jalapeno."},
{id:"extra8",name:"Guacamole",category:"extras",price:10,desc:"Add guacamole."},
{id:"extra9",name:"Extra Bun",category:"extras",price:5,desc:"Add an extra bun."},
{id:"combo1",name:"Combo 1",category:"combos",price:270,desc:"Double Cheesy Bhuda, 4 × full wings and loaded fries."},
{id:"combo2",name:"Combo 2",category:"combos",price:290,desc:"Cheesy Bhuda, crispy chicken burger, chicken strips and loaded fries."},
{id:"combo3",name:"Combo 3",category:"combos",price:310,desc:"Double Mexican crispy chicken burgers, double full wings, chicken strips and loaded fries."}
];
const categoryNames={beef:"Beef burgers",chicken:"Chicken burgers",kotas:"Kotas",wraps:"Wraps",extras:"Extraaz",combos:"Combos"};
const money=n=>new Intl.NumberFormat("en-ZA",{style:"currency",currency:"ZAR"}).format(n);
const cart={};
const menuGrid=document.querySelector("#menuGrid");
function renderMenu(category="all"){
 const list=category==="all"?products:products.filter(p=>p.category===category);
 menuGrid.innerHTML=list.map(p=>`<article class="menu-card"><div class="menu-card-top"><h3>${p.name}</h3><strong class="price">${money(p.price)}</strong></div><p>${p.desc}</p><div class="menu-card-bottom"><span class="category-label">${categoryNames[p.category]}</span><button class="add-button" data-add="${p.id}">Add +</button></div></article>`).join("");
}
document.querySelector("#categoryTabs").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;document.querySelectorAll(".category-tab").forEach(x=>x.classList.toggle("active",x===b));renderMenu(b.dataset.category);});
menuGrid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(!b)return;cart[b.dataset.add]=(cart[b.dataset.add]||0)+1;renderCart();b.textContent="Added ✓";setTimeout(()=>{if(b.isConnected)b.textContent="Add +";},800);});
const cartBackdrop=document.querySelector("#cartBackdrop"),checkoutBackdrop=document.querySelector("#checkoutBackdrop"),previewBackdrop=document.querySelector("#previewBackdrop");
function qty(){return Object.values(cart).reduce((a,b)=>a+b,0)}
function subtotal(){return Object.entries(cart).reduce((s,[id,q])=>s+products.find(p=>p.id===id).price*q,0)}
function renderCart(){
 document.querySelector("#cartCount").textContent=qty();
 document.querySelector("#cartSubtotal").textContent=money(subtotal());
 document.querySelector("#checkoutSubtotal").textContent=money(subtotal());
 document.querySelector("#goCheckout").disabled=!qty();
 const rows=Object.entries(cart).filter(([,q])=>q>0);
 document.querySelector("#cartItems").innerHTML=rows.length?rows.map(([id,q])=>{const p=products.find(x=>x.id===id);return `<article class="cart-line"><div><h3>${p.name}</h3><small>${money(p.price)} each</small><div class="quantity"><button data-action="minus" data-id="${id}">−</button><strong>${q}</strong><button data-action="plus" data-id="${id}">+</button><button class="remove" data-action="remove" data-id="${id}">Remove</button></div></div><strong>${money(p.price*q)}</strong></article>`}).join(""):'<p class="empty-cart">Your cart is empty. Explore the menu and add a favourite.</p>';
}
document.querySelector("#cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-action]");if(!b)return;const id=b.dataset.id;if(b.dataset.action==="plus")cart[id]=(cart[id]||0)+1;if(b.dataset.action==="minus")cart[id]=Math.max(0,(cart[id]||0)-1);if(b.dataset.action==="remove")delete cart[id];if(cart[id]===0)delete cart[id];renderCart();});
function openModal(m){m.hidden=false;document.body.style.overflow="hidden"}
function closeModal(m){m.hidden=true;if([cartBackdrop,checkoutBackdrop,previewBackdrop].every(x=>x.hidden))document.body.style.overflow=""}
document.querySelector("#openCart").addEventListener("click",()=>{renderCart();openModal(cartBackdrop)});
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>closeModal(document.getElementById(b.dataset.close))));
[cartBackdrop,checkoutBackdrop,previewBackdrop].forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModal(m)}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")[previewBackdrop,checkoutBackdrop,cartBackdrop].forEach(m=>{if(!m.hidden)closeModal(m)})});
document.querySelector("#goCheckout").addEventListener("click",()=>{closeModal(cartBackdrop);openModal(checkoutBackdrop)});
const addressField=document.querySelector("#addressField"),addressInput=addressField.querySelector("textarea");
document.querySelectorAll('input[name="fulfilment"]').forEach(r=>r.addEventListener("change",()=>{const delivery=document.querySelector('input[name="fulfilment"]:checked').value==="Delivery";addressField.hidden=!delivery;addressInput.required=delivery;}));
document.querySelector("#checkoutForm").addEventListener("submit",e=>{
 e.preventDefault();if(!qty())return;const d=new FormData(e.currentTarget),delivery=d.get("fulfilment")==="Delivery";
 const safe=v=>String(v||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
 let lines=Object.entries(cart).filter(([,q])=>q>0).map(([id,q])=>{const p=products.find(x=>x.id===id);return `<div class="preview-line"><span>${q} × ${p.name}</span><strong>${money(p.price*q)}</strong></div>`}).join("");
 lines+=`<div class="preview-line"><span>Fulfilment</span><strong>${delivery?"Delivery":"Collection"}</strong></div><div class="preview-line"><span>Name</span><strong>${safe(d.get("customerName"))}</strong></div><div class="preview-line"><span>Phone</span><strong>${safe(d.get("phone"))}</strong></div>`;
 if(delivery)lines+=`<div class="preview-line"><span>Address</span><strong>${safe(d.get("address"))}</strong></div>`;
 if(d.get("notes"))lines+=`<div class="preview-line"><span>Notes</span><strong>${safe(d.get("notes"))}</strong></div>`;
 lines+=`<div class="cart-total"><span>Items subtotal</span><strong>${money(subtotal())}</strong></div>`;
 document.querySelector("#orderPreview").innerHTML=lines;closeModal(checkoutBackdrop);openModal(previewBackdrop);
});
document.querySelector("#copyOrder").addEventListener("click",async()=>{
 const form=new FormData(document.querySelector("#checkoutForm"));
 const delivery=form.get("fulfilment")==="Delivery";
 const lines=Object.entries(cart).filter(([,q])=>q>0).map(([id,q])=>{const p=products.find(x=>x.id===id);return `${q} x ${p.name} - ${money(p.price*q)}`;});
 const summary=["KITCHEN BROTHERS - ORDER PREVIEW",...lines,`Fulfilment: ${delivery?"Delivery":"Collection"}`,`Name: ${form.get("customerName")}`,`Phone: ${form.get("phone")}`,...(delivery?[`Address: ${form.get("address")}`]:[]),...(form.get("notes")?[`Notes: ${form.get("notes")}`]:[]),`Subtotal: ${money(subtotal())}`,"NOTE: This is a preview. The order has not been submitted or paid."].join("\n");
 try{await navigator.clipboard.writeText(summary);document.querySelector("#copyOrder").textContent="Copied ✓";setTimeout(()=>document.querySelector("#copyOrder").textContent="Copy order summary",1800);}catch{alert("Copy is not available in this browser. Please select and copy your order details manually.");}
});
document.querySelector("#backToMenu").addEventListener("click",()=>{closeModal(previewBackdrop);document.querySelector("#menu").scrollIntoView({behavior:"smooth"})});
renderMenu();renderCart();
