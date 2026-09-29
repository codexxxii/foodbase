import { createFileRoute } from "@tanstack/react-router";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Recipe, recipeSchema } from "@server/shared-types";
import Dropzone, { type FileRejection } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";
import { ImageIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
      prep_time: "",
      cook_time: "",
      servings: "",
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

  const onSubmit = async (values: Recipe) => {
    console.log(values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full h-15 flex justify-between items-center px-5 border-b border-b-gray-200">
          <p className="text-2xl font-black tracking-tighter">Create recipe</p>
          <button
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
                  className="absolute top-2 right-2 z-999 p-0! w-8 border-red-400 bg-red-50 text-red-400 grid place-items-center"
                  onClick={() => {
                    setImageUrl(null);
                    form.setValue("image_url", "");
                  }}
                >
                  <XIcon size={12} />
                </button>
              </div>
            )}
          </div>
          <div className="w-1/2 h-full">
            <div className="w-full h-[calc(400px/6)] border-b border-gray-200 px-5 flex justify-between items-center">
              <p>Prep time</p>
              <div className="w-10">
                <input
                  type="number"
                  defaultValue={0}
                  min={0}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
