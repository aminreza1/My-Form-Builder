import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { FieldType, FieldTypeToOptionMapper } from 'src/app/infrastructure/enums/form.enum';
import { FormItemInterface } from 'src/app/infrastructure/interfaces/form.interface';
import { DataService } from 'src/app/infrastructure/services/data.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public selectedFieldType:string;
  public hasPatternState:boolean = false;

  options : string[] = []
  public AddFieldForm_formGroup: FormGroup;
  public AddForm_formGroup: FormGroup;
  newFormItems : FormItemInterface[];

  public fieldTypeToOptionMapper = FieldTypeToOptionMapper;
  public fieldTypes = Object.values(FieldType);
  public displayedColumns: string[] = ['#','name', 'label', 'type', 'placeholder','isRequired','pattern','options'];

  @ViewChild(MatTable) table: MatTable<FormItemInterface>;
  
  constructor(private dataService :DataService, private router:Router) { 
    this.initialAddFieldFormGroup();  
    this.AddForm_formGroup = new FormGroup({
      'name': new FormControl(null, Validators.required),
    });
    this.newFormItems = [] as FormItemInterface[];
  }

  ngOnInit(): void {  }
  
  onSaveForm() {
    this.dataService.addForm({
      name : this.AddForm_formGroup.get('name')?.value,
      fields : this.newFormItems
    });
    this.router.navigate(['/forms']);
  }

  onAddItem() {
    this.newFormItems.push({
      name: this.AddFieldForm_formGroup.get('name')?.value,
      label: this.AddFieldForm_formGroup.get('label')?.value,
      placeholder: this.AddFieldForm_formGroup.get('placeholder')?.value,
      type: this.AddFieldForm_formGroup.get('type')?.value,
      hasPattern: this.AddFieldForm_formGroup.get('hasPattern')?.value,
      isRequired:this.AddFieldForm_formGroup.get('isRequired')?.value,
      isPassword:this.AddFieldForm_formGroup.get('isPassword')?.value,
      pattern:this.AddFieldForm_formGroup.get('pattern')?.value,
      options:this.options
    })
    console.log(this.newFormItems);
    this.table.renderRows();   
    this.initialAddFieldFormGroup();
    this.options = [];
  }

  onClearAddNewFieldForm(){
    this.initialAddFieldFormGroup();
    this.options = [];
  }
  onAddOption(event : MatChipInputEvent){
    const value = (event.value || '').trim();
    if (value) this.options.push(value);   
    event.chipInput!.clear();
  }
  onRemoveOption(opt:string){
    const index = this.options.indexOf(opt);
    if (index >= 0) this.options.splice(index, 1);    
  }

  onChangeFieldType(event : MatSelectChange){
    this.selectedFieldType = event.value;
  }

  onChangePatternState(event : MatCheckboxChange){
    this.AddFieldForm_formGroup.get('pattern')?.setValidators(event.checked ? [Validators.required] : null);
    this.AddFieldForm_formGroup.get('pattern')?.updateValueAndValidity();
    this.hasPatternState = event.checked
  }

  private initialAddFieldFormGroup(){
    this.AddFieldForm_formGroup = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'label': new FormControl(null, Validators.required),
      'placeholder': new FormControl(null),
      'type': new FormControl(null, Validators.required),
      'isRequired': new FormControl(false, Validators.required),
      'hasPattern': new FormControl(false, Validators.required),
      'pattern': new FormControl(null),
      'isPassword': new FormControl(false),
      'options': new FormControl([]),
    });
  }
}
