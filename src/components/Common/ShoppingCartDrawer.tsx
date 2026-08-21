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

import { ShoppingBag, ShoppingCart, X } from "lucide-react"
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
            <DrawerTrigger render={<button className="relative text-white/80 hover:text-white transition-colors">
                <ShoppingCart size={18} />
                {totalItem > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-semibold text-white">
                        {totalItem}
                    </span>
                )}
            </button>} />
            <DrawerContent className="bg-canvas">
                <DrawerHeader>
                    <DrawerTitle className="text-tagline text-ink text-center">Your Cart</DrawerTitle>
                    <DrawerDescription className="text-caption-apple text-ink-muted-48 text-center">
                        Review your items before checkout
                    </DrawerDescription>
                </DrawerHeader>
                <div className="flex-1 overflow-y-auto p-4">
                    {items && items.length > 0 ? items.map((item) => (
                        <div key={item.productId} className="relative flex items-center mt-3 border border-hairline rounded-[18px] bg-canvas p-3">
                            <div className="flex items-center gap-3 w-full">
                                <img src={item.images[0].url} alt={item.productName} className="w-14 h-14 rounded-[8px] object-cover border border-divider-soft" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-body-strong text-ink line-clamp-1">{item.productName}</h3>
                                    <p className="text-caption-apple text-ink-muted-48">Qty: {item.quantity}</p>
                                    <p className="text-caption-apple text-brand font-semibold">${item.price}</p>
                                </div>
                                <button
                                    onClick={() => deleteFromCart(String(cartId), item.productId)}
                                    className="p-1.5 rounded-full text-ink-muted-48 hover:text-red-500 hover:bg-red-50 transition-colors active-scale"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                        :
                        <div className="flex flex-col items-center justify-center h-full py-12 gap-3">
                            <ShoppingBag className="h-16 w-16 text-ink-muted-48/40" strokeWidth={1} />
                            <p className="text-body-apple text-ink-muted-48">Your cart is empty</p>
                        </div>
                    }
                    {items && items.length > 0 && (
                        <div className="text-right mt-6 pt-4 border-t border-divider-soft">
                            <span className="text-body-apple text-ink-muted-48">Total: </span>
                            <span className="text-tagline text-ink">${totalPrice}</span>
                        </div>
                    )}
                </div>
                <DrawerFooter>
                    {items.length > 0 && (
                        <Link
                            to="/checkout"
                            className="bg-brand hover:bg-brand-light text-white text-body-apple font-medium flex items-center justify-center rounded-full h-11 transition-all duration-200 active-scale"
                        >
                            Checkout
                        </Link>
                    )}
                    <DrawerClose render={
                        <Button
                            variant="outline"
                            className="rounded-full h-11 border-brand text-brand hover:bg-brand/5 text-body-apple font-normal cursor-pointer"
                        >
                            Continue Shopping
                        </Button>
                    } />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
