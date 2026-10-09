import { SearchIcon } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "@tanstack/react-router";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: ChangeEvent) => {
    e.preventDefault();

    const query = input.trim();

    if (!query) return;

    navigate({ to: "/search", search: { query } });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-1 px-5 w-120 h-8 border border-gray-200"
    >
      <SearchIcon size={12} className="" />
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Search"
        className="text-sm grow outline-none"
      />
    </form>
  );
}
