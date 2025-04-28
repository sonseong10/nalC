import { useState } from "react";

export const useBlindAction = () => {
  const [isShow, setIsShow] = useState<boolean>(true);

  const change = (state?: boolean) =>
    setIsShow(state !== undefined ? state : !isShow);

  return { isShow, change };
};
