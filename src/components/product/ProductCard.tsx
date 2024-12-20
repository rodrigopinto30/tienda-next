
import { ProductType } from "@/types/types";
import Image from 'next/image';
import { Button } from "../ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import useCart from "@/hooks/useCart";


export function ProductCard({ id, category, image, title, price, description, rating, quantity }: ProductType) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({ id, category, image, title, price, description, rating, quantity })
    }

    return (
        <Card className="flex overflow-hidden flex-col p-5">
            <span className='font-nunito w-full text-start text-gray-500'>{category}</span>
            <div className='relative w-full h-auto aspect-video'>
                <Image
                    src={image}
                    alt='Card image'
                    fill
                />
            </div>
            <CardHeader className="text-lg  font-semibold mb-2 font-nunito">{title}</CardHeader>
            <CardDescription className="mb-4 font-nunito font-lg text-green-700">$ {price}</CardDescription>
            <CardFooter>
                <Button onClick={handleAddToCart} className='rounded-none bg-gray-500'>Agregar<ShoppingCartIcon /></Button>
            </CardFooter>
        </Card>
    )
}

