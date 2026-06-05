const products = [
    {
        id:1,
        name:"Seragam SD Putih Merah",
        price:125000,
        sizes:["S","M","L","XL","XXL"],
        // Seragam SD putih merah
        image:"https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=400" //image:"./images/seragam-sd.jpg"
    },
    {
        id:2,
        name:"Seragam SMP Putih Biru",
        price:145000,
        sizes:["S","M","L","XL","XXL"],
        // Seragam SMP/siswa muda
        image:"https://images.unsplash.com/photo-1571210862729-78a52d3779a2?w=400" //image:"./images/seragam-smp.jpg"
    },
    {
        id:3,
        name:"Seragam SMA Putih Abu",
        price:165000,
        sizes:["S","M","L","XL","XXL"],
        // Seragam SMA/remaja
        image:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400"//image:"./images/seragam-sma.jpg"
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
            Rp ${product.price.toLocaleString("id-ID")}
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
        Rp ${item.price.toLocaleString("id-ID")}
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
total.toLocaleString("id-ID");
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

// FIX 3: Gunakan encodeURIComponent agar angka & karakter aman di URL WhatsApp
let lines = "Halo Pilex Uniform,\n\nSaya ingin memesan:\n\n";
let total = 0;

cart.forEach((item,index)=>{
lines += `${index+1}. ${item.name}\n`;
lines += `Ukuran : ${item.selectedSize}\n`;
lines += `Harga : Rp ${item.price.toLocaleString("id-ID")}\n\n`;
total += item.price;
});

lines += `--------------------\n`;
lines += `Total : Rp ${total.toLocaleString("id-ID")}\n\n`;
lines += `Nama : \n`;
lines += `Alamat : \n`;
lines += `No HP : \n`;

const phone = "6281234567890"; // GANTI NOMOR ANDA
window.open(
`https://wa.me/${phone}?text=${encodeURIComponent(lines)}`,
"_blank"
);

cart = [];
localStorage.removeItem("cart");
document.getElementById("cartCount").innerText = 0;
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

document.getElementById("cartCount").innerText = cart.length;
renderCart();
