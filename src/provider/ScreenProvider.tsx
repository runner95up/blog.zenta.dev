"use client";
import { ScreenSizeContext, useScreenSize } from "@/hooks";
import { ReactNode, useEffect } from "react";

export const ScreenProvider = ({ children }: { children: ReactNode }) => {
  const { width, height, setScreenSize, isDesktop, isTablet, isMobile } =
    useScreenSize();

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  return (
    <ScreenSizeContext.Provider
      value={{ width, height, setScreenSize, isDesktop, isTablet, isMobile }}
    >
      {children}
    </ScreenSizeContext.Provider>
  );
};
