//import { Response } from 'express';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CoreService } from '../../services/core.service';

@Component({
    selector: 'main.page.notifications',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class LoginPage implements OnInit {
    searchForm = this.fb.group({
        username: ['',[Validators.required, Validators.pattern('admin')]],
        password: ['', [Validators.required, Validators.pattern('admin123')]],
    });

    constructor(
        public coreService: CoreService,
        private fb: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.coreService.setPageTitle('Login');
    }
    
    login() {
        console.log(this.searchForm.valid, this.searchForm);
        if(!this.searchForm.valid){
            return alert("Invalid username and password")
        }
        localStorage.setItem(this.coreService.loggedInKey, JSON.stringify(true));
        this.coreService.loggedIn = true;
        this.coreService.router.navigate([this.coreService.lastUrl || '/'])
    }
}
