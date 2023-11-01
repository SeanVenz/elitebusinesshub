"use client";
import React from "react";
import style from "./style.module.css";
import { Button } from "@/components";
import { useState } from "react";
import * as Web3 from "@solana/web3.js";
import base58 from "bs58";
import { parseString } from "@/app/lib/utils";
import { getBalance } from "@/app/lib/actions";

function Navbar({
  onWalletConnect,
}: {
  onWalletConnect: (walletString: string) => void;
}) {
  const [wallet, setWallet] = useState<null | string>(null);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(0);

  const connectAndGetBalance = async () => {
    try {
      const { solana } = window as any;
      const response = await solana.connect();
      const walletString = response.publicKey.toString();

      const [balanceResult] = await Promise.all([getBalance(walletString)]);
      onWalletConnect(walletString);
      await setWallet(walletString);
      setBalance(balanceResult);
    } catch (error) {
      setError("No wallet");
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

        await Web3.sendAndConfirmTransaction(
          connection,
          new Web3.Transaction().add(instruction),
          [signer]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={style.toolbar}>
        <h4>SOL: {balance}</h4>

        <div className={style.links_container}></div>
        {error && <p>{error}</p>}
        <div className={style.links_container}>
          <Button onClick={connectAndGetBalance}>
            {wallet ? parseString(wallet, 3) : "Connect Wallet"}
          </Button>
          <Button onClick={sendTransaction}>Send Transactions</Button>
        </div>
      </div>
      <div className={style.divider}></div>
    </>
  );
}

export default Navbar;
