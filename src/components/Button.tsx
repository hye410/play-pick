"use client";
import { cva } from "class-variance-authority";

type ButtonProps = {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
};

const buttonVariants = cva(["rounded-lg px-8 py-4 w-full whitespace-nowrap"], {
  variants: {
    color: {
      primary: ["bg-primary"],
      secondary: ["bg-secondary"],
      inactivePrimary: ["bg-disabled-primary"],
      inactiveSecondary: ["bg-disabled-black"],
    },
    size: {
      large: ["text-xl", "w-[280px]"],
      medium: ["text-base", "w-[200px]"],
      small: ["text-base", "w-[140px]"],
    },
    defaultVariants: {
      color: "primary",
      size: "medium",
    },
  },
});

const Button = (props: ButtonProps) => {
  const { size = "medium", color = "primary", children, onClick, disabled = false, type = "button" } = props;

  const colorVariant = () => {
    if (disabled) return color === "primary" ? "inactivePrimary" : "inactiveSecondary";
    return color;
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={buttonVariants({ size, color: colorVariant() })}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
