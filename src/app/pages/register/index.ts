//import { Response } from 'express';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CoreService } from '../../services/core.service';

@Component({
    selector: 'main.page.notifications',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class RegisterPage implements OnInit {
    searchForm = this.fb.group({
        name: ['', Validators.required],
        gender: ['male', Validators.required],
        yearOfBirth: ['', [Validators.required, Validators.min(1900), Validators.max(2020)]],
        classification: ['commander', Validators.required],
        captured: ['0', Validators.required],
        description: ['', Validators.required],
    });

    constructor(
        public coreService: CoreService,
        private fb: FormBuilder,
    ) {

        console.log(this.searchForm.value)
    }

    ngOnInit(): void {
        this.coreService.setPageTitle('Criminal List');
    }
    
    addCriminal() {
        console.log(this.searchForm.valid, this.searchForm);
        if(!this.searchForm.valid){
            return alert("Please enter a valid criminal data, all fields are required")
        }
        this.searchForm.reset();
        alert("Criminal record successfully saved")
    }
}
