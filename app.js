const products = [
{
    id:1,
    name:"Seragam SD Putih Merah",
    price:125000,
    sizes:["S","M","L","XL","XXL"],
    image:"https://picsum.photos/300?1"
},
{
    id:2,
    name:"Seragam SMP Putih Biru",
    price:145000,
    sizes:["S","M","L","XL","XXL"],
    image:"https://picsum.photos/300?2"
},
{
    id:3,
    name:"Seragam SMA Putih Abu",
    price:165000,
    sizes:["S","M","L","XL","XXL"],
    image:"https://picsum.photos/300?3"
}
];

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

const productContainer =
document.getElementById("products");

products.forEach(product => {

productContainer.innerHTML += `

<div class="card">

    <img src="${product.image}" alt="${product.name}">

    <div class="card-body">

        <h3>${product.name}</h3>

        <div class="price">
            Rp ${product.price.toLocaleString()}
        </div>

        <select
        id="size-${product.id}"
        class="size-select">

            ${product.sizes.map(size => `
                <option value="${size}">
                    ${size}
                </option>
            `).join("")}

        </select>

        <button
        class="btn"
        onclick="addToCart(${product.id})">

            Tambah Keranjang

        </button>

    </div>

</div>

`;

});

function addToCart(id){

const product =
products.find(p => p.id === id);

const size =
document.getElementById(
`size-${id}`
).value;

cart.push({
    ...product,
    selectedSize:size
});

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

document.getElementById(
"cartCount"
).innerText =
cart.length;

renderCart();

alert(
`${product.name} ukuran ${size} ditambahkan`
);

}

function openCart(){

document.getElementById(
"cartModal"
).style.display =
"block";

renderCart();

}

function closeCart(){

document.getElementById(
"cartModal"
).style.display =
"none";

}

function renderCart(){

const cartItems =
document.getElementById(
"cartItems"
);

if(!cartItems) return;

cartItems.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

total += item.price;

cartItems.innerHTML += `

<div class="cart-item">

    <div>

        <strong>${item.name}</strong>

        <br>

        Ukuran :
        ${item.selectedSize}

        <br>

        Rp ${item.price.toLocaleString()}

    </div>

    <button
    class="remove-btn"
    onclick="removeItem(${index})">

        Hapus

    </button>

</div>

`;

});

document.getElementById(
"cartTotal"
).innerHTML =
"Total: Rp " +
total.toLocaleString();

}

function removeItem(index){

cart.splice(index,1);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

document.getElementById(
"cartCount"
).innerText =
cart.length;

renderCart();

}

function checkoutWhatsApp(){

if(cart.length === 0){

alert(
"Keranjang masih kosong"
);

return;

}

let message =
`Halo Pilex Uniform,%0A%0ASaya ingin memesan:%0A%0A`;

let total = 0;

cart.forEach((item,index)=>{

message +=
`${index+1}. ${item.name}%0A`;

message +=
`Ukuran : ${item.selectedSize}%0A`;

message +=
`Harga : Rp ${item.price.toLocaleString()}%0A%0A`;

total += item.price;

});

message +=
`--------------------%0A`;

message +=
`Total : Rp ${total.toLocaleString()}%0A%0A`;

message +=
`Nama : %0A`;

message +=
`Alamat : %0A`;

message +=
`No HP : %0A`;

const phone =
"6281234567890"; // GANTI NOMOR ANDA

window.open(
`https://wa.me/${phone}?text=${message}`,
"_blank"
);

cart = [];

localStorage.removeItem(
"cart"
);

document.getElementById(
"cartCount"
).innerText = 0;

renderCart();

closeCart();

}

window.onclick = function(event){

const modal =
document.getElementById(
"cartModal"
);

if(event.target === modal){

closeCart();

}

};

document.getElementById(
"cartCount"
).innerText =
cart.length;

renderCart();
