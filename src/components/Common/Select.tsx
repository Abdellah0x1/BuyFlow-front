import { Select as SelectNew, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";


export function Select({ items, label, className }: { items: Array<{ label: string, value: string }>, label: string, className?: string }) {
    return (
        <SelectNew>
            <SelectTrigger className={`w-full max-w-48 min-w-[120px] rounded-md ${className}`}>
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent className="bg-white">
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {items?.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </SelectNew>
    )
}
