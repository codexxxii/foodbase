"use client";

import {
  useForm,
  Controller,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import Dropzone, { type FileRejection } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadThing } from "@/lib/uploadthing";
import { ImageIcon, PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { categories } from "@/app/constants";
import Image from "next/image";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1),
  image_url: z.url().min(1),
  description: z.string().min(1).max(300),
  prep_time: z.string().min(1),
  cook_time: z.string().min(1),
  servings: z.string().min(1),
  category: z.string().min(1),
  ingredients: z
    .array(
      z.object({
        amount: z.string().min(1),
        ingredient: z.string().min(1),
      }),
    )
    .min(1),
  instructions: z
    .array(
      z.object({
        instruction: z.string().min(1),
      }),
    )
    .min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export default function RecipeForm() {
  const [imageUrl, setImageUrl] = useState<null | string>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image_url: "",
      description: "",
      prep_time: "0",
      cook_time: "0",
      servings: "1",
      category: "",
      ingredients: [{ amount: "", ingredient: "" }],
      instructions: [{ instruction: "" }],
    },
  });

  const onSubmit = (values: FormSchema) => {
    console.log(values);
  };

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      setImageUrl(data.ufsUrl);
      form.setValue("image_url", data.ufsUrl);
    },
  });

  const onDropAccepted = async (acceptedFiles: File[]) => {
    await startUpload(acceptedFiles);
  };

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    console.log(rejectedFiles);
  };

  const accept = {
    "image/jpg": [".jpg"],
    "image/jpeg": [".jpeg"],
    "image/png": [".png"],
  };

  const {
    fields: ings,
    append: addIng,
    remove: remIng,
  } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });

  const {
    fields: ins,
    append: addIns,
    remove: remIns,
  } = useFieldArray({
    name: "instructions",
    control: form.control,
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full h-14 flex justify-between items-center px-5 border-b border-b-gray-200">
          <p className="text-2xl font-black tracking-tighter">Create Recipe</p>
          <button
            disabled={!form.formState.isValid}
            className={cn(
              "border-black disabled:cursor-not-allowed!",
              form.formState.isValid && "bg-black text-white",
            )}
          >
            Save
          </button>
        </div>
        {/* Name */}
        <Controller
          name="name"
          control={form.control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full h-25 border-b border-b-gray-200 outline-none text-5xl font-black tracking-tighter px-5"
              placeholder="Name"
            />
          )}
        />
        {/* Image and Details */}
        <div className="w-full flex h-100 border-b border-gray-200">
          {/* Image */}
          <div className="w-1/2 h-full border-r border-r-gray-200">
            {/* No Image */}
            {!imageUrl && !isUploading && (
              <Dropzone
                onDropAccepted={onDropAccepted}
                onDropRejected={onDropRejected}
                accept={accept}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="w-full h-full grid place-items-center relative"
                  >
                    <input {...getInputProps()} className="absolute" />
                    <ImageIcon size={20} className="text-gray-400" />
                  </div>
                )}
              </Dropzone>
            )}
            {/* Uploading */}
            {isUploading && (
              <div className="w-full h-full grid place-items-center">
                <div className="h-5 w-5 rounded-full border border-gray-400 animate-spin border-r-transparent!" />
              </div>
            )}
            {/* Image */}
            {imageUrl && (
              <div className="w-full h-full p-2 relative">
                <Image src={imageUrl} alt="" className="object-cover" fill />
                <button
                  onClick={() => setImageUrl(null)}
                  type="button"
                  className="h-8! w-8! p-0! grid place-items-center bg-red-200 text-red-700 absolute top-0 right-0"
                >
                  <XIcon size={12} />
                </button>
              </div>
            )}
          </div>
          {/* Details */}
          <div className="w-1/2 h-full flex flex-col">
            <div className="w-full h-[calc(400px/6)] border-b border-b-gray-200 px-5 flex justify-between items-center">
              <p>Prep Time</p>
              <div className="w-12">
                <Controller
                  name="prep_time"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      min={0}
                      {...field}
                      type="number"
                      className="w-full outline-none"
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full h-[calc(400px/6)] border-b border-b-gray-200 px-5 flex justify-between items-center">
              <p>Cook Time</p>
              <div className="w-12">
                <Controller
                  name="cook_time"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      min={0}
                      {...field}
                      type="number"
                      className="w-full outline-none"
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full h-[calc(400px/6)] border-b border-b-gray-200 px-5 flex justify-between items-center">
              <p>Servings</p>
              <div className="w-12">
                <Controller
                  name="servings"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      min={1}
                      {...field}
                      type="number"
                      className="w-full outline-none"
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full h-[calc(400px/6)] border-b border-b-gray-200 px-5 flex justify-between items-center">
              <p>Category</p>
              <div>
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field }) => (
                    <select
                      value={field.value}
                      onChange={field.onChange}
                      className="outline-none"
                    >
                      <option>Select</option>
                      {categories.map((category) => (
                        <option value={category.value} key={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
            </div>
            <div className="w-full grow">
              <Controller
                name="description"
                control={form.control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Description"
                    className="w-full h-full outline-none px-5 py-2.5 resize-none"
                  />
                )}
              />
            </div>
          </div>
        </div>
        {/* Ingredients & Instructions */}
        <div className="w-full flex">
          {/* Ingredients */}
          <div className="w-1/2 border-r border-r-gray-200 min-h-[calc(100vh-620px)]">
            <div className="w-full h-14 border-b border-b-gray-200 px-5 flex justify-between items-center">
              <p className="text-2xl font-black tracking-tighter">
                Ingredients
              </p>
              <button
                className="flex items-center gap-2 bg-black text-white border-black"
                type="button"
                onClick={() => addIng({ amount: "", ingredient: "" })}
              >
                <PlusIcon size={12} />
                Ingredient
              </button>
            </div>
            {ings.map((field, index) => (
              <div
                key={field.id}
                className="w-full px-5 py-2.5 flex gap-2.5 items-center border-b border-b-gray-200"
              >
                <Controller
                  name={`ingredients.${index}.amount`}
                  control={form.control}
                  render={({ field }) => (
                    <input
                      placeholder="Amount"
                      {...field}
                      className="w-1/4 outline-none"
                    />
                  )}
                />
                <Controller
                  name={`ingredients.${index}.ingredient`}
                  control={form.control}
                  render={({ field }) => (
                    <input
                      placeholder="Ingredient"
                      {...field}
                      className="grow outline-none"
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => remIng(index)}
                  className="h-8! w-8! p-0! grid place-items-center bg-red-200 text-red-700 border-red-700!"
                >
                  <XIcon size={12} />
                </button>
              </div>
            ))}
          </div>
          {/* Instructions */}
          <div className="w-1/2">
            <div className="w-full h-14 border-b border-b-gray-200 px-5 flex justify-between items-center">
              <p className="text-2xl font-black tracking-tighter">
                Instructions
              </p>
              <button
                className="flex items-center gap-2 bg-black text-white border-black"
                type="button"
                onClick={() => addIns({ instruction: "" })}
              >
                <PlusIcon size={12} />
                Instruction
              </button>
            </div>
            {ins.map((field, index) => (
              <div
                className="w-full flex gap-2.5 px-5 py-2.5 border-b border-b-gray-200"
                key={field.id}
              >
                <div className="h-8! w-8! p-0! grid place-items-center border-black text-white bg-black">
                  <p>{index + 1}</p>
                </div>
                <Controller
                  name={`instructions.${index}.instruction`}
                  control={form.control}
                  render={({ field }) => (
                    <textarea
                      placeholder="Instruction"
                      {...field}
                      className="resize-none outline-none grow h-40"
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => remIns(index)}
                  className="h-8! w-8! p-0! grid place-items-center bg-red-200 text-red-700 border-red-700!"
                >
                  <XIcon size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
