export class Product {

    public id!: string;

    public constructor(
        public barcode: string,
        public name: string,
        public description: string,
        public stockAmount: number = 0,
        public price: number,
        public discountRate: number = 0.0,
        public supplierId: string,
        public categoryId: string) {

    }
}
