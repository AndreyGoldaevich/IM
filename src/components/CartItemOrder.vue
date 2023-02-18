<template>
  <li class="cart__order">
    <h3>{{ item.product.title }}</h3>
    <b>{{ (item.amount * item.product.price) | numberFormat }} ₽</b>
    <span>Артикул: {{ item.product.id }}</span>
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";

export default {
  name: "CartItemOrder",
  props: ['item'],
  filters: {numberFormat},
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
