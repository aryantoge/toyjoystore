const products=[
{id:1,name:"Cuddly Teddy Bear",cat:"Plush",price:699,emoji:"🧸",tag:"BESTSELLER"},
{id:2,name:"Magnetic Building Blocks",cat:"Learning",price:899,emoji:"🧩",tag:"POPULAR"},
{id:3,name:"Racing Car Set",cat:"Vehicles",price:549,emoji:"🏎️",tag:"NEW"},
{id:4,name:"Super Football",cat:"Outdoor",price:399,emoji:"⚽",tag:""},
{id:5,name:"Cute Bunny Plush",cat:"Plush",price:599,emoji:"🐰",tag:""},
{id:6,name:"Kids Puzzle Box",cat:"Learning",price:449,emoji:"🧠",tag:"SALE"},
{id:7,name:"Toy Train",cat:"Vehicles",price:799,emoji:"🚂",tag:""},
{id:8,name:"Space Rocket",cat:"Learning",price:749,emoji:"🚀",tag:"NEW"}
];
let cart=[];
function renderProducts(){
 const q=document.getElementById("searchInput").value.toLowerCase();
 const c=document.getElementById("categorySelect").value;
 const list=products.filter(p=>(c==="All"||p.cat===c)&&p.name.toLowerCase().includes(q));
 document.getElementById("productGrid").innerHTML=list.map(p=>`
 <article class="product"><div class="product-img">${p.emoji}</div>${p.tag?`<span class="tag">${p.tag}</span>`:""}
 <div class="product-info"><h3>${p.name}</h3><div class="stars">★★★★★</div><div class="price">₹${p.price}</div>
 <button class="add" onclick="addToCart(${p.id})">Add to cart</button></div></article>`).join("")||"<p>No toys found.</p>";
}
function setCategory(c){document.getElementById("categorySelect").value=c;scrollToSection("products");renderProducts()}
function scrollToSection(id){document.getElementById(id).scrollIntoView({behavior:"smooth"})}
function addToCart(id){const p=products.find(x=>x.id===id);const x=cart.find(x=>x.id===id);x?x.qty++:cart.push({...p,qty:1});updateCart();showCart()}
function updateCart(){document.getElementById("cartCount").textContent=cart.reduce((s,p)=>s+p.qty,0)}
function showCart(){document.getElementById("cartModal").classList.remove("hidden");renderCart()}
function closeCart(){document.getElementById("cartModal").classList.add("hidden")}
function renderCart(){
 const box=document.getElementById("cartItems");
 box.innerHTML=cart.length?cart.map(p=>`<div class="cart-row"><span>${p.emoji} ${p.name}<br>₹${p.price} × ${p.qty}</span><button onclick="removeItem(${p.id})">Remove</button></div>`).join(""):"<p>Your cart is empty.</p>";
 document.getElementById("cartTotal").textContent=cart.reduce((s,p)=>s+p.price*p.qty,0);
}
function removeItem(id){cart=cart.filter(p=>p.id!==id);updateCart();renderCart()}
function checkout(){alert("Demo checkout: your order is ready! Connect a payment gateway to accept real payments.");}
renderProducts();updateCart();
