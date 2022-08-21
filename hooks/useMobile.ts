import React, { useEffect, useState } from "react";
import useWindow from "./useWindow";

const useMobile = () => {
  const window = useWindow();
  const isMobile: boolean = window.innerWidth <= 768;
  return isMobile;
};

export default useMobile;
