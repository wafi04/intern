import { LucideIcon } from "lucide-react";
import React from "react";
import { z } from "zod";

export interface PropsAuth {
  image: string;
  fields: InputFieldsAuth[];
  step: "signin" | "signup";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export type InputFieldsAuth = {
  name: string;
  id: string;
  Icon: React.ReactElement<LucideIcon>;
  value: string;
  label: string;
  type: "email" | "string";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isPassword?: boolean;
  error?: string;
};

// validasi dari client menggunakan zod
export const RegisterSchema = z.object({
  name: z.string().min(2, { message: "Nama minimal 2 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "Password harus mengandung huruf besar, kecil, dan angka",
    }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "Password harus mengandung huruf besar, kecil, dan angka",
    }),
});

export type LoginDto = z.infer<typeof LoginSchema>;
export type RegisterDto = z.infer<typeof RegisterSchema>;
