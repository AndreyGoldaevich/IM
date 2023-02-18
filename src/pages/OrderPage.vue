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
        Оформление заказа
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormText title="ФИО" placeholder="Введите ваше полное имя" v-model="formData.name" :error="formError.name"/>

            <BaseFormText title="Адрес доставки" type="text" placeholder="Введите ваш адрес" v-model="formData.address" :error="formError.address"/>

            <BaseFormText title="Телефон" type="tel" placeholder="Введите ваш телефон" v-model="formData.phone" :error="formError.phone"/>

<!--            <label class="form__label">-->
<!--              <input class="form__input" type="tel" name="phone" placeholder="Введите ваш телефон" v-phone v-model="formData.phone">-->
<!--              <span class="form__value">Телефон</span>-->
<!--              <span class="form__error" v-if="formError">{{formError.phone}}</span>-->
<!--            </label>-->

            <BaseFormText title="Email" type="email" placeholder="Введи ваш Email" v-model="formData.email" :error="formError.email"/>

            <base-form-textarea title="Комментарий к заказу" placeholder="Ваши пожелания" v-model="formData.comment" :error="formError.comment"/>


          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500" >
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <cart-item-order v-for="item in products" :key="item.productId" :item="item"/>
          </ul>

          <div class="cart__total">
            <p v-if="totalPrice < '100000'">Доставка: <b>500 ₽</b></p>
            <p v-else-if="totalPrice > '100000'">Доставка: <b>Бесплатная</b></p>
            <p>Итого: <b>{{products.length}}</b> товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorStatus">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorStatus }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from "@/components/BaseFormText";
import BaseFormTextarea from "@/components/BaseFormTextarea";
import numberFormat from "@/helpers/numberFormat";
import {mapGetters} from "vuex";
import CartItemOrder from "@/components/CartItemOrder";
import axios from 'axios'
import {API_BASE_URL} from "@/config";
export default {
  name: "orderPage",
  components: {CartItemOrder, BaseFormText,BaseFormTextarea},
  data() {
    return {
      formData: {},
      formError: {},
      formErrorStatus: '',
    }
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorStatus = '';
      axios
          .post(API_BASE_URL + '/api/orders', {
            ...this.formData
          }, {
            params: {
              userAccessKey: this.$store.state.userAccessKey
            }
          })
          .then(response => {
            this.$store.commit('resetCard')
            this.$store.commit('updateOrderInfo', response.data)
            this.$router.push({name: 'orderInfo', params: {id: response.data.id}})
          })
          .catch(error => {
            this.formErrorStatus = error.response.data.error.message;
            this.formError = error.response.data.error.request || {}
          })
    }
  },
  filters: {numberFormat},
  computed: {
    ...mapGetters({products: 'cartDetailProducts', totalPrice: 'cartTotalPrice', cartLen: 'cartTot'}),
  }
}
</script>

<style scoped>

</style>
