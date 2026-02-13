"use client";

import React, { useState } from "react";
import { Splash } from "./Splash";

export const SplashWrapper = () => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return <Splash onComplete={() => setShow(false)} />;
};
