<template>
  <main class="loading" v-if="productLoading">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </main>
  <main class="container_pop" v-else-if="!productsData">
    <div class="cookiesContent" id="cookiesPopup">
      <img class="pop_img" src="../assets/dino.png" />
      <p>Упс! Произошла ошибка</p>
      <button class="accept" @click.prevent="loadProducts" type="button">Попробуйте еще раз!</button>
    </div>
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{  category.title}}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{  product.title }}
          </a>
        </li>
      </ul>
    </div>
    <section class="item">
      <div class="loading" v-if="productLoading">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="container_pop" v-if="productLoadingFailed">
        <div class="cookiesContent" id="cookiesPopup">
          <img class="pop_img" src="../assets/dino.png" />
          <p>Упс! Произошла ошибка</p>
          <button class="accept" @click.prevent="loadProducts">Попробуйте еще раз!</button>
        </div>
      </div>
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image.file.url"  :alt="product.item">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="(color, idx) in product.colors" :key="idx">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-1" value="#73B6EA" checked="">
                    <span class="colors__value" :style="{'background-color': color.code}">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128" checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар" @click="productAmount > 1 ? productAmount-- : ''">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" value="1" name="count" v-model.number="productAmount">

                <button type="button" aria-label="Добавить один товар" @click="productAmount++">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>
            </div>
            <div v-show="productAdded" class="added">Товар добавлен в корзину!</div>
            <div v-show="productAddSending" class="added">Добавляем товар в корзину...</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки,
            сделав их максимально эффективными.
            Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+, объединяя полученную с них информацию.
            Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное устройство можно установить как фирменное приложение,
            так и различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников.
            Эта информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона.
            Корпус гаджета выполнен из черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость,
            а также полученная сосмартфона и синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс и т.д.
            (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает,
            что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import gotoPage from "@/helpers/gotoPage"
import numberFormat from '@/helpers/numberFormat'
import axios from 'axios'
import {API_BASE_URL} from "@/config"
import {mapActions} from 'vuex'

export default {
  name: "ProductPage",
  props: ['pageParams'],
  data() {
    return {
      productAmount: 1,
      productsData: null,
      productLoading: false,
      productLoadingFailed: false,
      productAdded: false,
      productAddSending: false,


    }
  },
  filters: {
    numberFormat
  },
  computed: {
    product() {
      return this.productsData
    },
    category() {
      return this.productsData.category
    }
  },
  methods: {
    ...mapActions(['addProductCard']),
    gotoPage,
    addToCart() {
      this.productAdded = false
      this.productAddSending = true
      this.addProductCard({productId: this.product.id, amount: this.productAmount})
          .then(() => {
            this.productAdded = true
            this.productAddSending = false
          })
    },
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      axios.get(API_BASE_URL + '/api/products/' + this.$route.params.id)
          .then(response => this.productsData = response.data)
          .catch(() => this.productsLoadingFailed = true)
          .then(() => this.productsLoading = false)
    }
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProducts()
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.added {
  margin: 20px 10px -40px 10px;
}
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
  right: 5%;
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
  background: rgba(77, 77, 77, .7);
  transition: all .4s;
  -webkit-filter: blur(4px);
  -moz-filter: blur(4px);
  -ms-filter: blur(4px);
  -o-filter: blur(4px);
  filter: blur(4px);
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
