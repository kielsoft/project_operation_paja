//import { Response } from 'express';
import { Component, OnInit, Optional } from '@angular/core';
import { CoreService } from '../../services/core.service';

@Component({
    selector: 'main.page.not-found',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class NotFoundPage implements OnInit {
    constructor(
        private coreService: CoreService
    ) {
    }

    ngOnInit(): void {
        this.coreService.setPageTitle('404 - Page Not Found');
    }

}
