<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/max-len -->
<!-- eslint-disable vue/return-in-computed-property -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <li class="cart__item product">
    <div class="product__pic" >
        <img :src="item.product.image" width="120" height="120"  alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
       Артикул: {{ item.product.id }}
    </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="amount > 1 ? amount-- : ''">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text"  name="count" v-model.number="amount">

      <button type="button" aria-label="Добавить один товар" @click.prevent="amount++">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>
    <b class="product__price">
      {{ (item.amount * item.product.price) | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(item)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat"
import {mapActions} from 'vuex'
export default {
  name: "CartItem",
  props: ['item'],
  filters: {numberFormat},
  methods: {
    ...mapActions({deleteProduct: "deleteProductToCart"}),
  },
  computed: {
    amount: {
      get() {
        return this.item.amount
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      }
    },
  },
}
</script>

<style scoped>

</style>
