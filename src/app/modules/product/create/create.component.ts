import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  validateForm!: FormGroup;
  
  constructor(public activeModal: NgbActiveModal,
    private productService: ProductService,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      barcode: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.nullValidator]],
      price: ['', [Validators.required]],
      stockAmount: ['', [Validators.required]],
      discountRate: ['', [Validators.required]],
    });
  }

  create() {
    /* 
    "barcode": "string",
  "name": "string",
  "description": "string",
  "stockAmount": 0,
  "price": 0,
  "discountRate": 0,
  "supplierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    */

  }
}
