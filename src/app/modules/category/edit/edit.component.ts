import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../category.service';
import { Category } from '../entities/category';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() category!: Category;
  validateForm!: FormGroup;
  
  constructor(public activeModal: NgbActiveModal,
    private categoryService: CategoryService,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [this.category.name, [Validators.required]]
    });
  }

  edit() {
    if (this.validateForm.valid) {
      this.category.name = this.validateForm.value.name;
      this.categoryService.updateCategory(this.category.id, this.category)
        .subscribe(res => {
          this.activeModal.close('Category edited');
        })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
