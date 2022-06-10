import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BonusCardService } from '../bonus-card.service';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { BonusCard } from '../entities/bonus-card';
import { SortableDirective, SortEvent } from '../sortable.directive';

const compare = (v1: string | boolean, v2: string | boolean) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  bonusCards: BonusCard[] = [];

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  constructor(private bonusCardService: BonusCardService, private modalService: NgbModal) {
    this.refreshBonusCards()
  }

  refreshBonusCards() {
    this.bonusCardService.getBonusCards()
      .subscribe((res: BonusCard[]) => {
        this.bonusCards = res;
      })
  }

  ngOnInit(): void {
  }

  deleteBonusCard(id: string) {
    this.bonusCardService.deleteBonusCard(id)
      .subscribe(res => {
        this.bonusCards = this.bonusCards.filter(p => p.id !== id);
      })
  }

  onSort({ column, direction }: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction !== '') {
      this.bonusCards = [...this.bonusCards].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  openModal(operation: string, bonusCard?: BonusCard) {
    if (operation === 'create') {
      this.modalService.open(CreateComponent)
        .closed
        .subscribe(res => {
          this.refreshBonusCards();
        })
    } else if (operation === 'edit') {
      const modalRef = this.modalService.open(EditComponent);
      modalRef.componentInstance.bonusCard = bonusCard;
    }
  }


}
