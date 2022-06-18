export class Purchase {
    public id!: string;
    public cash!: number;
    public constructor(public total: number, public purchaseDate: string, public purchaseType: string,
        public taxRate: number, public cashierId: string, public bonusCardId: string) {

    }
}
