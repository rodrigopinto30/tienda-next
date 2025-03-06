'use client'
import { roboto } from '@/app/layout'
import Link from 'next/link'
import { ShoppingCartIcon } from 'lucide-react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { getProductos, filtrarProducto } from '@/lib/utils'
import { ProductType, CartType } from '@/types/types'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductLoading } from '@/components/product/ProductLoading'
import { useCartStore } from '@/hooks/useCart'
import { SidebarCart } from '@/components/cart/sidebar-cart'

export default function Home() {
  const count = useCartStore((state) => state.count)

  const [search, setSearch] = useState<string>('')
  const [products, setProducts] = useState<ProductType[]>([])
  const [productsFiltered, setProductsFiltered] = useState<ProductType[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsApi = await getProductos()
        setProducts(productsApi)
      } catch (error) {
        console.error('Error al obtener los productos:', error)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    if (!search) {
      setProductsFiltered(products)
    } else {
      setProductsFiltered(filtrarProducto(products, search))
    }
  }, [search, products])

  const [active, setActive] = useState<boolean>(false)

  const handleActiveSidebar = () => {
    setActive(!active)
  }

  return (
    <div className={`${roboto.variable} min-h-screen`}>
      {/* Header */}
      <header className='p-4 relative z-10'>
        <div className='fixed top-0 left-0 w-full flex justify-between items-center bg-backgroundColor p-2'>
          <Link href='/' className='text-2xl font-roboto text-[#333333]'>
            PastelShop
          </Link>
          <nav className='hidden md:flex space-x-4'>
            <Link href='/' className='font-roboto text-[#333333]'>
              Mis clases
            </Link>
            <Link href='/productos' className='font-roboto text-[#333333]'>
              Productos
            </Link>
            <Link href='/contacto' className='font-roboto text-[#333333]'>
              Contacto
            </Link>
          </nav>
          <div className='flex items-center justify-center space-x-4'>
            <button className='relative' onClick={handleActiveSidebar}>
              <ShoppingCartIcon className='cursor-pointer' />
              <span>{count}</span>
            </button>
          </div>
          <SidebarCart active={active} handleSidebar={handleActiveSidebar} />
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto py-8 flex flex-row w-full p-5'>
        <div className='mt-[4%] w-full'>
          <section className='w-full flex flex-col items-center mt-15'>
            <Input
              placeholder='Buscar producto'
              className='w-1/2 mb-10 rounded-none border-2 border-black focus:outline-none'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <h1 className='w-full text-3xl font-bold text-start text-[#333333]'>
              Productos filtrados
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center'>
              {productsFiltered.length > 0 ? (
                productsFiltered.map((product) => (
                  <ProductCard
                    product={{
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      description: product.description,
                      category: product.category,
                      image: product.image,
                      rating: {
                        rate: product.rating.rate,
                        count: product.rating.count,
                      },
                      quantity: product.quantity,
                    }}
                    key={product.id}
                  />
                ))
              ) : (
                <ProductLoading />
              )}
            </div>
          </section>

          <section className='w-full mt-10'>
            <h1 className='text-3xl font-bold font-roboto text-[#333333] w-full text-start'>
              Productos Destacados
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {products.slice(0, 9).map((product, index) => (
                <div
                  key={index}
                  className='bg-white border-2 flex flex-col justify-center items-center border-black p-4 shadow-md hover:shadow-lg transition-shadow'
                >
                  {/* <div className="bg-white border-2 border-black h-48  mb-4"></div> */}
                  <Image
                    src={product.image}
                    className='mb-4 object-contain'
                    alt='Card image'
                    width={80}
                    height={60}
                  />
                  <h2 className='text-lg font-semibold mb-2 font-roboto'>
                    {product.title}
                  </h2>
                  <p className='mb-4 font-roboto'>${product.price}</p>
                  {/* <button className="w-full bg-buttonColor text-black py-2 rounded-2xl  transition-colors">
                Ver
                </button> */}
                </div>
              ))}
            </div>
          </section>

          <section className='w-full mt-10'>
            <h1 className='text-3xl font-bold font-roboto text-[#333333]'>
              Últimos agregados
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {products.slice(0, 6).map((product, index) => (
                <div
                  key={index}
                  className='bg-white border-2 flex flex-col justify-center items-center border-black p-4 shadow-md hover:shadow-lg transition-shadow'
                >
                  {/* <div className="bg-white border-2 border-black h-48  mb-4"></div> */}
                  <Image
                    src={product.image}
                    className='mb-4 object-contain'
                    alt='Card image'
                    width={80}
                    height={60}
                  />
                  <h2 className='text-lg font-semibold mb-2 font-roboto'>
                    {product.title}
                  </h2>
                  <p className='mb-4 font-roboto'>${product.price}</p>
                  {/* <button className="w-full bg-buttonColor text-black py-2 rounded-2xl  transition-colors">
                Ver
                </button> */}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className='p-8 mt-12'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Acerca de PastelShop</h3>
            <p className=''>
              Ofrecemos los mejores productos con un toque pastel para alegrar
              tu día.
            </p>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Enlaces Rápidos</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/terminos' className=' '>
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href='/privacidad' className=' '>
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href='/faq' className=' '>
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Contáctanos</h3>
            <p className=''>Email: info@pastelshop.com</p>
            <p className=''>Teléfono: (123) 456-7890</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
