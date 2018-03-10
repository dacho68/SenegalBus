import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { HubConnection } from '@aspnet/signalr-client';

@Injectable()
export class BusHubService {
    private _hubConnection: HubConnection;

    busInfoChange: Subject<number> = new Subject<number>();

    constructor(private http: Http) { }

    public getBusInfoChangeEmitter() {
        return this.busInfoChange;
    }

    

    async publishNewBusCount(iBusCount: number): Promise<void> {
        try {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            this.http.post('api/businfo', iBusCount, options).toPromise();
        } catch (error) {
            await this.handleError(error);
        }
    }

    async handleError(error:any) {
        console.log(error);
    }

    private emitBusCountChangeEvent(iBusCount: number ) {
        this.busInfoChange.next(iBusCount);
    }

    connectToHub() {
        this._hubConnection = new HubConnection('http://localhost:5001/bushub');
        this._hubConnection
            .start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection :('));

        this._hubConnection.on('SendBusInfo', (busInfo: BusInfo) => {
            console.log('new data!')
            this.emitBusCountChangeEvent(busInfo.numAvailable);
        });
    }
}
