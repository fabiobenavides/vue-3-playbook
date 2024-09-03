import type { Product } from '@/catalog/product-info/product.interface'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed, type Ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart: Ref<Product[]> = ref([])

  const cartTotal = computed(() => cart.value.reduce((prev, cur) => prev += cur ? cur.price : 0, 0))

  function addToCart(product: Product) {
    cart.value.push(product)
  }

  function removeFromCart(product: Product) {
    const itemIndex = cart.value.findIndex(p => p.id === product.id)
    cart.value.splice(itemIndex, 1)
  }

  return { cart, cartTotal, addToCart, removeFromCart }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}