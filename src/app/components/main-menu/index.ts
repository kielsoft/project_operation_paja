//import { Response } from 'express';
import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
    selector: 'main-menu',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class MainMenu implements OnInit {

    constructor(
        public coreService: CoreService,
    ) {
    }

    ngOnInit(): void {

    }

    logout() {
        localStorage.removeItem(this.coreService.loggedInKey);
        this.coreService.router.navigate(['/login'])
    }
}
