export default class CarData {
    constructor({database}) {
        this.database = database;
    }
    update(reg,val) {
        const registers = this.database.ref.child('registers');

        registers.set({register : reg, value : val});
    }
}