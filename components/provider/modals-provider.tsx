"use client";

import { useEffect, useState } from "react";
import { SettingsModel } from "../modals/setting-model";
import CoverImageModel from "../modals/cover-image-model";

export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingsModel />
      <CoverImageModel />
    </>
  );
};
