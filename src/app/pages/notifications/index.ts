//import { Response } from 'express';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CoreService, ICrimeNotification } from '../../services/core.service';

@Component({
    selector: 'main.page.notifications',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class NotificationsPage implements OnInit {
    notifications: ICrimeNotification[] = [];
    searchForm = this.fb.group({
        states: [[]],
        types: [[]],
    });

    constructor(
        public coreService: CoreService,
        private fb: FormBuilder,
    ) {

        console.log(this.searchForm.value)
    }

    ngOnInit(): void {
        this.coreService.setPageTitle('Crime Notifications');
        this.notifications = [...this.coreService.getNotifications()];
    }

    doSearch() {
        let notifications: ICrimeNotification[] = [...this.coreService.getNotifications()];
        if(this.searchForm.value.states.length) {
            notifications = notifications.filter(n => this.searchForm.value.states.includes(n.state))
        }
        if(this.searchForm.value.types.length) {
            notifications = notifications.filter(n => this.searchForm.value.types.some((t: string) => n.types.includes(t)))
        }

        this.notifications = [...notifications]
    }

    clearSelectedStates(stateName = '') {
        if(!stateName) {
            this.searchForm.controls['states'].setValue([]);
        } else {
            this.searchForm.controls['states'].setValue(this.searchForm.value.states.filter((s: string) => s !== stateName));
        }
        this.doSearch()
    }
    
    clearSelectedTypes(typeName = '') {
        if(!typeName) {
            this.searchForm.controls['types'].setValue([]);
        } else {
            this.searchForm.controls['types'].setValue(this.searchForm.value.types.filter((t: string) => t !== typeName));
        }
        this.doSearch()
    }
}
