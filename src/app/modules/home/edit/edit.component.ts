import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BonusCardService } from '../../bonus-card/bonus-card.service';
import { BonusCard } from '../../bonus-card/entities/bonus-card';
import { User } from '../../user/entities/user';
import { UserService } from '../../user/user.service';
import { Purchase } from '../entities/purchase';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() purchase!: Purchase;
  validateForm!: FormGroup;

  cashiers!: User[];
  bonusCards!: BonusCard[];
  purchaseTypes: string[] = ["CASH", "CARD"];
  selectedTypeCash: boolean = false;

  constructor(public activeModal: NgbActiveModal,
    private purchaseService: PurchaseService,
    private cashierService: UserService,
    private bonusCardService: BonusCardService,
    private fb: FormBuilder) 
  {
    this.cashierService
      .getUsers().subscribe(
        res => this.cashiers = res
      );

    this.bonusCardService
      .getBonusCards().subscribe(
        res => this.bonusCards = res
      );
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      total: [this.purchase.total, [Validators.required]],
      cash: [this.purchase.cash, [Validators.nullValidator]],
      purchaseDate: [this.purchase.purchaseDate?.substring(0, 16), [Validators.required]],
      purchaseType: [this.purchase.purchaseType, [Validators.required]],
      taxRate: [this.purchase.taxRate, [Validators.required]],
      cashierId: [this.purchase.cashierId, [Validators.required]],
      bonusCardId: [this.purchase.bonusCardId, [Validators.nullValidator]]
    });
  }

  selectedPurchaseType($event: any) {
    console.log($event)
    if ($event.target.value.includes('CASH')) {
      this.selectedTypeCash = true;
    } else {
      this.selectedTypeCash = false;
    }
  }

  edit() {
    if (this.validateForm.valid) {
      const form = this.validateForm.value;
      this.purchase.total = form.total;
      this.purchase.cash = form.cash;
      this.purchase.purchaseDate = form.purchaseDate;
      this.purchase.purchaseType = form.purchaseType;
      this.purchase.taxRate = form.taxRate;
      this.purchase.cashierId = form.cashierId;
      this.purchase.bonusCardId = form.bonusCardId;
      
      this.purchaseService.updatePurchase(this.purchase.id, this.purchase)
        .subscribe(res => {
          this.activeModal.close('Purchase edited');
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
