import { IconLoader2, IconMovie } from "@tabler/icons-react";
import { SIZES } from "../config/constants.js";

function LoadingSpinner({ fullScreen = false, size = "default" }) {
  const sizeClasses = {
    small: SIZES.ICON_SMALL,
    default: SIZES.ICON_MEDIUM,
    large: SIZES.ICON_LARGE,
  };

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="logo-md">
            <IconMovie className={SIZES.LOGO_MEDIUM} />
          </div>
          <IconLoader2
            className={`${SIZES.ICON_LARGE} text-accent animate-spin`}
          />
          <p className="text-sm text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <IconLoader2 className={`${sizeClasses[size]} text-accent animate-spin`} />
  );
}

export default LoadingSpinner;
