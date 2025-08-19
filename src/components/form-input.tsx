"use client";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  name: UseControllerProps<T>["name"];
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  className?: string;
  control: UseControllerProps<T>["control"];
};

const FormInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  className,
  control,
}: FormInputProps<T>) => {
  const {
    field,
    fieldState: { error, isDirty },
  } = useController({
    name,
    control,
  });

  return (
    <div>
      <label htmlFor={String(name)}>
        {label && label}
        <input
          id={String(name)}
          type={type}
          placeholder={placeholder}
          className={`px-5 py-4 ${className}`}
          {...field}
        />
      </label>
      {error && <span>{error.message?.toString()}</span>}
    </div>
  );
};

export default FormInput;
