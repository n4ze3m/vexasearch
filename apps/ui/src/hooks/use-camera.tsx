import React from "react";
import Webcam from "react-webcam";

export const useCamera = () => {
  const [permission, setPermission] = React.useState<
    "granted" | "denied" | "prompt" | "idle"
  >("granted");

  const webcamRef = React.useRef<Webcam>(null);
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
  const [facingMode, setFacingMode] = React.useState<"user" | "environment">(
    "environment"
  );
  const onUserMedia = () => {
    if (devices.length === 0) {
      navigator.mediaDevices
        .enumerateDevices()
        .then((mediaDevices) =>
          setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"))
        );
      setPermission("granted");
    }
  };

  const onUserMediaError = () => {
    setPermission("denied");
  };

  const toogleDevice = () => {
    setFacingMode((mode) => (mode === "user" ? "environment" : "user"));
  };
  const getScreenshot = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      return imageSrc;
    } else {
      return null;
    }
  }, [webcamRef]);
  
  return {
    permission,
    devices,
    toogleDevice,
    onUserMedia,
    webcamRef,
    onUserMediaError,
    facingMode,
    getScreenshot,
  };
};
