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
        <MenuItem setActive={setActive} active={active} item="Case Study">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/case-study">
              All Case Studies
            </HoveredLink>
            <HoveredLink href="/case-study">
              Investment Strategies
            </HoveredLink>
            <HoveredLink href="/case-study">
              Portfolio Analysis
            </HoveredLink>
            <HoveredLink href="/case-study">
              Risk Management
            </HoveredLink>
            <HoveredLink href="/case-study">
              Market Trends
            </HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="News">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/news">
              All News
            </HoveredLink>
            <HoveredLink href="/news">
              Market Updates
            </HoveredLink>
            <HoveredLink href="/news">
              Economic News
            </HoveredLink>
            <HoveredLink href="/news">
              Company News
            </HoveredLink>
            <HoveredLink href="/news">
              Regulatory Updates
            </HoveredLink>
          </div>
        </MenuItem>
        <Link href="/" className="text-black hover:opacity-[0.9] dark:text-white cursor-pointer">
          Articles
        </Link>
      </Menu>
    </div>
  );
}

