"use client";
import React from "react";
import style from "./style.module.css";
import { Button } from "@/components";
import { useState } from "react";
import { parseString } from "@/app/lib/utils";
import { getBalance } from "@/app/lib/actions";
import BusinessModal from "../Form";

function Navbar({
  onWalletConnect,
}: {
  onWalletConnect: (walletString: string) => void;
}) {
  const [wallet, setWallet] = useState<null | string>(null);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

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

  return (
    <>
      <div className={style.toolbar}>
        <h4>SOL: {balance}</h4>

        <div className={style.links_container}></div>
        {error && <p>{error}</p>}
        <div className={style.links_container}>
          <a
            className={style.view_transactions}
            href="https://explorer.solana.com/address/G3QrQ1JmrFhRDZyruxp84HH1WWjAmp74PFkFGWSjSYpU?cluster=devnet"
            target="_blank"
          >
            View Transactions
          </a>
          <Button onClick={connectAndGetBalance}>
            {wallet ? parseString(wallet, 3) : "Connect Wallet"}
          </Button>
          <Button onClick={openModal}>Add My Business</Button>
        </div>
      </div>
      <div className={style.divider}></div>
      <div className="open-modal">
        {isModalOpen && (
          <BusinessModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </>
  );
}

export default Navbar;
