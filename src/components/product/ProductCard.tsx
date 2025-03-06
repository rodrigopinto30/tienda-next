import { ProductType } from '@/types/types'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ShoppingCartIcon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { useCartStore } from '@/hooks/useCart'
import Link from 'next/link'

export function ProductCard({ product }: { product: ProductType }) {
  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = () => {
    addToCart(product)
  }

  const { category, image, title, price, id } = product

  return (
    <Link
      href={`/product/${id}`}
      className='flex overflow-hidden flex-col p-5 rounded-none border-2 border-white hover:border-black cursor-pointer'
    >
      <span className='font-nunito w-full text-start text-gray-500'>
        {category}
      </span>
      <div className='relative w-full h-auto aspect-video'>
        <Image src={image} alt='Card image' fill sizes='10' />
      </div>
      <CardHeader className='text-lg  font-semibold mb-2 font-nunito'>
        {title}
      </CardHeader>
      <CardDescription className='mb-4 font-nunito font-lg text-green-700'>
        $ {price}
      </CardDescription>
      <CardFooter>
        <Button
          onClick={handleAddToCart}
          className='rounded-none bg-black text-white w-full'
        >
          Agregar
          <ShoppingCartIcon />
        </Button>
      </CardFooter>
    </Link>
  )
}
