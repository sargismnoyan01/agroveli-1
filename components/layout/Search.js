"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeaderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const q = searchParams.get('query')
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if(q){
      setSearchQuery(q)
    }
  }, [q]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/search?query=${searchQuery}`);
      }}
      className="flex-1 max-w-md">
      <div className="relative">
        <Input
          type="text"
          placeholder="Искать здесь"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-4 pr-10 h-10 rounded-md border-border shadow-md bg-background"
        />
        <Button
          onClick={()=> {
            router.push(`/search?query=${searchQuery}`);
          }}
          size="icon"
          variant="ghost"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-transparent border-none cursor-pointer"
        >
          <Search className="h-4 w-4 text-[#0F6A4F]"/>
        </Button>
      </div>
    </form>
  );
}