"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <Link href="/" className="text-black hover:opacity-[0.9] dark:text-white cursor-pointer">
          Home
        </Link>
        <MenuItem setActive={setActive} active={active} item="News">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/news/national">
              National News
            </HoveredLink>
            <HoveredLink href="/news/international">
              International News
            </HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Market">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/market/national">
              National Market
            </HoveredLink>
            <HoveredLink href="/market/international">
              International Market
            </HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Case Study">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/case-study/national">
              National Case Study
            </HoveredLink>
            <HoveredLink href="/case-study/international">
              International Case Study
            </HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

