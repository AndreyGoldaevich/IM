import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {API_BASE_URL} from "@/config";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cartProducts: [],
        userAccessKey: null,
        cartProductsData: [],
        orderInfo: null
    },
    mutations: {
        updateOrderInfo(state, orderInfo) {
            state.orderInfo = orderInfo;
        },
        resetCard(state) {
            state.cartProducts = []
            state.cartProductsData = []
        },
        updateCartProduct(state, {productId, amount}) {
            const item = state.cartProducts.find(item => item.productId === productId);

            if(item) {
                item.amount = amount;
            }
        },
        deleteCartProduct(state, productId) {
            state.cartProducts = state.cartProducts.filter(item => item.productId !== productId);
        },
        updateUserAccessKey(state, accessKey) {
            state.userAccessKey = accessKey;
        },
        updateCartProductsData(state, items) {
            state.cartProductsData = items;
        },
        syncCartProducts(state) {
            state.cartProducts = state.cartProductsData.map(item => {
                return {
                    productId: item.product.id,
                    amount: item.quantity
                }
            })
        }
    },
    getters: {
        cartDetailProducts(state) {
            return state.cartProducts.map(item => {
                const product = state.cartProductsData.find(p => p.product.id === item.productId).product
                return {
                    ...item,
                    product: {
                        ...product,
                        image: product.image.file.url
                    }
                }
            })
        },
        cartTotalPrice(state, getters) {
            return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0)
        },
        cartTot(state, getters) {
            return getters.cartDetailProducts.length
        }
    },
    actions: {
        loadOrderInfo(context, orderId) {
            return axios
                .get(API_BASE_URL + '/api/baskets' + orderId, {
                    params: {
                        userAccessKey: context.state.userAccessKey
                    }
                })
                .then(response => {
                    context.commit('updateOrderInfo', response.data)
                })
        },
        loadCart(context) {
            return axios
                .get(API_BASE_URL + '/api/baskets', {
                    params: {
                        userAccessKey: context.state.userAccessKey
                    }
                })
                .then(response => {
                    if(!context.state.userAccessKey) {
                        localStorage.setItem('userAccessKey', response.data.user.accessKey)
                        context.commit('updateUserAccessKey', response.data.user.accessKey)
                    }
                    context.commit('updateCartProductsData', response.data.items)
                    context.commit('syncCartProducts')
                })
        },
        addProductCard(context, {productId, amount}) {
            return (new Promise(resolve => setTimeout(resolve, 2000)))
                .then(() => {
                    return axios
                        .post(API_BASE_URL + '/api/baskets/products', {
                            productId: productId,
                            quantity: amount
                        }, {
                            params: {
                                userAccessKey: context.state.userAccessKey
                            }
                        })
                        .then(response => {
                            context.commit('updateCartProductsData', response.data.items)
                            context.commit('syncCartProducts')
                        })
                })
        },
        updateCartProductAmount(context, {productId, amount}) {
            context.commit('updateCartProduct', {productId, amount})
            if(amount < 1) {
                return
            }
            return axios
                .put(API_BASE_URL + '/api/baskets/products', {
                    productId,
                    quantity: amount
                }, {
                    params: {
                        userAccessKey: context.state.userAccessKey
                    }
                })
                .then(response => {
                    context.commit('updateCartProductsData', response.data.items)
                })
                .catch(() => {
                    context.commit('syncCartProducts')
                })
        },
        deleteProductToCart(context, { productId }) {
            context.commit('deleteCartProduct', { productId });
            return axios
                .delete(API_BASE_URL + '/api/baskets/products',
                    {
                        params: { userAccessKey: context.state.userAccessKey },
                        data: { productId },
                    },
                )
                .then(response => {
                    context.commit('deleteCartProduct', response.data.items)
                    context.commit('updateCartProductsData', response.data.items)
                    context.commit('syncCartProducts')
                })
        },
    }
});
