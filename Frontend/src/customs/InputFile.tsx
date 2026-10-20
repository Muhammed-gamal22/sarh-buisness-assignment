
import { useState } from "react";
import { Controller, FieldPath, useFormContext } from "react-hook-form"
  
type FormValues = {
    image:string
};

  export function InputFile(props: React.InputHTMLAttributes<HTMLInputElement>  & {rules:object}) {
    const {formState: { errors },control} = useFormContext<FormValues>();
    const [previews, setPreviews] = useState<string[]>([]);
    const [files, setFiles] = useState<FileList | null>(null);
    return (
      <div>
       <Controller
      name={props.name as FieldPath<FormValues>}
      control={control}
      rules={props.rules}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <div className="flex flex-col gap-3">
        
          <label className="font-medium">{props.placeholder}</label>

          <input
            type="file"
            multiple
            id="multi-upload"
            className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              setFiles(files);
              if (!files) return;

              const urls = Array.from(files).map((file) =>
                URL.createObjectURL(file)
              );
              setPreviews(urls);
              onChange(files);
            }}
          />
          <label
            htmlFor="multi-upload"
            className="border border-primary p-3 rounded-2xl text-center cursor-pointer"
          >
            اختر الصور
          </label>

  
          <div className="grid grid-cols-3 gap-3">
             {  previews.map((src, index) => {
              console.log(src)
              return (
                <div key={index} className="relative">
                <img
                  src={src}
                  alt="preview"
                  className="w-full h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newPreviews = previews.filter((_, i) => i !== index);
                    setPreviews(newPreviews);
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 rounded"
                >
                  ✕
                </button>
              </div>
              )
            })}
          </div>
        </div>
      )}
    />
      {errors[props.name as FieldPath<FormValues>] && <p className="text-red-500">{errors[props.name as FieldPath<FormValues>]?.message}</p>}
      </div>
    )
  }
  