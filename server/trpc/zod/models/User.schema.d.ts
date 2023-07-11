import { type z } from "zod";

export declare const UserSchema: z.ZodObject<
  {
    id: z.ZodString;
    email: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    id: string;
    email: string;
  },
  {
    id: string;
    email: string;
  }
>;
export declare const UserCreateSchema: z.ZodObject<
  {
    id: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    id?: string | undefined;
    email: string;
  },
  {
    id?: string | undefined;
    email: string;
  }
>;
export declare const UserUpdateSchema: z.ZodObject<
  {
    id: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
  },
  "strip",
  z.ZodTypeAny,
  {
    id?: string | undefined;
    email?: string | undefined;
  },
  {
    id?: string | undefined;
    email?: string | undefined;
  }
>;
