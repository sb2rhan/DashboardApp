import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../entities/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() product!: Product;
  validateForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal,
    private productService: ProductService,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      barcode: [this.product.barcode, [Validators.required]],
      name: [this.product.name, [Validators.required]],
      description: [this.product.description, [Validators.nullValidator]],
      price: [this.product.price, [Validators.required]],
      stockAmount: [this.product.stockAmount, [Validators.required]],
      discountRate: [this.product.discountRate, [Validators.required]],
    });
  }

  edit() {
    if (this.validateForm.valid) {
      this.product.name = this.validateForm.value.name;
      this.productService.updateProduct(this.product.id, this.product)
        .subscribe(res => {
          this.activeModal.close('Product edited');
        })
    }
  }
}
