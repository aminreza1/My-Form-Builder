import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { FieldType } from '../enums/form.enum';
import { FormInterface } from '../interfaces/form.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public forms: FormInterface[];

  constructor() {
    this.forms = [{
      name: 'Mock Form 1',
      fields: [
        {
          name : "username",
          label:"Username",
          placeholder: "Enter user name",
          type : FieldType.string,
          isRequired:true,
          hasPattern:false
        },
        {
          name : "password",
          label:"Password",
          placeholder: "Enter password",
          type : FieldType.string,
          isRequired:true,
          hasPattern:false,
          isPassword:true
        },
        {
          name : "birthdate",
          label:"Birth date",
          placeholder: "Choose your birth date",
          type : FieldType.date,
          isRequired:false,
          hasPattern:false
        },
        {
          name : "experience",
          label:"Years of experience",
          placeholder: "Count your experience years",
          type : FieldType.number,
          isRequired:true,
          hasPattern:false
        },
        {
          name : "isActive",
          label:"User is active and can login after create ?",
          placeholder: "",
          type : FieldType.check,
          isRequired:true,
          hasPattern:false
        }
      ],
    }];

  }

  public getForms() {
    return this.forms;
  }
  public getFormById(index: number) {
    return this.forms[index];
  }
  public addForm(form: FormInterface) {
    this.forms.push(form);
  }
}
