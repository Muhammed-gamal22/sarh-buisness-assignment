
import {
    Select,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectTrigger,
  } from "@/components/ui/select";
import { Controller, FieldPath, useFormContext } from "react-hook-form";


type Option = {
    value:  string;
    label: string;
    id?:number;
  };
  
  type Props = {
    options: Option[];
    name: string;
    placeholder: string;
    rules?: any;
  };

type FormValues = {
    status:string
};
  
const SelectBox = (props:Props) => {
    const {
            control,
            formState: { errors },
          } = useFormContext<FormValues>();
    return (
         <div>
        <Controller
                control={control}
                rules={props.rules}
                name={props.name as FieldPath<FormValues>}
                render={({ field: { onChange, value } }) => {

                    return (
                    <Select
                        value={value}
                        onValueChange={onChange}
                        dir="rtl"
                    >
                        <SelectTrigger className="border-primary border gap-2 text-primary rounded-2xl p-2">
                        <SelectValue placeholder={props.placeholder}/>
                        </SelectTrigger>

                        <SelectContent className="border-primary 
                        font-medium gap-2 bg-white shadow-lg text-primary 
                        rounded-2xl w-[300px] p-1">
                        {props.options.map((option: Option) => (
                            <SelectItem
                            onClick={() => onChange(option.value)}
                            key={option.value}
                            value={option.value}
                            className="hover:bg-primary 
                            rounded-2xl cursor-pointer p-2 hover:text-white"
                            >
                            {option.label}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    );
                }}
                />
     {errors[props.name as FieldPath<FormValues>] && <p className="text-red-500">{errors[props.name as FieldPath<FormValues>]?.message}</p>}
         </div>
        
    )
}
export default SelectBox