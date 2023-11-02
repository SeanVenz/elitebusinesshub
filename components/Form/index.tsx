"use client";
import React, { useState } from "react";
import "./index.scss";
import { Button } from "..";
import { sendTransaction } from "@/app/lib/actions";

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

  const handleImageChange = (e : any) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="modal">
      <div className={`modal-content ${isOpen ? '' : 'close'}`} onClick={onClose}>
        <div className="form-container">
          <form className="form" onSubmit={(e) => sendTransaction(e, wallet, image, businessName, businessDescription)}>
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
