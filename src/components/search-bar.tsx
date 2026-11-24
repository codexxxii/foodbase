"use client";

import { Search } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  const router = useRouter();

  const onSubmit = (e: ChangeEvent) => {
    e.preventDefault();

    const input = value.trim();

    if (input.length === 0) return;

    router.push(`/search?query=${input}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 w-full max-w-xl border border-gray-200 px-3 h-10"
      onClick={() => inputRef.current?.focus()}
    >
      <Search size={12} />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Teriyaki chicken, carrots, etc."
        ref={inputRef}
        className="grow outline-none text-sm h-full"
      />
    </form>
  );
}
