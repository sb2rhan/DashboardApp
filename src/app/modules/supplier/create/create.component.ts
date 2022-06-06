import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Supplier } from '../entities/supplier';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal,
    private supplierService: SupplierService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]]
    });
  }

  create() {
    if (this.validateForm.valid) {
      const name = this.validateForm.value.name;
      const address = this.validateForm.value.address;
      const phone = this.validateForm.value.phoneNumber;
      this.supplierService.createSupplier(new Supplier(name, address, phone))
        .subscribe(res => {
          this.activeModal.close('Supplier created');
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
