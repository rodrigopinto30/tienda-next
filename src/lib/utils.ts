import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getProductos(){
  const response = await fetch("https://fakestoreapi.com/products");
    const productos = await response.json();
    return productos;
}

export function filtrarProducto(products: any[], value: string) {
  const filtered = products.filter(product =>
    product.title.toLowerCase().includes(value.toLowerCase())
  );
  return(filtered);
}