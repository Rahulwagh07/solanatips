"use client";

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '../ui/button';
import { toast } from "react-hot-toast"

export const Airdrop  = () => {
  const { connected } = useWallet();
  const [message, setMessage] = useState<string>('');

  const handleAirDrop = () => {
    if(connected){
      toast.success("You will get 1 SOL in Next 24hrs");
    } else{
      toast.success("Connet the wallet First.");
    }
  }

  return (
    <div>
      <Button size={"lg"} onClick={handleAirDrop}>
         Request AirDrop
      </Button>
    </div>
  );
};

 