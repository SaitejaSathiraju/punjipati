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
            <HoveredLink href="/case-study/investment-strategies">
              Investment Strategies
            </HoveredLink>
            <HoveredLink href="/case-study/portfolio-analysis">
              Portfolio Analysis
            </HoveredLink>
            <HoveredLink href="/case-study/risk-management">
              Risk Management
            </HoveredLink>
            <HoveredLink href="/case-study/market-trends">
              Market Trends
            </HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="News">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/news/market-updates">
              Market Updates
            </HoveredLink>
            <HoveredLink href="/news/economic-news">
              Economic News
            </HoveredLink>
            <HoveredLink href="/news/company-news">
              Company News
            </HoveredLink>
            <HoveredLink href="/news/regulatory-updates">
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

