import { useParams } from "react-router";

export default function ProductDetails() {
    const { id } = useParams();
    return <div>
        <h1>Product Details {id}</h1>
    </div>
}