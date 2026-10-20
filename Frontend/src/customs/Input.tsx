import { Calendar } from "@/components/ui/calendar"
import {Input} from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CompanyFormProps } from "@/types"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Controller, FieldPath } from "react-hook-form"
import { useFormContext } from "react-hook-form"
import { get } from "react-hook-form";

const CustomInput = (props: React.InputHTMLAttributes<HTMLInputElement> & {
    rules: object }) => {
        
    const {
        control,
        formState: { errors },
      } = useFormContext<CompanyFormProps>(); 
      const error = get(errors, props.name || "");
    return (
        <div className="flex flex-col gap-3">
            <Label>{props.placeholder}</Label>
            
            {props.type === "date" ? (
            <Controller
      control={control}
      name={props.name as FieldPath<CompanyFormProps>}
      rules={props.rules}
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-between">
        {field.value
            ? new Date(field.value).toLocaleDateString("ar-EG")
            : "اختر تاريخ"}
        <CalendarIcon />
        </Button>
          </PopoverTrigger>

          <PopoverContent>
            <Calendar
              mode="single"
              selected={field.value ? new Date(field.value) : undefined}
              onSelect={(date) => field.onChange(date)}
            />
          </PopoverContent>
        </Popover>
      )}
    />
            ) : (
                <Controller
                control={control}
                rules={props.rules}
                render={({ field }) => (
                    <>
                <Input {...field} {...props} 
                dir="rtl" className="border border-primary" />
                
                    </>
                )}
                name={props.name as FieldPath<CompanyFormProps>}
            />
            )}
            {error && 
                <p className="text-red-500">{error?.message}</p>
            }
        </div>
    )
}
export default CustomInput
