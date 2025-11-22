'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

const CHECKOUT_URL = "https://www.ggcheckout.com/checkout/v2/fHqGK66FnlMMhMb6APyn";

export function CheckoutButton({
  children,
  size = "lg",
  className = "mt-8 text-lg h-16 px-10 w-full sm:w-auto animate-pulse",
}: {
  children: React.ReactNode;
  size?: "lg" | "sm" | "default" | "icon" | null | undefined;
  className?: string;
}) {
  const [href, setHref] = useState<string>("#");

  useEffect(() => {
    // This ensures the link is only set on the client-side, avoiding hydration mismatch
    // that could be caused by third-party scripts modifying the href.
    setHref(CHECKOUT_URL);
  }, []);

  return (
    <a href={href}>
      <Button size={size} className={className}>
        {children}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </a>
  );
}
