import { Loader2 } from "lucide-react";

export function ProductLoading() {
    return(
        <div className="flex justify-center">
            <Loader2 className="size-24 animate-spin"/>
        </div>
    )
}