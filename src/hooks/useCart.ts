import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartType, ProductType } from '@/types/types'

export const useCartStore = create<CartType>()(
  persist(
    (set, get) => ({
      products: [],
      count: 0,
      amount: 0,
      addToCart: (product: ProductType) =>
        set((state) => {
          const existingProduct = state.products.find(
            (p) => p.id === product.id
          )
          let newProducts: ProductType[]

          if (existingProduct) {
            newProducts = state.products.map((p) =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            )
          } else {
            newProducts = [...state.products, { ...product, quantity: 1 }]
          }

          const totalAmount = newProducts.reduce(
            (total, p) => total + p.price * p.quantity,
            0
          )

          return {
            ...state,
            products: newProducts,
            count: state.count + 1,
            amount: totalAmount,
          }
        }),
      removeFromCart: (productId: number) =>
        set((state) => {
          const newProducts = state.products.filter(
            (product) => product.id !== productId
          )
          const totalAmount = newProducts.reduce(
            (total, p) => total + p.price * p.quantity,
            0
          )

          return {
            ...state,
            products: newProducts,
            count: newProducts.length,
            amount: totalAmount,
          }
        }),
      clearCart: () =>
        set((state) => ({
          ...state,
          products: [],
        })),
      updateAmount: () =>
        set((state) => ({
          ...state,
          amount: state.products.reduce(
            (total, product) => total + product.quantity,
            0
          ),
        })),
    }),
    {
      name: 'cart-storage',
    }
  )
)
