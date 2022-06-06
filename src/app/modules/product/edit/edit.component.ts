import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/entities/category';
import { Supplier } from '../../supplier/entities/supplier';
import { SupplierService } from '../../supplier/supplier.service';
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
      barcode: [this.product.barcode, [Validators.required]],
      name: [this.product.name, [Validators.required]],
      description: [this.product.description, [Validators.nullValidator]],
      price: [this.product.price, [Validators.required]],
      stockAmount: [this.product.stockAmount, [Validators.required]],
      discountRate: [this.product.discountRate, [Validators.required]],
      categoryId: [this.product.categoryId, [Validators.required]],
      supplierId: [this.product.supplierId, [Validators.required]]
    });
  }

  edit() {
    if (this.validateForm.valid) {
      const form = this.validateForm.value;
      this.product.name = form.name;
      this.product.barcode = form.barcode;
      this.product.description = form.description;
      this.product.price = form.price;
      this.product.stockAmount = form.stockAmount;
      this.product.discountRate = form.discountRate;
      this.product.categoryId = form.categoryId;
      this.product.supplierId = form.supplierId;
      
      this.productService.updateProduct(this.product.id, this.product)
        .subscribe(res => {
          this.activeModal.close('Product edited');
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
