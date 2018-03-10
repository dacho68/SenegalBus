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

    async ngOnInit() {
        this.subscription = this.busHubService.getBusInfoChangeEmitter()
            .subscribe(item => this.selectedBusCount(item));
        this.currentCount = await this.busHubService.getLatestBusCount();
    }

    selectedBusCount(item: number) {
        this.currentCount = item;
    }

    incrementCounter() {
        this.currentCount++;
        this.busHubService.publishNewBusCount(this.currentCount);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
