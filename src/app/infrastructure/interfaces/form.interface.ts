import { FormArray, FormGroup } from "@angular/forms";
import { FieldType } from "../enums/form.enum";

export interface FormInterface{
    name:string;
    fields : FormItemInterface[];
}

export interface FormItemInterface{
    name:string,
    label:string,
    type:FieldType
    placeholder?:string,
    isRequired:boolean,
    hasPattern:boolean,
    pattern?:RegExp,
    options?:string[],
    isPassword?:boolean

}