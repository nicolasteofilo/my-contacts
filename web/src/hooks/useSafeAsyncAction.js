import { useCallback } from "react";
import useIsMounted from "./useIsMonted";

export default function useSafeAsyncAction() {
  const isMounted = useIsMounted();

  const runSafeAsyncAction = useCallback((callbackFn) => {
    if(isMounted()) {
      callbackFn();
    }
  }, [isMounted])

  return runSafeAsyncAction;
}
