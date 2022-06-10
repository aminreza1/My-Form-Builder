import { Component, OnInit } from '@angular/core';
import { FormInterface } from '../infrastructure/interfaces/form.interface';
import { DataService } from '../infrastructure/services/data.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  forms: FormInterface[];
  public displayedColumns: string[] = ['#','name', 'length', 'operations'];

  constructor(private dataService: DataService) { 
    
  }

  ngOnInit(): void {
    this.forms = this.dataService.getForms();
  }

}
