import { ProductType } from '@/types/types';
import React, { useEffect, useState } from 'react'

const STORAGE_KEY = 'cart';

interface StoredCart {
    items: ProductType[];
    createdAt: string;
}

const useCart = () => {

    const [cartItems, setCartItems] = useState<ProductType[]>([]);
    const [countItem, setCountItem] = useState<number>(0);
    const [createdAt, setCreatedAt] = useState<string>('');

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if(stored){
            const { items, createdAt } = JSON.parse(stored) as StoredCart;
            setCartItems(items);
            setCartItems(items)
        } else {
            const newCreatedAt = new Date().toISOString();
            setCreatedAt(newCreatedAt);
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: [], createdAt: newCreatedAt}))
        }
    },[]);

    useEffect(() => {
        setCountItem(cartItems.length);
        console.log(cartItems)
    }, [cartItems])

    const addToCart = (newProduct: ProductType) =>{
        setCartItems(prev => {
            const existingProduct = prev.find((item) => item.id === newProduct.id);
            if(existingProduct){
                return prev.map(item => 
                    item.id === newProduct.id 
                        ? {...item, quantity: item.quantity + newProduct.quantity}
                        : item
                );
            }
            return [...prev, newProduct];    
        });
    }

    return {countItem, addToCart}
}

export default useCart