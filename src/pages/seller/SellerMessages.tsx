import { useState } from "react"

export default function SellerMessages() {
    const [messages, setMessages] = useState([])

    if (!messages || messages.length === 0) return <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex flex-col items-center justify-center h-96">
            <p className="text-lg text-muted-foreground">No Messages found</p>
        </div>
    </div>

    return <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-row ">


    </div>
}