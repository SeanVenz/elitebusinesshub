import { useEffect, useState } from 'react';
import * as Web3 from "@solana/web3.js";

export const useTransactions = (wallet : any) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      if (wallet) {
        try {
          const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
          const programId = new Web3.PublicKey("G3QrQ1JmrFhRDZyruxp84HH1WWjAmp74PFkFGWSjSYpU");

          const signatures = await connection.getConfirmedSignaturesForAddress2(programId, {
            limit: 100,
          });

          const transactionsData = [];
          for (const signature of signatures) {
            const transaction = await connection.getConfirmedTransaction(signature.signature);
            transactionsData.push(transaction);
          }
          setTransactions(transactionsData);
        } catch (error) {
          setError("Failed to get transactions");
        } finally {
          setIsLoading(false);
        }
      } else {
        setError("No wallet address found");
      }
    };

    fetchTransactions();
  }, [wallet]);

  return { transactions, error, isLoading };
};