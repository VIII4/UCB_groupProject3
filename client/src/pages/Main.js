import React from "react";
import Map from "../components/Map";
import Card from "../components/Card";


function Main() {
  return (
    <div>
      {/* visibility can be set in css,but for 
          clarity it is done here instead */}
      <Card visibility="hidden" />
      <Map />
    </div>
  );
}

export default Main;
