"use client";

import React, { useState } from "react";
import * as Web3 from "@solana/web3.js";
import base58 from "bs58";
import "./index.scss";
import { Button } from "..";
import { createClient } from "@supabase/supabase-js";

function BusinessModal({
  isOpen,
  onClose,
  wallet,
}: {
  isOpen: boolean;
  onClose: () => void;
  wallet: any;
}) {
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imgLink, setImgLink] = useState("");

  const sendTransaction = async (e: any) => {
    e.preventDefault();
    try {
      if (wallet) {
        if (image) {
          const supabase = createClient(
            "https://szxwctcnpnjezzjvxkze.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6eHdjdGNucG5qZXp6anZ4a3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4MTI5MzgsImV4cCI6MjAxNDM4ODkzOH0.E7-PMB3z32o0FAo-29YasZuHD7LWfwgtI5MxS4Ll1ag"
          );
          const uploadPromise = supabase.storage
            .from("solana-images")
            .upload(image.name, image)
            .then(({ data, error }: { data: any; error: any }) => {
              if (data) {
                const imageLink = data[0]?.url;
                setImgLink(imageLink);
              } else {
                console.error(error);
              }
            });

          // Use Promise.all to wait for the promise to resolve
          await Promise.all([uploadPromise]);
        }

        const message = {
          field1: businessName,
          field2: businessDescription,
          field3: imgLink,
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e : any) => {
    // Store the selected image file in the state
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="form-container">
          <form className="form" onSubmit={(e) => sendTransaction(e)}>
            <div className="form-group">
              <label htmlFor="email">Business Name</label>
              <input
                required
                name="name"
                id="name"
                type="text"
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Business Description</label>
              <input
                required
                name="name"
                id="name"
                type="text"
                onChange={(e) => setBusinessDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Business Image</label>
              <input
                required
                type="file"
                accept="image/*"
                id="image"
                onChange={handleImageChange}
              />
            </div>
            <button type="submit" className="form-submit-btn">
              Submit
            </button>
          </form>
        </div>
        <div className="buttons">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}

export default BusinessModal;
