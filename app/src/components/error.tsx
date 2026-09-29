import { AlertCircle } from "lucide-react";

export default function Error() {
  return (
    <div className="w-full h-32 flex flex-col justify-center items-center gap-2">
      <AlertCircle size={30} className="text-red-400" />
      <p className="text-center text-sm text-gray-400">
        Something went wrong, try again
      </p>
    </div>
  );
}
