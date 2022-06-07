export class BonusCard {
    public id!: string;
    
    public constructor(public issueDate: string, public isActive: boolean, public ownerId: string) {}
}
