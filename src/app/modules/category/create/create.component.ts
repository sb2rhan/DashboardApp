import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../category.service';
import { Category } from '../entities/category';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal,
    private categoryService: CategoryService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  create() {
    if (this.validateForm.valid) {
      this.categoryService.createCategory(new Category(this.validateForm.value.name))
        .subscribe(res => {
          this.activeModal.close('Category created');
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
