"use client";
import React, { useState } from "react";
import "./index.scss";
import { MainButton } from "..";
import { sendTransaction } from "@/app/lib/actions";
import { SecondaryButton } from "../Button";
import close from '../../public/icons8-close-50.png'
import Image from "next/image";

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
  const [businessOwner, setBusinessowner] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="modal">
      <div className={`modal-content ${isOpen ? "" : "close"}`}>
        <div className="form-container">
          <div className="close-form">
            <Image onClick={onClose} src = {close} alt ="Close" width={50} height={50}></Image>
          </div> 
          <form
            className="form"
            onSubmit={(e) =>
              sendTransaction(
                e,
                wallet,
                image,
                businessType,
                businessName,
                businessDescription,
                businessOwner,
                location
              )
            }
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
                onChange={(e) => setBusinessowner(e.target.value)}
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
            <SecondaryButton text = {"Submit"}/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BusinessModal;
