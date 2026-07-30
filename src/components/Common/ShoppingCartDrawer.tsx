"use client"

import * as React from "react"
import { toast } from "sonner"

import { useMobile } from "@/hooks/useMobile"
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


export function ShoppingCartDrawer() {
    const [open, setOpen] = React.useState(false)
    const { isMobile } = useMobile()
    const totalItem = useCartStore(state => state.totalItems())
    const items = useCartStore(state => state.items)
    const removeItem = useCartStore(state => state.removeFromCart)

    function handleConfirm() {
        setOpen(false)
        toast("Order placed successfully")
    }
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
                <div className="flex-1 scroll-fade overflow-y-auto p-4">
                    {items && items.length > 0 ? items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <img src={item.image} alt={item.name} className="w-12 h-12" />
                                <div>
                                    <h3 className="text-sm font-medium">{item.name}</h3>
                                    <p className="text-sm text-gray-500">{item.price}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                                Remove
                            </Button>
                        </div>
                    ))
                        :
                        <div className="flex flex-col items-center justify-center h-full">
                            <ShoppingBag className="h-24 w-24 text-gray-400" />
                            <h1 className="text-xl font-semibold">Add Product to your cart</h1>
                        </div>
                    }
                </div>
                <DrawerFooter>
                    {items.length > 0 && <Button onClick={handleConfirm} className="h-[34px]">
                        Confirm Delivery Time
                    </Button>}
                    <DrawerClose render={<Button variant="outline" className="cursor-pointer">Continue Shopping</Button>} />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
