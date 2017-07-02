export const CarDataStore = ({ database }) => {
    const _database = database;
    const convertBufToObj = data => {
        const values = {};
        for (const reg of data.entries()) {
            Object.defineProperty(values, reg[0], {
                value: reg[1],
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
        return values;
    }
    return {

        store: message => {
            const { register, data } = message;
            const registers = _database().ref().child('registers').child(register);

            const values = convertBufToObj(data);
           
            registers.set({ data: values, lastUpdated: new Date().toISOString() });    
           
            return message;
        },
        getRegister: reg => {
            return _database().ref('/registers/' + reg).once('value').then(register => {
                return register.val().data;
            });
        },
    }
}