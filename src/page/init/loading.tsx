import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
    return (
        <div className="w-full min-h-dvh flex items-center justify-center p-4 bg-white">
            <Spinner className="size-8 text-brand-secondary"/>
        </div>
    );
}
 
export default Loading;