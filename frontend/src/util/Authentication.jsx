import React from "react";
import Cookies from "js-cookie";

const Authentication = () => {
  const token = Cookies.get("token");
  return token ? true : false;
};

export default Authentication;
