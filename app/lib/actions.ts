import * as Web3 from "@solana/web3.js";

export const getBalance = async (wallet: any) => {
  const lamports = Web3.LAMPORTS_PER_SOL;
  try {
    if (wallet) {
      const publicKey = new Web3.PublicKey(wallet);
      const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
      const balance = await connection.getBalance(publicKey);
      const balanceInSol = balance / lamports;
      return  balanceInSol ;
    } else {
      throw new Error("Error")
    }
  } catch (err) {
    throw new Error("Error")
  }
};
