export class Purchase {
    public id!: string;
    public constructor(public total: number, public purchaseDate: string, public purchaseType: string,
        public taxRate: number, public cashierId: string, public bonusCardId: string) {

    }
}
