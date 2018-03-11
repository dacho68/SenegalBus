import { Component,OnInit } from '@angular/core';
import { BusHubService } from '../../bus-hub.service';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit {
    public currentCount = 0;
    subscription: any;
    busHubService: BusHubService;

    constructor(hubService: BusHubService) {
        this.busHubService = hubService;
    }

    ngOnInit() {
        this.subscription = this.busHubService.getBusInfoChangeEmitter()
            .subscribe(item => this.onBusInfoChange(item));

        this.busHubService.getLatestBusInfo()
            .then(x => this.currentCount = x.numAvailable)
            .catch(err => console.log(err));
    }



    onBusInfoChange(item: BusInfo) {
        this.currentCount = item.numAvailable;
    }

    incrementCounter() {
        this.currentCount++;
        this.busHubService.publishNewBusCount(this.currentCount);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
