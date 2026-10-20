import {Input} from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CompanyFormProps } from "@/types"
import { Controller, FieldPath } from "react-hook-form"
import { useFormContext } from "react-hook-form"
import { get } from "react-hook-form";

const CustomTextarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    rules: object }) => {
        
    const {
        control,
        formState: { errors },
      } = useFormContext(); 
      const error = get(errors, props.name || "");
    return (
        <div className="flex flex-col gap-3">
            <Label>{props.placeholder}</Label>
            <Controller
                control={control}
                rules={props.rules}
                render={({ field }) => (
                <Textarea  {...field} {...props} 
                dir="rtl" className="border border-primary" />
                )}
                name={props.name as FieldPath<CompanyFormProps>}
            />
            {error && 
                <p className="text-red-500">{error?.message}</p>
            }
        </div>
    )
}
export default CustomTextarea
