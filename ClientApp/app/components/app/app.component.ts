import { Component,OnInit } from '@angular/core';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {


    ngOnInit() {
       
    
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
