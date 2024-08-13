"use client";
import React, { useState } from "react";
import { useWalletTip } from "@/app/api/hooks/useWalletTip";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

type TipFormProps = {
  setOpen: (open: boolean) => void;
};
const TipForm = ({ setOpen } : TipFormProps) => {
  const {  sendTransaction } = useWalletTip({ network: "devnet" });
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const tipValue = parseFloat(amount);

    if (!recipient || isNaN(tipValue) || tipValue <= 0) {
      toast.error("Please Enter Valid amount");
      return;
    }

    try {
      setLoading(true);
      await sendTransaction(tipValue, recipient);
      setLoading(false);
      toast.success("Transaction confirmed!");
      setOpen(false);
    } catch (error) {
      toast.error("Transaction failed. Please try again.");
      setLoading(false);
      console.error("Transaction failed", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-500 opacity-25" onClick={() => setOpen(false)}></div>
      <div className="relative bg-white rounded-lg shadow-lg max-w-md mx-auto p-6 z-10">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setOpen(false)}
        >
          <MdClose />
        </button>
        <h2 className="text-xl font-semibold mb-4">Send Tip</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Recipient Address</label>
            <input
              id="recipient"
              type="text"
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (SOL)</label>
            <input
              id="amount"
              type="number"
              placeholder="Amount (SOL)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
          {loading ? "Submiting.." : " Connect to Wallet"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TipForm;
