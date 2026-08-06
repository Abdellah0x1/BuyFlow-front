import { useSearchParams, Link } from "react-router"
import { motion } from "framer-motion"
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-md w-full bg-card text-card-foreground shadow-2xl rounded-3xl overflow-hidden border border-border/50"
            >
                <div className="p-8 text-center space-y-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2
                        }}
                        className="mx-auto w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4"
                    >
                        <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-500" />
                    </motion.div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Payment Successful!</h1>
                        <p className="text-muted-foreground">
                            Thank you for your purchase. Your order has been confirmed.
                        </p>
                    </div>

                    {orderId && (
                        <div className="bg-muted/50 p-4 rounded-xl flex flex-col space-y-1">
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                Order ID
                            </span>
                            <span className="font-mono text-lg font-semibold">
                                {orderId}
                            </span>
                        </div>
                    )}

                    <div className="pt-6 flex flex-col sm:flex-row gap-3">
                        <Button className="w-full sm:w-1/2" variant="default">
                            <Link to="/orders" className="flex ">
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                View Orders
                            </Link>
                        </Button>
                        <Button className="w-full sm:w-1/2" variant="outline">
                            <Link to="/" className="flex">
                                Continue Shopping
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Decorative bottom bar */}
                <div className="h-2 w-full bg-gradient-to-r from-green-400 to-emerald-500" />
            </motion.div>
        </div>
    )
}