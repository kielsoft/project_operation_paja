//import { Response } from 'express';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CoreService } from '../../services/core.service';

@Component({
    selector: 'main.page.notifications',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class AlertPage implements OnInit {
    searchForm = this.fb.group({
        title: ['', Validators.required],
        message: ['', Validators.required],
    });

    constructor(
        public coreService: CoreService,
        private fb: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.coreService.setPageTitle('Alert Broadcast');
    }
    
    sendAlert() {
        console.log(this.searchForm.valid, this.searchForm);
        if(!this.searchForm.valid){
            return alert("Please enter a valid alert data, all fields are required")
        }
        this.searchForm.reset();
        alert("Alert successfully broadcasted")
    }
}
