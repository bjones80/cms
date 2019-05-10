export class Contact {
    public id: string;
    public name: string;
    public email: string;
    public phone: string;
    public imagePath: string;
    public group: Contact[];

    constructor(id : string, name: string, email: string, phone: string, imagePath: string, group: null) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone; 
        this.imagePath = imagePath;
        this.group = group;
    }

}