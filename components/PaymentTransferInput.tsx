import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(4, "Transfer note is too short"),
  amount: z.string().min(4, "Amount is too short"),
  senderBank: z.string().min(4, "Please select a valid bank account"),
  sharableId: z.string().min(8, "Please select a valid sharable Id"),
});

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  label: string;
  // Use fieldpath to infer from the util
  name: FieldPath<z.infer<typeof formSchema>>;
  placeholder: string;
}

export default function PaymentTransferInput({
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
        <FormItem className="border-t border-gray-200">
          <div className="payment-transfer_form-item py-5">
            <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
              {label}
            </FormLabel>
            <div className="flex w-full flex-col">
              <FormControl>
                <Input
                  placeholder={placeholder}
                  className="input-class"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-12 text-red-500" />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
}
