"use client";

import {
  useForm,
  Controller,
  FormProvider,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { recipeSchema, type Recipe } from "@/lib/types";
import Dropzone, { type FileRejection } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/constants";
import Image from "next/image";
import { createRecipe } from "@/server/actions";

export default function RecipeForm() {
  const form = useForm<Recipe>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      description: "",
      image_url: "",
      category: "",
      servings: "1",
      prep_time: "0",
      cook_time: "0",
      instructions: [{ instruction: "" }],
      ingredients: [{ amount: "", ingredient: "" }],
    },
  });

  const onSubmit = async (values: Recipe) => {
    await createRecipe(values);
  };

  const {
    fields: ins,
    append: addIns,
    remove: remIns,
  } = useFieldArray({
    name: "instructions",
    control: form.control,
  });

  const {
    fields: ings,
    append: addIng,
    remove: remIng,
  } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });

  const imageUrl = useWatch({
    name: "image_url",
    control: form.control,
  });

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
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
    "image/heic": [".heic"],
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Name */}
        <Controller
          name="name"
          control={form.control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Name"
              className="w-full px-5 h-24 outline-none border-b border-b-gray-200 text-5xl font-semibold tracking-tighter"
            />
          )}
        />
        <div className="w-full h-100 border-b border-b-gray-200 flex">
          {/* Iamge */}
          <div className="w-1/2 h-full border-r border-r-gray-200">
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
                    <input
                      {...getInputProps()}
                      className="absolute opacity-0"
                    />
                    <ImageIcon size={20} className="text-gray-400" />
                  </div>
                )}
              </Dropzone>
            )}
            {isUploading && (
              <div className="w-full h-full grid place-items-center">
                <div className="w-5 h-5 rounded-full border border-gray-400 animate-spin border-r-transparent!" />
              </div>
            )}
            {imageUrl && (
              <div className="w-full h-full relative">
                <Image
                  src={form.getValues("image_url")}
                  alt={form.getValues("name")}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 border-0 bg-red-50 text-red-400 p-0! w-7.5 grid place-items-center"
                  onClick={() => form.resetField("image_url")}
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
          {/* Details */}
          <div className="w-1/2 h-full flex flex-col">
            <div className="w-full h-[calc(100%/6)] px-5 flex justify-between items-center border-b border-b-gray-200">
              <p>Prep time:</p>
              <div className="flex items-center justify-end gap-2">
                <Controller
                  name="prep_time"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      className="w-12 text-right bg-gray-50 outline-none"
                    />
                  )}
                />
                <span className="text-sm text-gray-400">mins</span>
              </div>
            </div>
            <div className="w-full h-[calc(100%/6)] px-5 flex justify-between items-center border-b border-b-gray-200">
              <p>Cook time:</p>
              <div className="flex items-center justify-end gap-2">
                <Controller
                  name="cook_time"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      className="w-12 text-right bg-gray-50 outline-none"
                    />
                  )}
                />
                <span className="text-sm text-gray-400">mins</span>
              </div>
            </div>
            <div className="w-full h-[calc(100%/6)] px-5 flex justify-between items-center border-b border-b-gray-200">
              <p>Servings:</p>
              <div className="flex items-center justify-end gap-2">
                <Controller
                  name="servings"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      className="w-12 text-right bg-gray-50 outline-none"
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full h-[calc(100%/6)] px-5 flex justify-between items-center border-b border-b-gray-200">
              <p>Category:</p>
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
                      <option key={category.id} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <Controller
              name="description"
              control={form.control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full grow outline-none resize-none px-5 py-2.5"
                  placeholder="Description"
                />
              )}
            />
          </div>
        </div>
        <div className="w-full flex min-h-[calc(100vh-610px)]">
          <div className="w-1/2 border-r border-gray-200 relative">
            {/* Ingredients */}
            <div className="w-full h-14 flex justify-between items-center px-5 border-b border-b-gray-200 sticky top-0">
              <p className="text-3xl font-semibold tracking-tighter">
                Ingredients
              </p>
              <button
                className="flex items-center gap-2 border-black bg-black text-white"
                type="button"
                onClick={() => addIng({ amount: "", ingredient: "" })}
              >
                <Plus size={12} />
                Ingredient
              </button>
            </div>
            {ings.map((field, index) => (
              <div
                className={cn(
                  "w-full flex items-center gap-5 pr-5 h-14",
                  index < 4 ? "border-b border-b-gray-200" : "",
                )}
                key={field.id}
              >
                <div className="grow h-full">
                  <Controller
                    name={`ingredients.${index}.amount`}
                    control={form.control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Amount"
                        className="w-4/12 pl-5 h-full outline-none border-r border-r-gray-200"
                      />
                    )}
                  />
                  <Controller
                    name={`ingredients.${index}.ingredient`}
                    control={form.control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Ingredient"
                        className="w-8/12 h-full outline-none px-5"
                      />
                    )}
                  />
                </div>
                <button
                  onClick={() => remIng(index)}
                  className="w-7.5! p-0! grid place-items-center bg-red-50 border-red-400 text-red-400"
                  type="button"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          {/* Instructions */}
          <div className="w-1/2 relative">
            <div className="w-full h-14 flex justify-between items-center px-5 border-b border-b-gray-200 sticky top-0">
              <p className="text-3xl font-semibold tracking-tighter">
                Instructions
              </p>
              <button
                onClick={() => addIns({ instruction: "" })}
                className="flex items-center gap-2 border-black bg-black text-white"
                type="button"
              >
                <Plus size={12} />
                Instruction
              </button>
            </div>
            {ins.map((field, index) => (
              <div
                className={cn(
                  "w-full px-5 h-50 py-3.25 flex gap-3 justify-start items-start",
                  index < 1 ? "border-b border-b-gray-200" : "",
                )}
                key={field.id}
              >
                <div className="w-7.5 h-7.5 bg-black border border-black grid place-items-center text-white text-sm">
                  <p>{index + 1}</p>
                </div>
                <Controller
                  name={`instructions.${index}.instruction`}
                  control={form.control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      placeholder="Instruction"
                      className="grow resize-none h-full outline-none"
                    />
                  )}
                />
                <button
                  onClick={() => remIns(index)}
                  className="w-7.5! p-0! grid place-items-center bg-red-50 border-red-400 text-red-400"
                  type="button"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-14 px-5 flex justify-end items-center border-t border-t-gray-200">
          <button
            className={cn(
              form.formState.isValid
                ? "border-black bg-black text-white"
                : "border-black cursor-not-allowed",
            )}
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving Recipe..." : "Save Recipe"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
