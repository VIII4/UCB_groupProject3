import React, { useState } from "react";
import "./RefreshBtn.css";

export default function RefreshBtn({ onManualRefreshClick }) {
  const [bool, setBool] = useState(false);
  return (
    // main sidebar div container
    <div id="refreshBtnContainer">
      {/* sidebar open button */}
      <button className="refreshBtn" onClick={onManualRefreshClick}>
        <i className="fa fa-refresh"></i>
      </button>
    </div>
  );
}
