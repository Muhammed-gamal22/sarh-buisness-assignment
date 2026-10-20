"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Controller, FieldPath, useFormContext } from "react-hook-form"
import { get } from "react-hook-form";
export function CustomCheckbox(props: React.InputHTMLAttributes<HTMLInputElement>) {
    const {
            control,
          } = useFormContext<any>(); 
  return (
      <div >
        <div className="flex gap-2">
        <Controller
        control={control}
        name={props.name}
         
        render={({field}) => (
            <Checkbox checked={field.value}
             onCheckedChange={field.onChange}  
       />
        )}
        />
        <Label htmlFor={props.name}>{props.placeholder}</Label>
        </div>
      </div>
    
  )
}
