export type ProductType = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
  quantity: number
}

export type CartType = {
  products: ProductType[]
  count: number
  amount: number
  addToCart: (product: ProductType) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  updateAmount: () => void
}
