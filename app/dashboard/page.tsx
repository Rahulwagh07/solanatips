"use client";

import React, { useState } from 'react';
import Balance from '@/components/dashboard/Balance';
import { Button } from '@/components/ui/button';
import TipForm from '@/components/dashboard/TipForm';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const { connected } = useWallet();
  const router = useRouter();

  if (!connected) {
    router.push('/');  
    return null; 
  }
  return (
    <div className="relative overflow-hidden py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
      >
        <div className="bg-gradient-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
        <div className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary-foreground via-primary-foreground to-background" />
      </div>
      {open ? (
        <TipForm setOpen={setOpen} />
      ) : (
        <div className="container relative z-10 py-10 lg:py-16 text-center mx-auto max-w-2xl">
          <h1 className="mt-5 scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
            Welcome Back
          </h1>
          <div className="mt-8 gap-3 flex justify-center">
            <Balance />
            <Button size="lg" onClick={() => setOpen(!open)}>
              Send Tips
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
