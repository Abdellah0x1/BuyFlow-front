import { Loader } from "lucide-react"

export function Spinner({ size }: { size?: number }) {
    return <Loader className="animate-spin" size={size} />
}