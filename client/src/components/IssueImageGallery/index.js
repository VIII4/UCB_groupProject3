import React from "react";
import ImageThumb from "./ImageThumb";
import "./style.css";

export default function IssueImageGallery({ images, issueDesc }) {
  return images.map((imageUrl) => {
    <ImageThumb imageUrl={imageUrl} issueDesc={issueDesc} />;
  });
}
