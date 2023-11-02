import * as Web3 from "@solana/web3.js";
import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import base58 from "bs58";

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

export const sendTransaction = async (e: any, wallet: any, image: any, businessName : string, businessDescription: string) => {
  e.preventDefault();
  try {
    if (wallet) {

      if(image){
        const storageRef = ref(storage, `solana-images/${image.name}`)
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);

        const message = {
          field1: businessName,
          field2: businessDescription,
          field3: imageUrl,
        };
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

        const transaction = await Web3.sendAndConfirmTransaction(
          connection,
          new Web3.Transaction().add(instruction),
          [signer]
        );

        console.log(message);
      }
    }
  } catch (error) {
    console.log(error);
  }
};