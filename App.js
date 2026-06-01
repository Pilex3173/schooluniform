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

let cart = 0;

const productContainer =
document.getElementById("products");

products.forEach(product=>{

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
onclick="addToCart()"
>
Tambah Keranjang
</button>

</div>

</div>
`;

});

function addToCart(){

cart++;

document.getElementById(
"cartCount"
).innerText = cart;

}
