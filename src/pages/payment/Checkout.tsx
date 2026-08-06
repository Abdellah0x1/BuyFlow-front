import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cardStore";
import { useAuthStore } from "@/store/authStore";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { createAddress, type Address } from "@/api/address";
import { createOrder } from "@/api/order";
import { createPaymentIntent } from "@/api/payment";
import { Spinner } from "@/components/Common/Spinner";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/utils/Stripe";
import StripeCheckoutForm from "@/components/payment/StripeCheckoutForm";

const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "JP", name: "Japan" },
    { code: "CN", name: "China" },
    { code: "IN", name: "India" },
    { code: "BR", name: "Brazil" },
    { code: "MX", name: "Mexico" },
    { code: "ZA", name: "South Africa" },
    { code: "KR", name: "South Korea" },
    { code: "NL", name: "Netherlands" },
    { code: "SE", name: "Sweden" },
    { code: "CH", name: "Switzerland" },
    { code: "SG", name: "Singapore" },
    { code: "NZ", name: "New Zealand" },
    { code: "IE", name: "Ireland" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "AR", name: "Argentina" },
    { code: "CO", name: "Colombia" },
    { code: "CL", name: "Chile" },
    { code: "PE", name: "Peru" },
    { code: "RU", name: "Russia" },
    { code: "TR", name: "Turkey" },
    { code: "PL", name: "Poland" },
    { code: "BE", name: "Belgium" },
    { code: "AT", name: "Austria" },
    { code: "DK", name: "Denmark" },
    { code: "FI", name: "Finland" },
    { code: "NO", name: "Norway" },
    { code: "PT", name: "Portugal" },
    { code: "GR", name: "Greece" },
    { code: "CZ", name: "Czech Republic" },
    { code: "HU", name: "Hungary" },
    { code: "RO", name: "Romania" },
    { code: "BG", name: "Bulgaria" },
    { code: "HR", name: "Croatia" },
    { code: "RS", name: "Serbia" },
    { code: "SK", name: "Slovakia" },
    { code: "SI", name: "Slovenia" },
    { code: "UA", name: "Ukraine" },
    { code: "EG", name: "Egypt" },
    { code: "NG", name: "Nigeria" },
    { code: "KE", name: "Kenya" },
    { code: "MA", name: "Morocco" },
    { code: "DZ", name: "Algeria" },
    { code: "TN", name: "Tunisia" },
    { code: "GH", name: "Ghana" },
    { code: "VN", name: "Vietnam" },
    { code: "TH", name: "Thailand" },
    { code: "MY", name: "Malaysia" },
    { code: "ID", name: "Indonesia" },
    { code: "PH", name: "Philippines" },
    { code: "PK", name: "Pakistan" },
    { code: "BD", name: "Bangladesh" },
    { code: "LK", name: "Sri Lanka" },
    { code: "NP", name: "Nepal" },
    { code: "IL", name: "Israel" },
    { code: "QA", name: "Qatar" },
    { code: "KW", name: "Kuwait" },
    { code: "OM", name: "Oman" },
    { code: "BH", name: "Bahrain" },
    { code: "LB", name: "Lebanon" },
    { code: "JO", name: "Jordan" },
];



export default function Checkout() {
    const items = useCartStore(state => state.items);
    const totalPrice = useCartStore(state => state.totalPrice);
    const user = useAuthStore(state => state.user);
    const [address, setAddress] = useState<Address>({
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: ""
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [clientSecret, setClientSecret] = useState<string>("");
    const [orderId, setOrderID] = useState<number | null>(null)

    const [error, setError] = useState<string>("");

    const isMobile = useIsMobile()


    async function createCheckout() {

        if (address.street === "" || address.city === "" || address.state === "" || address.zipcode === "" || address.country === "") {
            setError("Please fill in all the address fields");
            return;
        }

        if (items.length === 0) {
            setError("Please add items to your cart");
            return;
        }
        const addressResponse = await createAddress(address);
        const orderResponse = await createOrder(addressResponse.data.addressId);
        const paymentIntent = await createPaymentIntent(orderResponse.data.orderId);

        return {
            address,
            orderResponse,
            paymentIntent
        }

    }


    async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();


        setIsSubmitting(true);
        try {
            const checkout = await createCheckout();
            setOrderID(checkout?.orderResponse?.data?.orderId || null);
            setClientSecret(checkout?.paymentIntent?.data?.clientSecret || "");
        } catch (error) {
            setError("We couldn't initialize payment.");
        } finally {
            setIsSubmitting(false);
        }
    }


    if (clientSecret && orderId) return <>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <StripeCheckoutForm orderId={orderId} />
        </Elements>
    </>

    return <div className="w-full  max-w-7xl mx-auto justify-center items-center md:items-start flex flex-col md:flex-row gap-6 my-6">
        <div className={`w-2/3   md:w-1/2   p-5 ${isMobile ? "border-b border-gray-300" : "border-r border-gray-300"}`}>
            <h2 className="font-bold text-xl mb-6 font-bold text-center ">Order Details</h2>
            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4">
                        <img src={item.images[0].url} alt={item.productName} className="w-16 h-16 rounded-md" />
                        <div className="flex-1">
                            <h3 className="font-medium">{item.productName}</h3>
                            <p className="text-gray-600">Qty: {item.quantity}</p>
                            <p className="text-gray-600">{item.price}</p>
                        </div>
                        <p className="font-medium">${item.price * item.quantity}</p>
                    </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                    <span className="font-medium font-bold text-xl">Total</span>
                    <span className="font-medium text-brand text-xl font-bold">{totalPrice}$</span>
                </div>
            </div>

        </div>
        <div className={`${isMobile ? "w-2/3" : "w-1/2 "}  p-5`}>
            <h2 className="text-center font-bold text-2xl mb-6">Complete your order </h2>

            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <h2 className="text-brand font-semibold text-2xl  mb-4"> Personal Details</h2>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-brand">Full Name</Label>
                            <Input type="text" placeholder="Full Name" value={user?.username} className="bg-gray-100 border-gray-300" disabled />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-brand">Email</Label>
                            <Input type="email" placeholder="Email" value={user?.email} className="bg-gray-100 border-gray-300" disabled />
                        </div>
                    </div>
                </div>
                <Separator />
                {/* shipping address */}
                <div>
                    <h2 className="text-brand font-semibold text-2xl  mb-4"> Shipping Address</h2>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-brand">Street</Label>
                            <Input type="text" placeholder="Street" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-brand">City</Label>
                            <Input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-brand">State</Label>
                            <Input type="text" placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-brand">Zipcode</Label>
                            <Input type="text" placeholder="Zipcode" value={address.zipcode} onChange={(e) => setAddress({ ...address, zipcode: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-brand">Country</Label>
                            <Select name="country" value={address.country} onValueChange={(e) => setAddress({ ...address, country: e as string })}>
                                <SelectTrigger className="w-full bg-gray-100 border-gray-300">
                                    <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    {countries.map((country) => (
                                        <SelectItem key={country.code} value={country.name}>
                                            {country.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <Button type="submit" className="w-full text-white font-bold bg-brand hover:bg-brand/80 transition-all duration-300 cursor-pointer">
                    {isSubmitting ? <Spinner /> : "Complete Payment"}
                </Button>
            </form>
        </div>
    </div>
}