"use client"
import React, { useEffect, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Button } from '../ui/button';

const Balance = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (publicKey) {
      const fetchBalance = async () => {
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      };

      fetchBalance();
    }
  }, [publicKey, connection]);

  return <Button size={"lg"}>
            Balance: {balance} SOL
        </Button>
};

export default Balance;
