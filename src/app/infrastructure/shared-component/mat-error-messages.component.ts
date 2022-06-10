import { Component, OnInit,Input ,Self} from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormGroup, FormGroupDirective, NgForm,NgControl } from '@angular/forms';


@Component({
  selector: 'custom-mat-error',
  template: `
      <ng-container *ngIf="isNotValid"  >
        <ng-container *ngIf="formControl.hasError('required')">This field is required</ng-container>
        <ng-container *ngIf="formControl.hasError('pattern')">this field has not valid format</ng-container>
      </ng-container>
    `,
  styles: [':host{display: block;color:red;font-size: 8pt;}']
})
export class CustomMatErrorComponent  {

  @Input() control:string;

  @Input() visible:any;
  
  constructor(private controlContainer: ControlContainer) { }

  get form():FormGroup {
    return this.controlContainer.control  as FormGroup;
  }

  get formControl() :AbstractControl{
    return this.form.get(this.control) as AbstractControl;
  }

  get isNotValid() {
    return this.formControl.invalid && (this.formControl.touched || this.formControl.dirty)
  }
  
}