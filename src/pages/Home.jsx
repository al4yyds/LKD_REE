import React, { useState, useEffect } from "react";
import PicCarousel from "../componentsJSX/PicCarousel";
import Filterbar from "../componentsJSX/Filterbar";
import PromotionSection from "../componentsJSX/PromotionSection";
import Rank from "../componentsJSX/Rank";
import Area from "../componentsJSX/Area";
import Weather from "../componentsJSX/Weather";
import Redeye from "../componentsJSX/Redeye";
import Loader from "../componentsJSX/Loader";
import LoginForm from "../componentsJSX/LoginForm"; // 引入 LoginForm 組件
import { jwtDecode } from "jwt-decode";

const Home = () => {
  // const islogin=true;

  return (
    <>
      {/* {islogin&&()} */}
      <PicCarousel />
      <Filterbar />
      <PromotionSection />
      <Rank />
      <Area />
      <Weather />
      <Redeye />
    </>
  );
};

export default Home;
