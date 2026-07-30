import { useSearchParams } from "react-router"

export default function ProductsPage() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")
    return (
        <div>
            <h1>Products</h1>
            <p>Query: {query}</p>
        </div>
    )
}