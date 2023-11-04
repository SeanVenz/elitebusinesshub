import React, { useState } from "react";
import "./index.scss";
import close from "../../public/icons8-close-50.png";
import Image from "next/image";
import * as Web3 from "@solana/web3.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import base58 from "bs58";
import { storage } from "@/app/lib/firebase";

function BusinessModal({
  isOpen,
  onClose,
  wallet,
}: {
  isOpen: boolean;
  onClose: () => void;
  wallet: any;
}) {
  const [businessType, setBusinessType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessOwner, setBusinessOwner] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [submitButtonText, setSubmitButtonText] = useState("Submit");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e: any, image: any) => {
    e.preventDefault();
    setSubmitButtonText("Submitting");
    setIsButtonDisabled(true);
    try {
      if (wallet && image) {
        const storageRef = ref(storage, `solana-images/${image.name}`);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);

        const message = {
          businessType,
          businessName,
          businessDescription,
          imageUrl,
          businessOwner,
          location,
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
        setSubmitButtonText("Submitted");
        setIsButtonDisabled(true);
      }
    } catch (error) {
      console.log(error);
      setSubmitButtonText("");
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="modal">
      <div className={`modal-content ${isOpen ? "" : "close"}`}>
        <div className="form-container">
          <div className="close-form">
            <Image
              onClick={onClose}
              src={close}
              alt="Close"
              width={50}
              height={50}
            ></Image>
          </div>
          <form
            className="form"
            onSubmit={(e) => {
              handleSubmit(e, image);
            }}
          >
            <div className="form-group">
              <label htmlFor="Type">Business Type</label>
              <select
                required
                name="Type"
                id="Type"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              >
                <option value="">Select a business type</option>
                <option value="Retail">Retail</option>
                <option value="Service">Service</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Technology">Technology</option>
                <option value="Hospitality">Hospitality</option>
              </select>
            </div>
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
              <label htmlFor="email">Business Owner</label>
              <input
                required
                name="owner"
                id="owner"
                type="text"
                onChange={(e) => setBusinessOwner(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Business Description</label>
              <textarea
                required
                name="desc"
                id="desc"
                onChange={(e) => setBusinessDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Business Location</label>
              <input
                required
                name="location"
                id="location"
                type="text"
                onChange={(e) => setLocation(e.target.value)}
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
            <div className="secondary-button">
              <button disabled={isButtonDisabled}>
                <span className="circle1"></span>
                <span className="circle2"></span>
                <span className="circle3"></span>
                <span className="circle4"></span>
                <span className="circle5"></span>
                <span className="text">{submitButtonText}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BusinessModal;
