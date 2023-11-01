import { useEffect, useState } from 'react';
import * as Web3 from "@solana/web3.js";

export const useTransactions = (wallet : any) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      if (wallet) {
        try {
          const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
          const publicKey = new Web3.PublicKey("G3QrQ1JmrFhRDZyruxp84HH1WWjAmp74PFkFGWSjSYpU");

          const signatures = await connection.getConfirmedSignaturesForAddress2(publicKey, {
            limit: 100,
          });

          const transactionsData = [];
          for (const signature of signatures) {
            const transaction = await connection.getConfirmedTransaction(signature.signature);
            transactionsData.push(transaction);
          }
          console.log(transactions)
          setTransactions(transactionsData);
        } catch (error) {
          setError("Failed to get transactions");
        }
      } else {
        setError("No wallet address found");
      }
    };

    fetchTransactions();
  }, [wallet]);

  return { transactions, error };
};
