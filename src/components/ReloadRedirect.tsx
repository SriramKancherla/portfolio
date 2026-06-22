import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { isPageReload, prepareHomeIntro, resetScrollRestoration } from "@/lib/intro";

/** On reload: non-home routes go to `/`; home always resets scroll/hash for the intro. */
export const ReloadRedirect = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (pathname !== "/") {
      if (isPageReload()) {
        window.location.replace("/");
      }
      return;
    }

    prepareHomeIntro();

    return () => {
      resetScrollRestoration();
    };
  }, [pathname]);

  return null;
};
