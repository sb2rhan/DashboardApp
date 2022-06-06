import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Supplier } from '../entities/supplier';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() supplier!: Supplier;
  validateForm!: FormGroup;
  
  constructor(public activeModal: NgbActiveModal,
    private supplierService: SupplierService,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [this.supplier.name, [Validators.required]],
      address: [this.supplier.address, [Validators.required]],
      phoneNumber: [this.supplier.phoneNumber, [Validators.required]]
    });
  }

  edit() {
    if (this.validateForm.valid) {
      this.supplier.name = this.validateForm.value.name;
      this.supplier.address = this.validateForm.value.address;
      this.supplier.phoneNumber = this.validateForm.value.phoneNumber;
      this.supplierService.updateSupplier(this.supplier.id, this.supplier)
        .subscribe(res => {
          this.activeModal.close('Supplier edited');
        })
    }
  }

}
