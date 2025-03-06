import { useCartStore } from '@/hooks/useCart'
import { Button } from '../ui/button'
import { QuoteIcon, X } from 'lucide-react'

export function SidebarCart({
  active,
  handleSidebar,
}: {
  active: boolean
  handleSidebar: () => void
}) {
  const { removeFromCart, products, amount } = useCartStore()

  const handleRemove = (id: number) => {
    removeFromCart(id)
  }

  return (
    <aside
      className={`${
        active ? 'flex' : 'hidden'
      } flex-col w-[500px] h-screen p-2 bg-white border-l-2 border-black absolute z-10 right-0 top-0`}
    >
      <div className='flex flex-row items-center justify-between'>
        <span className='underline underline-offset-1'>Carrito de compra</span>
        <button
          className='border-2 border-black p-1 rounded-none hover:bg-black hover:text-white hover:border-white'
          onClick={handleSidebar}
        >
          Cerrar
        </button>
      </div>
      <ul className='flex flex-col gap-3 h-full p-2 mt-2 overflow-y-auto'>
        {products.length < 1 ? (
          <li className='p-5'>No hay productos en el carrito</li>
        ) : (
          products.map((product) => (
            <li
              key={product.id}
              className='flex flex-row w-full justify-between border-2 border-black p-1'
            >
              <div className='whitespace-nowrap overflow-hidden text-ellipsis'>
                <span className=''>{product.title}</span>
                <br />
                <span className='text-sm underline underline-offset-1'>
                  $ {product.price}{' '}
                </span>
              </div>
              <button
                className='border-2 border-black hover:border-white hover:text-white hover:bg-black'
                onClick={() => handleRemove(product.id)}
              >
                <X />
              </button>
            </li>
          ))
        )}
      </ul>
      <div>
        <span className='bg-black text-white text-bold text-xl'>
          Total a pagar ${amount}
        </span>
      </div>
    </aside>
  )
}
