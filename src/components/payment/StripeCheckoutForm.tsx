import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Button } from "../ui/button";
import { useState } from "react";
import { Spinner } from "../Common/Spinner";

export default function StripeCheckoutForm({ orderId }: { orderId: number }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!stripe || !elements) {
            return
        }

        setLoading(true)
        setError("");

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `http://localhost:5173/payment/success?orderId=${orderId}`
            }
        })

        if (error.message) setError(error.message);
        setLoading(false)
    }

    return <>
        <form onSubmit={handleSubmit} className="max-w-8xl mx-auto p-10">
            {error && <div className="p-2 w-full bg-red-50 text-center border border-red-500">{error}</div>}
            <PaymentElement />
            <Button type="submit" className="my-5 w-full text-white bg-green-500 transition-all duration-300 hover:bg-green-200">
                {loading ? <Spinner /> : "Pay"}
            </Button>
        </form>
    </>
}