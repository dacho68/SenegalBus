import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client';

@Injectable()
export class HubServiceService {
    private _hubConnection: HubConnection;

    busInfoChange: EventEmitter<BusInfo> = new EventEmitter();

    constructor() { }

    getBusInfoChangeEmitter() {
        return this.busInfoChange;
    }

    emitBusInfoChangeEvent(iBusInfo: BusInfo ) {
        this.busInfoChange.emit(iBusInfo);
    }

    connectToHub() {
        this._hubConnection = new HubConnection('http://localhost:5001/hubbus');
        this._hubConnection
            .start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection :('));
        this._hubConnection.on('SendBusInfo', (info: BusInfo) => {
            console.log('new data!')
            this.emitBusInfoChangeEvent(info);
        });
    }
}
