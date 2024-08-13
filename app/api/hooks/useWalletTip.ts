import { useEffect } from 'react';
import {
  Connection,
  Transaction,
  clusterApiUrl,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Cluster,
  Commitment,
  PublicKey,
} from '@solana/web3.js';

export interface TransactionHook {
  network?: string; 
}

export function useWalletTip({ network = 'devnet' }: TransactionHook) {
  const NETWORK = clusterApiUrl(network as Cluster);

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        const { solana } = window as any;
        if (solana) {
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log('Connected with Public key:', response?.publicKey?.toString());
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };

    window.addEventListener('load', checkIfWalletIsConnected);

    return () => {
      window.removeEventListener('load', checkIfWalletIsConnected);
    };
  }, []);

  const opts = {
    preflightCommitment: 'processed' as Commitment,
  };

  const getProvider = () => {
    if ('solana' in window) {
      return (window as any).solana;
    }
    return null;
  };

  const provider = getProvider();
  const connection = new Connection(NETWORK, opts.preflightCommitment);

  const createTransferTransaction = async (
    tipValue: number,
    receiverWalletAddress: string
  ) => {
    if (!provider?.publicKey) return null;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: new PublicKey(receiverWalletAddress),
        lamports: LAMPORTS_PER_SOL * tipValue,
      })
    );
    transaction.feePayer = provider.publicKey;

    const { blockhash } = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;

    return transaction;
  };

  const sendTransaction = async (
    tipValue: number,
    receiverWalletAddress: string
  ) => {
    try {
      const transaction = await createTransferTransaction(tipValue, receiverWalletAddress);
      if (!transaction) return;

      const signedTransaction = await provider.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      await connection.confirmTransaction(signature);
      
    } catch (error) {
      console.log('Error sending transaction:', error);
      throw error;
    }
  };

  return {
    sendTransaction,
  };
}
