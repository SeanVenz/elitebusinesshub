"use client";
import React from "react";
import style from "./style.module.css";
import { Button } from "@/components";
import { useState } from "react";
import * as Web3 from "@solana/web3.js";
import base58 from "bs58";
import * as phantom from "@solana/wallet-adapter-phantom";
import { Connection, PublicKey } from '@solana/web3.js';

function Navbar() {
  const [wallet, setwallet] = useState<null | string>(null);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(Number);
  const [transactions, setTransactions] = useState<any[]>([]);
  const lamports = Web3.LAMPORTS_PER_SOL;

  const connectWallet = async () => {
    try {
      const { solana } = window as any;
      const response = await solana.connect();
      setwallet(response.publicKey.toString());
    } catch (error) {
      setError("No wallet");
    }
  };

  const getBalance = async () => {
    try {
      if (wallet) {
        const publicKey = new Web3.PublicKey(wallet);
        const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
        const balance = await connection.getBalance(publicKey);
        const balanceInSol = balance / lamports;
        setBalance(balanceInSol);
      } else {
        setError("No wallet address found.");
      }
    } catch (err) {
      setError("Failed to get balance.");
    }
  };

  const sendTransaction = async () => {
    try {
      if (wallet) {
        const message = { field1: "value1", field2: "value2" };
        const messageBuffer = Buffer.from(JSON.stringify(message), "utf-8");
        const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
        const publicKey = new Web3.PublicKey(wallet);
        const base58DecodedPK = base58.decode(
          "2Xui4ZSPyGUYMQWnronf6j7jwFLnLup8dbe2dH1fgPrHZ1FArPD274JDcSCBsyVRMNPfvEqPemxzNZe41BLeCiLf"
        );
        const signer = Web3.Keypair.fromSecretKey(base58DecodedPK);
        const programId = new Web3.PublicKey(
          "G3QrQ1JmrFhRDZyruxp84HH1WWjAmp74PFkFGWSjSYpU"
        );

        const instruction = new Web3.TransactionInstruction({
          keys: [
            {
              pubkey: publicKey,
              isSigner: true,
              isWritable: false,
            },
          ],
          data: messageBuffer,
          programId: programId,
        });

        const signature = await Web3.sendAndConfirmTransaction(
          connection,
          new Web3.Transaction().add(instruction),
          [signer]
        );

        console.log(await connection.getSignatureStatus(signature));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactions = async () => {
    try {
      if (wallet) {
        const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
        const publicKey = new Web3.PublicKey(
          "G3QrQ1JmrFhRDZyruxp84HH1WWjAmp74PFkFGWSjSYpU"
        );

        const signatures = await connection.getConfirmedSignaturesForAddress2(
          publicKey,
          {
            limit: 100,
          }
        );

        const transactionsData = [];
        for (const signature of signatures) {
          const transaction = await connection.getConfirmedTransaction(
            signature.signature
          );
          console.log(transaction);
          transactionsData.push(transaction);
        }
        
        setTransactions(transactionsData);
      } else {
        setError("No wallet address found");
      }
    } catch (error) {
      setError("Failed to get transactions");
    }
  };

  const decodeMessage = (transaction: any) => {
    const textDecoder = new TextDecoder("utf-8");
    const decodedMessage = textDecoder.decode(
      transaction?.transaction.instructions[0].data
    );
    return decodedMessage;
  }

  const formatMessage = (message : any) => {
    try {
      const parsedMessage = JSON.parse(message);
      const formattedMessage = Object.keys(parsedMessage)
        .map((key) => `${key}: ${parsedMessage[key]}`)
        .join("\n");
      return formattedMessage;
    } catch (error) {
      // Handle any JSON parsing errors
      return "Invalid message format";
    }
  };
  

  const decodeSignature = (signature: any) => {
    if (signature) {
      const decodedSignature = base58.encode(signature);
      return decodedSignature;
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedDate = `${month}/${day}/${year}, ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  };

  const parseWalletKey = (string: string) => {
    return `${string.slice(0, 5)}......${string.slice(-5)}`;
  };

  return (
    <>
      <div className={style.toolbar}>
        <h4>Your SOL balance is: {balance}</h4>

        <div className={style.links_container}>
          {/* Add any additional links or information you want to display */}
        </div>
        {error && <p>{error}</p>}
        <div className={style.links_container}>
          <Button onClick={connectWallet}>
            {wallet ? parseWalletKey(wallet) : "Connect Wallet"}
          </Button>
          <Button onClick={getBalance}>Get Balance</Button>
          <Button onClick={sendTransaction}>Send Transactions</Button>
          <Button onClick={getTransactions}>Get Transactions</Button>
        </div>
      </div>
      {transactions.length > 0 && (
        <div>
          <h2>Recent Transactions:</h2>
          <ul>
            {transactions.map((transaction, index) => (
              <>
                <li key={index}>
                  <p>Fee: {transaction.meta.fee / lamports}</p>
                  <p>
                    Recent Blockhash: {transaction?.transaction.recentBlockhash}
                  </p>
                  <p>
                    Signature:{" "}
                    {decodeSignature(transaction.transaction.signature)}
                  </p>
                  <p>
                    Date: {""}
                    {formatDate(transaction.blockTime)}
                  </p>
                  <p>Message: {formatMessage(decodeMessage(transaction))}</p>
                </li>
                <div style={{ marginBottom: "10px" }}></div>
              </>
            ))}
          </ul>
        </div>
      )}

      <div className={style.divider}></div>
    </>
  );
}

export default Navbar;
