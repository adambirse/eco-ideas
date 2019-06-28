export default class Idea {
    constructor(id, text, ...categories) {
        this.id = id;
        this.text = text;
        this.categories = categories;
    }
}