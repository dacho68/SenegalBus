import { Component, OnInit } from '@angular/core';
//import { BusInfo } from '../../bus-info.type';
import { BusHubService } from '../../bus-hub.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {

    _busHubService : BusHubService;

    constructor(hubService: BusHubService) {
      this._busHubService = hubService;
    }

    ngOnInit() {
       
        this._busHubService.connectToHub();
        //this._hubConnection
        //    .start()
        //    .then(() => console.log('Connection started!'))
        //    .catch(err => console.log('Error while establishing connection :('));

        //this._hubConnection.on('sendToAll', (nick: string, receivedMessage: string) => {
        //    const text = `${nick}: ${receivedMessage}`;
        //    this.messages.push(text);
        //});

    }
}
