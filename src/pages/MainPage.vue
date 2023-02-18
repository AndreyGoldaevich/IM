<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>
    <div class="content__catalog">
      <product-filter
          :price-from.sync="filterPriceFrom"
          :price-to.sync="filterPriceTo"
          :category-id.sync="filterCategoryId"
          :color-id.sync="filterColorId"
      />
      <section class="catalog">
        <div class="loading" v-if="productsLoading">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <div class="container_pop" v-if="productsLoadingFailed">
          <div class="cookiesContent" id="cookiesPopup">
            <img class="pop_img" src="../assets/dino.png" />
            <p>Упс! Произошла ошибка</p>
            <button class="accept" @click.prevent="loadProducts">Попробуйте еще раз!</button>
          </div>
        </div>
        <product-list :products="products" />
        <base-pagination
            v-model="page"
            :count="countProducts"
            :per-page="productsPerPage"

        />
      </section>
    </div>
  </main>
</template>

<script>
import ProductFilter from "@/components/ProductFilter";
import BasePagination from "@/components/BasePagination";
import ProductList from "@/components/ProductList";
import axios from 'axios';
import {API_BASE_URL} from "@/config";

export default {
  name: "MainPage",
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: '',
      page: 1,
      productsPerPage: 6,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    }
  },
  computed: {
    products() {
      return this.productsData
          ? this.productsData.items.map(product => {
            return {
              ...product,
              image: product.image.file.url
            }
          })
          : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0
    }
  },
  components: {ProductFilter, BasePagination, ProductList},
  methods: {
    loadProducts() {
      this.productsLoading = true
      this.productsLoadingFailed = false
      clearTimeout(this.loadProductsTimer)
      this.loadProductsTimer = setTimeout(() => {
        axios.get(API_BASE_URL + `/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColorId,
          }
        })
            .then(response => this.productsData = response.data)
            .catch(() => this.productsLoadingFailed = true)
            .then(() => this.productsLoading = false)
      }, 1000)
    }
  },
  created() {
    this.loadProducts();
  },
  watch: {
    page() {this.loadProducts()},
    filterCategoryId(){this.loadProducts();},
    filterPriceFrom(){this.loadProducts();},
    filterPriceTo() {this.loadProducts();},
    filterColorId() {this.loadProducts();}
  }

}
</script>

<style scoped>

.container_pop {
  position: absolute;
  width: 100%;
  height: 110%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(77, 77, 77, .5);
  transition: all .4s;
}
.cookiesContent {
  position: relative;
  right: 25%;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  color: #000;
  text-align: center;
  border-radius: 20px;
  padding: 30px 30px 70px;
}
.cookiesContent .pop_img {
  width: 52px;
  margin-bottom: 15px;
}
.cookiesContent p {
  margin-bottom: 40px;
  font-size: 18px;
}
.cookiesContent button.accept {
  cursor: pointer;
  background-color: #9eff00;
  border: none;
  border-radius: 5px;
  width: 200px;
  padding: 14px;
  font-size: 16px;
  color: black;
  box-shadow: 0px 6px 18px -5px #9eff00;
}


.loading {
  position: absolute;
  width: 100%;
  height: 110%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(77, 77, 77, .2);
  transition: all .4s;
  /*-webkit-filter: blur(4px);*/
  /*-moz-filter: blur(4px);*/
  /*-ms-filter: blur(4px);*/
  /*-o-filter: blur(4px);*/
  /*filter: blur(4px);*/
}
.loading .dot {
  position: relative;
  width: 2em;
  height: 2em;
  margin: 0.8em;
  right: 20%;
  border-radius: 50%;
}
.loading .dot::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
  animation: wave 2s ease-out infinite;
}
.loading .dot:nth-child(1) {
  background: #40fd01;
}
.loading .dot:nth-child(1)::before {
  animation-delay: 0.2s;
}
.loading .dot:nth-child(2) {
  background: #4baa20;
}
.loading .dot:nth-child(2)::before {
  animation-delay: 0.4s;
}
.loading .dot:nth-child(3) {
  background: #16ba0f;
}
.loading .dot:nth-child(3)::before {
  animation-delay: 0.6s;
}
.loading .dot:nth-child(4) {
  background: #42a012;
}
.loading .dot:nth-child(4)::before {
  animation-delay: 0.8s;
}
.loading .dot:nth-child(5) {
  background: #31990e;
}
.loading .dot:nth-child(5)::before {
  animation-delay: 1s;
}

@keyframes wave {
  50%, 75% {
    transform: scale(2.5);
  }
  80%, 100% {
    opacity: 0;
  }
}

</style>
