import { useState, useEffect } from "react";

type PossibleResult = false | string;

export const useDeviceDetect = () => {
  const [mobile, setMobile] = useState<PossibleResult>(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    setMobile(mobile as PossibleResult);
  }, []);

  return { mobile };
};
