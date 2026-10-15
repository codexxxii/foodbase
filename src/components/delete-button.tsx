import { TrashIcon } from "lucide-react";

export default function DeleteButton() {
  return (
    <button className="w-8 h-8 p-0! grid place-items-center border-none! bg-white">
      <TrashIcon size={12} />
    </button>
  );
}
