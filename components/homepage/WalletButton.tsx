"use client";

import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "../ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

export default function WalletButton() {
  const { connected } = useWallet();
  const router = useRouter();

  return (
    <>
      {connected ? (
        <Button size="lg" onClick={() => router.push("/dashboard")}>
          Go to Dashboard
        </Button>
      ) : (
        <WalletMultiButton />
      )}
    </>
  );
}
