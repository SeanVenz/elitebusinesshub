"use client";

import React from "react";
import "./index.scss";
import { useTransactions } from "@/app/lib/useTransactions";
import {
  decodeMessage,
  decodeSignature,
  formatDate,
  formatMessage,
  parseString,
} from "@/app/lib/utils";
import defaultImg from "../../public/business.jpeg";
import Image from "next/image";

function Cards({ wallet }: { wallet: string | null }) {
  const { transactions } = useTransactions(wallet);

  return (
    <>
      {transactions.length > 0 && (
        <div className="transaction-parent">
          <h2>Available Businesses:</h2>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                <Card
                  imgLink={formatMessage(decodeMessage(transaction)).field3}
                  signature={decodeSignature(transaction.transaction.signature)}
                  date={formatDate(transaction.blockTime)}
                  messageOne={formatMessage(decodeMessage(transaction)).field1}
                  messageTwo={formatMessage(decodeMessage(transaction)).field2}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Cards;

export function Card({
  imgLink,
  signature,
  date,
  messageOne,
  messageTwo,
}: {
  imgLink: any;
  signature: any;
  date: any;
  messageOne: string;
  messageTwo: string;
}) {
  return (
    <div className="card">
      {imgLink ? (
        <img src={imgLink} alt="img" />
      ) : (
        <Image src={defaultImg} alt="img" width={300} height={200} />
      )}
      <div className="card__content">
        <p className="card__title">signature</p>
        <div className="descriptions">
          <a
            href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
            target="_blank"
            className="card__description"
          >
            {parseString(signature, 12)}
          </a>
          <p className="card__description">{date}</p>
          <p className="card__description">{messageOne}</p>
          <p className="card__description">{messageTwo}</p>
        </div>
      </div>
    </div>
  );
}
