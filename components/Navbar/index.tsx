"use client";
import React, { Suspense } from "react";
import style from "./style.module.css";
import { MainButton } from "@/components";
import { useState } from "react";
import { parseString } from "@/app/lib/utils";
import { getBalance } from "@/app/lib/actions";
import BusinessModal from "../Form";
import { playFair } from "@/app/lib/fonts";

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
        <h1 className={`${playFair.className} ${style.brand}`}>
          Elite Business Hub
        </h1>
        {wallet && <h4>SOL: {balance.toFixed(2)}</h4>}

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
          <MainButton
            disabled={wallet !== null}
            onClick={connectAndGetBalance}
            text={wallet ? parseString(wallet, 3) : "Connect Wallet"}
          ></MainButton>
          {wallet && (
            <MainButton
              onClick={openModal}
              text={"Add My Business"}
            ></MainButton>
          )}
        </div>
      </div>
      <div className={style.divider}></div>
      <div className="open-modal">
        {isModalOpen && (
          <BusinessModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            wallet={wallet}
          />
        )}
      </div>
    </>
  );
}

export default Navbar;
