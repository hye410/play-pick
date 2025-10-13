"use client";
import clsx from "clsx";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  name: UseControllerProps<T>["name"];
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  className?: string;
  autoFocus?: boolean;
  control: UseControllerProps<T>["control"];
};

const FormInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  className,
  control,
  autoFocus,
}: FormInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div className="mb-3 flex items-center">
      {label && (
        <label htmlFor={String(name)} className="mb-6 w-1/4 pr-2">
          {label}
        </label>
      )}
      <div className={clsx(label ? "w-3/4" : "w-full")}>
        <input
          id={String(name)}
          type={type}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`w-full rounded-lg px-3 py-4 ${className} `}
          {...field}
        />
        <span className="block h-6 pl-2 pt-1 text-left text-sm font-semibold text-error">
          {error && error.message?.toString()}
        </span>
      </div>
    </div>
  );
};

export default FormInput;
