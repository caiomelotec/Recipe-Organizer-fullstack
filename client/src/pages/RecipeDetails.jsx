import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const RecipeDetails = () => {
  const location = useLocation();
  const recipeId = location.pathname.split("/")[2];

  // console.log(recipeId);
  return <div>RecipeDetails</div>;
};
