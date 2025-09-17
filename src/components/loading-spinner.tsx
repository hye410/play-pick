import clsx from "clsx";
import { motion } from "framer-motion";
import { CSSProperties } from "react";

export const LoadingSpinner = ({ width = "50px", height = "50px", pointColor = "primary" }) => {
  const style = {
    "--spinner-width": width,
    "--spinner-height": height,
  } as CSSProperties;

  return (
    <div className="flex justify-center">
      <motion.div
        className={clsx(
          `h-[var(--spinner-height)] w-[var(--spinner-width)] transform rounded-[50%] border-4 border-t-${pointColor}`,
        )}
        style={style}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};
