import { createFileRoute } from "@tanstack/react-router";
import {
  useForm,
  Controller,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Recipe, recipeSchema } from "@server/shared-types";
import Dropzone, { type FileRejection } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing";
import { ImageIcon, PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";
import { createRecipe } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/_authorized/create-recipe/")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<Recipe>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      description: "",
      image_url: "",
      prep_time: "0",
      cook_time: "0",
      servings: "1",
      category: "",
      instructions: [{ instruction: "" }],
      ingredients: [{ amount: "", ingredient: "" }],
    },
  });

  const [imageUrl, setImageUrl] = useState<string | null>(null);

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

  const onSubmit = (values: Recipe) => {
    toast.promise(
      async () => {
        await createRecipe(values);
      },
      {
        loading: "Saving recipe...",
        error: "Something went wrong, try again",
        success: () => {
          form.reset();
          setImageUrl(null);
          toast.success("Recipe saved!");
        },
      },
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full h-15 flex justify-between items-center px-5 border-b border-b-gray-200">
          <p className="text-2xl font-black tracking-tighter">Create recipe</p>
          <button
            type="submit"
            disabled={!form.formState.isValid}
            className={cn(
              "disabled:cursor-not-allowed",
              form.formState.isValid && "bg-black text-white border-black",
            )}
          >
            Save
          </button>
        </div>
        <div className="w-full h-32 border-b border-b-gray-200 px-5">
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Name"
                className="w-full h-full outline-none text-5xl tracking-tighter font-black"
              />
            )}
          />
        </div>
        <div className="w-full h-100 border-b border-b-gray-200 flex">
          <div className="w-1/2 h-full border-r border-gray-200">
            {!imageUrl && !isUploading && (
              <Dropzone
                accept={accept}
                onDropAccepted={onDropAccepted}
                onDropRejected={onDropRejected}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="w-full h-full grid place-items-center"
                  >
                    <input {...getInputProps()} className="absolute" />
                    <ImageIcon size={20} className="text-gray-400" />
                  </div>
                )}
              </Dropzone>
            )}
            {isUploading && (
              <div className="w-full h-full grid place-items-center">
                <div className="w-4 h-4 animate-spin border border-gray-400 border-r-transparent! rounded-full" />
              </div>
            )}
            {imageUrl && !isUploading && (
              <div className="w-full h-full relative p-2">
                <div className="w-full h-full">
                  <img src={imageUrl} alt="" className="w-full h-full" />
                </div>
                <button
                  type="button"
                  className="absolute top-2 right-2 z-999 p-0! w-8 border-red-400 bg-red-50 text-red-400 grid place-items-center"
                  onClick={() => {
                    setImageUrl(null);
                    form.resetField("image_url");
                  }}
                >
                  <XIcon size={12} />
                </button>
              </div>
            )}
          </div>
          <div className="w-1/2 h-full flex flex-col">
            <div className="w-full h-[calc(400px/6)] border-b border-gray-200 px-5 flex justify-between items-center">
              <p>Prep time</p>
              <div className="w-10">
                <Controller
                  name="prep_time"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      min={0}
                      className="w-full h-full"
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full h-[calc(400px/6)] border-b border-gray-200 px-5 flex justify-between items-center">
              <p>Cook time</p>
              <div className="w-10">
                <Controller
                  name="cook_time"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      min={0}
                      className="w-full h-full"
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full h-[calc(400px/6)] border-b border-gray-200 px-5 flex justify-between items-center">
              <p>Servings</p>
              <div className="w-10">
                <Controller
                  name="servings"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      min={0}
                      className="w-full h-full"
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full h-[calc(400px/6)] border-b border-gray-200 px-5 flex justify-between items-center">
              <p>Category</p>
              <div className="w-25">
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field }) => (
                    <select {...field} className="w-full outline-none">
                      <option>Select</option>
                      {CATEGORIES.map((category) => (
                        <option key={category.id} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
            </div>
            <div className="grow w-full">
              <Controller
                name="description"
                control={form.control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="w-full h-full outline-none resize-none px-5 py-2"
                    placeholder="Description"
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-1/2 border-r border-r-gray-200">
            <div className="w-full h-14 border-b border-b-gray-200 px-5 flex justify-between items-center">
              <p className="text-2xl font-black tracking-tighter">
                Ingredients
              </p>
              <button
                type="button"
                className="flex items-center gap-2 border-black bg-black text-white"
                onClick={() => addIng({ amount: "", ingredient: "" })}
              >
                <PlusIcon size={12} /> Ingredient
              </button>
            </div>
            {ings.map((field, index) => (
              <div
                key={field.id}
                className="w-full flex h-14 border-b border-b-gray-200 items-center pr-5"
              >
                <div className="w-1/3 border-r border-r-gray-200 h-full">
                  <Controller
                    name={`ingredients.${index}.amount`}
                    control={form.control}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Amount"
                        className="w-full h-full px-5 outline-none"
                      />
                    )}
                  />
                </div>
                <div className="grow border-r border-r-gray-200">
                  <Controller
                    name={`ingredients.${index}.ingredient`}
                    control={form.control}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Ingredient"
                        className="w-full h-full px-5 outline-none"
                      />
                    )}
                  />
                </div>
                <button
                  type="button"
                  className="w-8! p-0! grid place-items-center border-red-400 bg-red-50 text-red-400"
                  onClick={() => remIng(index)}
                >
                  <XIcon size={12} />
                </button>
              </div>
            ))}
          </div>
          <div className="w-1/2 border-r border-r-gray-200">
            <div className="w-full h-14 border-b border-b-gray-200 px-5 flex justify-between items-center">
              <p className="text-2xl font-black tracking-tighter">
                Instructions
              </p>
              <button
                type="button"
                className="flex items-center gap-2 border-black bg-black text-white"
                onClick={() => addIns({ instruction: "" })}
              >
                <PlusIcon size={12} /> Instruction
              </button>
            </div>
            {ins.map((field, index) => (
              <div
                className="w-full flex justify-start items-start border-b border-b-gray-200 h-40"
                key={field.id}
              >
                <div className="w-14 h-14 grid place-items-center">
                  <div className="w-8 h-8 border border-black bg-black text-white grid place-items-center">
                    <p>{index + 1}</p>
                  </div>
                </div>
                <Controller
                  name={`instructions.${index}.instruction`}
                  control={form.control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="grow resize-none outline-none py-3 h-full"
                      placeholder="Instruction"
                    />
                  )}
                />
                <div className="w-14 h-14 grid place-items-center">
                  <button
                    type="button"
                    className="w-8! p-0! grid place-items-center border-red-400 bg-red-50 text-red-400"
                    onClick={() => remIns(index)}
                  >
                    <XIcon size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
