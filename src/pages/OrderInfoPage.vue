<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ 23621</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orders.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orders.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orders.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orders.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <cart-item-order v-for="item in orders.basket.items" :key="item.id" :item="item"/>
          </ul>

          <div class="cart__total">
            <p v-if="totalPrice < '100000'">Доставка: <b>500 ₽</b></p>
            <p v-else-if="totalPrice > '100000'">Доставка: <b>Бесплатная</b></p>
            <p>Итого: <b>{{products.length}}</b> товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartItemOrder from "@/components/CartItemOrder";
import numberFormat from "@/helpers/numberFormat";
import {mapGetters, mapState} from "vuex";

export default {
  name: "OrderInfoPage",
  components: {CartItemOrder},
  data() {
    return {
      formData: {},
      formError: {},
    }
  },
  filters: {numberFormat},
  computed: {
    ...mapState({orders: 'orderInfo'}),
    ...mapGetters({products: 'cartDetailProducts', totalPrice: 'cartTotalPrice', cartLen: 'cartTot'}),
  },
  created() {
    if(this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
      return
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
