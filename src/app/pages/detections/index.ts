//import { Response } from 'express';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CoreService, ICrimeNotification, IStateData } from '../../services/core.service';

@Component({
    selector: 'main.page.notifications',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class DetectionsPage implements OnInit {
    statesData: IStateData[] = [];
    searchForm = this.fb.group({
        states: [[]],
        dateFrom: [new Date(new Date().getTime()-(30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]],
        dateTo: [new Date().toISOString().split('T')[0]]
    });

    cdTotal = 0;
    gkTotal = 0;
    fsTotal = 0;

    constructor(
        public coreService: CoreService,
        private fb: FormBuilder,
    ) {

        console.log(this.searchForm.value)
    }

    ngOnInit(): void {
        this.coreService.setPageTitle('Detections');
        this.statesData = [...this.coreService.getStateDistributionData()];
    }

    doSearch() {
        this.cdTotal = 0;
        this.gkTotal = 0;
        this.fsTotal = 0;
        this.statesData.filter(s => this.searchForm.value.states.includes(s.state)).forEach(data => {
            this.cdTotal += data.cd;
            this.gkTotal += data.gk;
            this.fsTotal += data.fs;
        })
    }

    clearSelectedStates(stateName = '') {
        if(!stateName) {
            this.searchForm.controls['states'].setValue([]);
        } else {
            this.searchForm.controls['states'].setValue(this.searchForm.value.states.filter((s: string) => s !== stateName));
        }
        this.doSearch()
    }

    getStatisticPercentage(total: number) {
        return Math.round(((total*100/(this.cdTotal + this.gkTotal + this.fsTotal)) + Number.EPSILON) * 100) / 100
    }
    
}
