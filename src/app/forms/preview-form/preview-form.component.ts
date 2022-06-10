import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FieldType } from 'src/app/infrastructure/enums/form.enum';
import { FormInterface } from 'src/app/infrastructure/interfaces/form.interface';
import { DataService } from 'src/app/infrastructure/services/data.service';

@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.scss'],
})
export class PreviewFormComponent implements OnInit {
  formIndex: number;
  public form: FormInterface;
  public fieldTypes = FieldType;
  fieldArray: FormGroup;
  hidePassword= true;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.formIndex = this.route.snapshot.params['index'];
    this.form = this.dataService.getFormById(this.formIndex);
    this.initialForm();
  }

  onSubmitForm() {
    console.log(this.fieldArray);
  }

  private initialForm() {
    type groupType = { [key: string]: FormControl };

    let group: groupType = {};
    this.form.fields.forEach((item) => {
      let validators: ValidatorFn[] = [];
      if (item.isRequired) validators.push(Validators.required);
      if (item.hasPattern)
        validators.push(Validators.pattern(item.pattern ?? ''));

      group[item.name] = new FormControl(
        item.type == FieldType.check ? false : null
      );
      group[item.name].setValidators(validators)

    });

    this.fieldArray = new FormGroup(group);
  }
}
