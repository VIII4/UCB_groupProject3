import React from "react";
import "./issueIcon.css"
import {
  GiPlantsAndAnimals,
  GiPowerLightning,
  GiRoad,
  GiPaintBucket,
  GiTrashCan,
  GiBoulderDash,
  GiBrokenPottery,
} from "react-icons/gi";
import { FaBuilding } from "react-icons/fa";

export default function IssueIcon({ issueType }) {
  switch (issueType) {
    case "Structural":
      return <FaBuilding />;
    case "Wildlife":
      return <GiPlantsAndAnimals />;
    case "Utility":
      return <GiPowerLightning />;
    case "Roads":
      return <GiRoad />;
    case "Vandalism":
      return <GiPaintBucket />;
    case "Trash":
      return <GiTrashCan />;
    case "Other":
      return <GiBoulderDash />;
    default:
      return <GiBrokenPottery />;
  }
}
