<template>
  <div class="app">

    <header class="navbar">
      <div class="logo">
        SERAGAM SEKOLAH
      </div>

      <nav>
        <a href="#">SD</a>
        <a href="#">SMP</a>
        <a href="#">SMA</a>
      </nav>

      <button class="cart">
        🛒 Keranjang
      </button>
    </header>

    <section class="hero">
      <h1>
        Marketplace Seragam Sekolah
      </h1>

      <p>
        Menyediakan Seragam SD, SMP, SMA lengkap semua ukuran
      </p>
    </section>

    <section class="products">

      <div
        class="card"
        v-for="item in products"
        :key="item.id"
      >
        <img :src="item.image">

        <h3>{{ item.name }}</h3>

        <p>
          Rp {{ item.price.toLocaleString() }}
        </p>

        <button @click="addToCart(item)">
          Tambah Keranjang
        </button>
      </div>

    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([
{
id:1,
name:'Seragam SD Putih Merah',
price:125000,
image:'https://via.placeholder.com/300'
},
{
id:2,
name:'Seragam SMP Putih Biru',
price:145000,
image:'https://via.placeholder.com/300'
},
{
id:3,
name:'Seragam SMA Putih Abu',
price:165000,
image:'https://via.placeholder.com/300'
}
])

function addToCart(item){
alert(item.name + ' ditambahkan')
}
</script>

<style>
@import './assets/style.css';
</style>
