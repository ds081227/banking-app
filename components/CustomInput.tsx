import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/utils";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

const formSchema = authFormSchema("sign-up");

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  label: string;
  // Use fieldpath to infer from the util
  name: FieldPath<z.infer<typeof formSchema>>;
  placeholder: string;
}

export default function CustomInput({
  control,
  label,
  name,
  placeholder,
}: CustomInput) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={name === "password" ? "password" : "text"}
                {...field}></Input>
            </FormControl>
            {/* Error message comes from form-schema email validation */}
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
}
