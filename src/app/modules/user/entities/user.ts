export class User {
    public id!: string;

    public constructor(public userName: string,
        public passwordHash: string,
        public email: string,
        public phoneNumber: string,
        public firstName: string,
        public middleName: string,
        public lastName: string,
        public birthDate: string,
        public bankCard: string) { }
}
