import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { HubConnection } from '@aspnet/signalr-client';

@Injectable()
export class BusHubService {
    private _hubConnection: HubConnection;

    busInfoChange: Subject<BusInfo> = new Subject<BusInfo>();

    constructor(private http: Http) { }

    public getBusInfoChangeEmitter() {
        return this.busInfoChange;
    }

    //async  getLatestBusInfo(): Promise<BusInfo> {
    //    try {
    //        let response = await this.http
    //            .get('api/businfo')
    //            .toPromise();
    //        return response.json();
    //    } catch (error) {
    //       await this.handleError(error);
    //      let wEmptyData = new BusInfo();
    //       return wEmptyData;
    //    }

    //}
    getLatestBusInfo(){
        return this.http
            .get('api/businfo')
            .map(response => response.json() as BusInfo)
            .toPromise();
    }

    //test Async with Post
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

    private emitBusInfoChangeEvent(iBusInfo: BusInfo ) {
        this.busInfoChange.next(iBusInfo);
    }

    connectToHub() {
        this._hubConnection = new HubConnection('http://localhost:5001/bushub');
        this._hubConnection
            .start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection :('));

        this._hubConnection.on('SendBusInfo', (busInfo: BusInfo) => {
            console.log('new data!')
            this.emitBusInfoChangeEvent(busInfo);
        });
    }
}
