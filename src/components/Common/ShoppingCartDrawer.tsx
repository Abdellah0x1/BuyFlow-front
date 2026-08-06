"use client"

import * as React from "react"

import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { ShoppingBag, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cardStore"
import { useAuthStore } from "@/store/authStore"
import { Link } from "react-router"


export function ShoppingCartDrawer() {
    const [open, setOpen] = React.useState(false)
    const isMobile = useIsMobile()
    const totalItem = useCartStore(state => state.totalItems)
    const items = useCartStore(state => state.items)
    const fetchCart = useCartStore(state => state.fetchCart);
    const totalPrice = useCartStore(state => state.totalPrice)
    const cartId = useCartStore(state => state.cartId);
    const deleteFromCart = useCartStore(state => state.deleteFromCart);
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const hasCheckedAuth = useAuthStore(state => state.hasCheckedAuth);



    React.useEffect(() => {
        if (hasCheckedAuth && isAuthenticated) {
            fetchCart()
        }
    }, [fetchCart, hasCheckedAuth, isAuthenticated])

    return (
        <Drawer
            open={open}
            onOpenChange={setOpen}
            showSwipeHandle={isMobile}
            swipeDirection={isMobile ? "down" : "right"}
        >
            <DrawerTrigger render={<Button variant="secondary" className="relative text-gray-600 hover:text-black">
                <ShoppingCart size={22} />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {totalItem}
                </span>
            </Button>} />
            <DrawerContent className="bg-white">
                <DrawerHeader>
                    <DrawerTitle className="text-center ">Cart Items</DrawerTitle>
                    <DrawerDescription>
                        Add items to your cart from our products
                    </DrawerDescription>
                </DrawerHeader>
                <div className="flex-1 scroll-fade overflow-y-auto p-4 ">
                    {items && items.length > 0 ? items.map((item) => (
                        <div key={item.productId} className="relative flex items-center mt-3 border border-gray-200 rounded-md justify-between ">
                            <div className="flex items-center gap-2 w-full bg-gray-100 p-2 rounded-md">
                                <img src={item.images[0].url} alt={item.productName} className="w-12 h-12 rounded-md" />
                                <div className="w-full">
                                    <h3 className="text-sm font-medium line-clamp-1">{item.productName}</h3>
                                    <p className="text-sm">Qty: {item.quantity}</p>
                                    <p className="text-sm text-gray-500">{item.price}$</p>
                                </div>
                                <Button onClick={() => deleteFromCart(String(cartId), item.productId)} className="absolute top-1 right-1 cursor-pointer bg-transparent text-red-400 shadow-none transition-all duration-300 hover:text-red hover:bg-red-100">
                                    x
                                </Button>
                            </div>

                        </div>
                    ))
                        :
                        <div className="flex flex-col items-center justify-center h-full">
                            <ShoppingBag className="h-24 w-24 text-gray-400" />
                            <h1 className="text-xl font-semibold">Add Products to your cart</h1>
                        </div>
                    }
                    <div className="text-right mt-4 text-2xl">
                        Total Price :
                        <span className="font-bold">{totalPrice}$</span>
                    </div>
                </div>
                <DrawerFooter>
                    {items.length > 0 && <Link to="/checkout" className=" bg-brand hover:bg-brand/80 text-white flex items-center justify-center font-medium rounded-md h-[34px]">
                        Checkout
                    </Link>}
                    <DrawerClose render={<Button variant="outline" className="cursor-pointer">Continue Shopping</Button>} />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
