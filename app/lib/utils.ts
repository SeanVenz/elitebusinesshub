import * as Web3 from "@solana/web3.js";
import base58 from "bs58";

export const lamports = Web3.LAMPORTS_PER_SOL;

export const formatDate = (timestamp: number) => {
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

export const parseString = (string: string) => {
  return `${string.slice(0, 5)}......${string.slice(-5)}`;
};

export const decodeSignature = (signature: any) => {
  if (signature) {
    const decodedSignature = base58.encode(signature);
    return decodedSignature;
  }
};

export const decodeMessage = (transaction: any) => {
  const textDecoder = new TextDecoder("utf-8");
  const decodedMessage = textDecoder.decode(
    transaction?.transaction.instructions[0].data
  );
  console.log(decodeMessage);
  return decodedMessage;
};

export const formatMessage = (message: any) => {
  try {
    const parsedMessage = JSON.parse(message);
    return parsedMessage;
  } catch (error) {
    return "Invalid message format";
  }
};
