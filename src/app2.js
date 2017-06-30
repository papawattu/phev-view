import { CarMessageHandler } from './car_message';
import  CarDataStore  from './car_data';

const handler = CarMessageHandler();
const store = new CarDataStore();


client.on('message', messages => {
    client.publish('phev/send',  handler.respond(
        store.update(
            handler.split(messages).map(handler.decode)))).map(handler.encode));
});
mqtt.publish('phev/send',sender(
    encode(
        responseHandler(
            store(database,
                decode(
                    split(
                        await receiveMessages(mqtt)
                    )
                )
            )
        )
    )
);

handler.onMessage((message) => {
    store.update(message);
});