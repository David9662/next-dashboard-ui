"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long!" })
    .max(20, { message: "Username must be atmost 20 characters long!" }),

  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone  is required!" }),
  address: z.string().min(1, { message: "Address  is required!" }),
  bloodType: z.string().min(1, { message: "Blood  is required!" }),
  birthday: z.date({ message: "Birthday name is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

export default function TeacherForm({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form action="" className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new teacher</h1>
      <span className="text-xs text-gray-400 font font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label={"Username"}
          register={register}
          error={errors?.username}
          name={"username"}
          defaultValue={data?.username}
        />
        <InputField
          label={"Email"}
          register={register}
          type="email"
          error={errors?.email}
          name={"email"}
          defaultValue={data?.email}
        />
        <InputField
          label={"Password"}
          register={register}
          type="password"
          error={errors?.password}
          name={"password"}
          defaultValue={data?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label={"Phone"}
          register={register}
          error={errors?.phone}
          name={"phone"}
          defaultValue={data?.phone}
        />
        <InputField
          label={"Address"}
          register={register}
          error={errors?.address}
          name={"address"}
          defaultValue={data?.address}
        />
        <InputField
          label={"Blood Type"}
          register={register}
          error={errors?.bloodType}
          name={"bloodType"}
          defaultValue={data?.bloodType}
        />
        <InputField
          label={"Birthday"}
          register={register}
          error={errors?.birthday}
          name={"birthday"}
          defaultValue={data?.birthday}
          type="date"
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}
