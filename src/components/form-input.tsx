"use client";
import clsx from "clsx";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  name: UseControllerProps<T>["name"];
  label?: string;
  labelClassName?: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  inputClassName?: string;
  inputFieldClassName?: string;
  errorFieldClassName?: string;
  autoFocus?: boolean;
  control: UseControllerProps<T>["control"];
  disabled?: boolean;
};

const FormInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  labelClassName,
  inputClassName,
  inputFieldClassName,
  errorFieldClassName,
  control,
  autoFocus,
  disabled = false,
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
        <label htmlFor={String(name)} className={clsx("mb-6 w-1/4 break-keep pr-2", labelClassName)}>
          {label}
        </label>
      )}
      <div className={clsx(label ? "w-3/4" : "w-full", inputFieldClassName)}>
        <input
          id={String(name)}
          type={type}
          placeholder={placeholder}
          autoFocus={autoFocus}
          disabled={disabled}
          className={clsx("w-full rounded-lg px-3 py-4", inputClassName)}
          {...field}
        />
        <span className={clsx("block h-6 pl-2 pt-1 text-left text-sm font-semibold text-error", errorFieldClassName)}>
          {error && error.message?.toString()}
        </span>
      </div>
    </div>
  );
};

export default FormInput;
