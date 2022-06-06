import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/entities/category';
import { Supplier } from '../../supplier/entities/supplier';
import { SupplierService } from '../../supplier/supplier.service';
import { Product } from '../entities/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  validateForm!: FormGroup;

  categories!: Category[];
  suppliers!: Supplier[];
  
  constructor(public activeModal: NgbActiveModal,
    private productService: ProductService,
    private categoriesService: CategoryService,
    private supplierService: SupplierService,
    private fb: FormBuilder) 
  {
    this.categoriesService
      .getCategories().subscribe(
        res => this.categories = res
      );

    this.supplierService
      .getSuppliers().subscribe(
        res => this.suppliers = res
      );
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      barcode: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.nullValidator]],
      price: ['', [Validators.required]],
      stockAmount: ['', [Validators.required]],
      discountRate: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      supplierId: ['', [Validators.required]]
    });
  }

  create() {
    if (this.validateForm.valid) {
      const form = this.validateForm.value;
      this.productService.createProduct(
        new Product(form.barcode, form.name, form.description, form.stockAmount,
          form.price, form.discountRate, form.supplierId, form.categoryId)
      )
      .subscribe(res => {
        this.activeModal.close('Product created');
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
