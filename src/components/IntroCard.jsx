import React, { useState, useEffect } from "react";
import { generateVCF } from "./vcfGenerator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faPen, faSave, faUpload, faLocation, } from "@fortawesome/free-solid-svg-icons";

const IntroCard = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("profileData");
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      fetch("/public/user.json")
        .then((res) => res.json())
        .then((data) => setProfile(data))
        .catch((err) => console.error("Failed to load profile", err));
    }
  }, []);

  const handleDownload = () => {
    const vcf = generateVCF(profile);
    const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profile.name.replace(/\s+/g, "_")}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setEditMode(false);
    localStorage.setItem("profileData", JSON.stringify(profile));
  };

  if (!profile) return <div className="text-white text-center">Loading...</div>;

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-start p-6 text-white font-sans">
      <div className="w-full max-w-sm bg-[#121212] rounded-2xl p-4 shadow-lg">
        {/* Edit Button */}
        <div className="flex justify-end mb-2">
          <button
            onClick={() => (editMode ? handleSave() : setEditMode(true))}
            className="text-white text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full"
          >
            <FontAwesomeIcon icon={editMode ? faSave : faPen} className="mr-2" />
            {editMode ? "Update" : "Edit"}
          </button>
        </div>

        {/* Image + Info */}
        <div className="flex rounded-xl overflow-hidden mb-6 relative">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-32 h-40 object-cover"
          />
          {editMode && (
            <label className="absolute bottom-1 left-1 bg-white text-black px-2 py-1 text-xs rounded cursor-pointer">
              <FontAwesomeIcon icon={faUpload} className="mr-1" />
              Change
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
          <div className="flex-1 bg-gray-900 p-4 text-left">
            {editMode ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="bg-transparent text-xl font-bold w-full mb-1 border-b border-gray-600"
                />
                <input
                  type="text"
                  name="title"
                  value={profile.title}
                  onChange={handleChange}
                  className="bg-transparent text-sm text-gray-400 w-full border-b border-gray-600"
                />
                <input
                  type="text"
                  name="company"
                  value={profile.company}
                  onChange={handleChange}
                  className="bg-transparent text-xl font-bold w-full mt-2 border-b border-gray-600"
                />
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold">{profile.name}</h2>
                <p className="text-sm text-gray-400">{profile.title}</p>
                <p className="text-xl font-bold mt-2">{profile.company}</p>
              </>
            )}
          </div>
        </div>

        {/* Save Contact */}
        <button
          onClick={handleDownload}
          className="w-full bg-white text-black font-bold py-2 rounded-full mb-6"
        >
          SAVE CONTACT
        </button>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 mb-6">
          {["facebook", "linkedin", "whatsapp", "Github"].map((key) => (
            <a
              key={key}
              href={profile[key]}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-xl"
            >
              <FontAwesomeIcon
                icon={
                  key === "facebook"
                    ? faFacebook
                    : key === "linkedin"
                    ? faLinkedin
                    : key === "whatsapp"
                    ? faWhatsapp
                    :faGithub

                }
                className={
                  key === "facebook"
                    ? "text-blue-600"
                    : key === "linkedin"
                    ? "text-blue-700"
                    : key === "whatsapp"
                    ? "text-green-600"
                    : "text-[#181717]"
                }
              />
            </a>
          ))}
        </div>

        {/* Editable Social Links (only in edit mode) */}
        {editMode && (
          <div className="text-sm space-y-2 mb-4">
            <input
              type="url"
              name="facebook"
              placeholder="Facebook URL"
              value={profile.facebook}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-600"
            />
            <input
              type="url"
              name="linkedin"
              placeholder="LinkedIn URL"
              value={profile.linkedin}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-600"
            />
            <input
              type="url"
              name="whatsapp"
              placeholder="WhatsApp URL"
              value={profile.whatsapp}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-600"
            />
            <input
              type="url"
              name="Github"
              placeholder="Github URL"
              value={profile.github}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-600"
            />
          </div>
        )}

        {/* Contact Info */}
        <div className="text-sm space-y-4">
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faEnvelope} className="text-orange-500" />
            {editMode ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="bg-transparent border-b border-gray-600 w-full"
              />
            ) : (
              <span>{profile.email}</span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faPhone} className="text-orange-500" />
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="bg-transparent border-b border-gray-600 w-full"
              />
            ) : (
              <span>{profile.phone}</span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faLocation} className="text-orange-500" />
            {editMode ? (
              <input
                type="text"
                name="Location"
                value={profile.location}
                onChange={handleChange}
                className="bg-transparent border-b border-gray-600 w-full"
              />
            ) : (
              <span>{profile.location}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroCard;
