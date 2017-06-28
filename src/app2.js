import  CarMessageHandler from './car_message';
import  CarDataStore  from './car_data';

const handler = new CarMessageHandler();
const store = new CarDataStore();

handler.onMessage((message) => {
    store.update(message);
});