"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

// type: either sign-up or sign-in
export default function AuthForm({ type }: { type: string }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    setIsLoading(true);
    try {
      // Sign up with Appwrite & create plaid token

      if (type === "sign-up") {
        // const newUser = await signUp(data);
        // setUser(newUser);
      }
      if (type === "sign-in") {
        // const response = await signIn({
        //   email: data.email,
        //   password: data.password,
        // });
        //     if (response) router.push("/");
      }
    } catch (error) {
      console.log(data);
    } finally {
      setIsLoading(false); // Set loading to false no matter success of fail
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image src="/icons/logo.svg" alt="logo" width={34} height={34} />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {/* if user exist, show link account, else check the type and render sign-in or sign-up */}
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label="First Name"
                      name="firstName"
                      placeholder="ex: John"
                    />
                    <CustomInput
                      control={form.control}
                      label="Last Name"
                      name="lastName"
                      placeholder="ex: Doe"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    label="Address"
                    name="address1"
                    placeholder="Enter your specific address"
                  />
                  <CustomInput
                    control={form.control}
                    label="City"
                    name="city"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label="State"
                      name="state"
                      placeholder="ex: NY"
                    />
                    <CustomInput
                      control={form.control}
                      label="Postal Code"
                      name="postalCode"
                      placeholder="ex: 11101"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label="Date of Birth"
                      name="dateOfBirth"
                      placeholder="YYYY-MM-DD"
                    />
                    <CustomInput
                      control={form.control}
                      label="SSN"
                      name="ssn"
                      placeholder="ex: 1234"
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                label="Email"
                name="email"
                placeholder="Enter your email"
              />

              <CustomInput
                control={form.control}
                label="Password"
                name="password"
                placeholder="Enter your password"
              />
              {/* disabled button base on isLoading to avoid resubmit and clutter up database */}
              <div className="flex flex-col gap-4">
                <Button className="form-btn" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link">
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
}
