import React from "react";
import "./style.css";

export default function ImageThumb({ imageUrl, issueDesc }) {
  return (
    // Image components here
    <img src={imageUrl} alt={issueDesc}></img>
  );
}
