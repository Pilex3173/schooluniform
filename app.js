const products = [
{
    id:1,
    name:"Seragam SD Putih Merah",
    price:125000,
    image:"https://picsum.photos/300?1"
},
{
    id:2,
    name:"Seragam SMP Putih Biru",
    price:145000,
    image:"https://picsum.photos/300?2"
},
{
    id:3,
    name:"Seragam SMA Putih Abu",
    price:165000,
    image:"https://picsum.photos/300?3"
}
];

let cart = [];

const productContainer =
document.getElementById("products");

products.forEach(product => {

productContainer.innerHTML += `

<div class="card">

<img src="${product.image}">

<div class="card-body">

<h3>${product.name}</h3>

<div class="price">
Rp ${product.price.toLocaleString()}
</div>

<button
class="btn"
onclick="addToCart(${product.id})"
>
Tambah Keranjang
</button>

</div>

</div>

`;

});

function addToCart(id){

const product =
products.find(p => p.id === id);

cart.push(product);

document.getElementById("cartCount")
.innerText = cart.length;

alert(product.name + " ditambahkan");

}

function checkoutWhatsApp(){

if(cart.length === 0){

alert("Keranjang masih kosong");

return;

}

let message =
`Halo Pilex Uniform,%0A%0ASaya ingin memesan:%0A`;

let total = 0;

cart.forEach((item,index)=>{

message +=
`${index+1}. ${item.name} - Rp ${item.price.toLocaleString()}%0A`;

total += item.price;

});

message +=
`%0A--------------------%0A`;

message +=
`Total : Rp ${total.toLocaleString()}%0A`;

message +=
`%0ANama:%0AAlamat:%0ANo HP:%0A`;

const phone =
"6281234567890"; // GANTI NOMOR ANDA

window.open(
`https://wa.me/${phone}?text=${message}`,
"_blank"
);

}
