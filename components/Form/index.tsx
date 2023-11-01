import React from "react";
import * as Web3 from "@solana/web3.js";
import base58 from "bs58";
import "./index.scss";

function BusinessModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add My Business</h2>
        {/* <FormTransaction wallet={wallet} /> */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export function FormTransaction({ wallet }: { wallet: any }) {
  // Receive wallet as a prop
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

  return <div>FormTransaction</div>;
}


export default BusinessModal;