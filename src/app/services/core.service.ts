import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

export interface ICrimeNotification {
    userId: string;
    coordinates: string;
    state: string;
    timestamp: Date;
    types: string[];
    description: string;
    detection: number;
}

export interface IStateData {
    state: string;
    cd: number;
    gk: number;
    fs: number;
    notifications: number;
    detections: number;
}

export interface ICriminal {
    name: string;
    gender: string;
    classification: string;
    yearOfBirth: number,
    captured: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class CoreService {
    loggedIn = false;
    lastUrl = '';

    notifications: ICrimeNotification[] = [];
    statesData: IStateData[] = [];
    criminals: ICriminal[] = [];

    crimeTypes =  "anti-social behavior,violent crime,criminal damage and arson,other theft,burglary,shoplifting,vehicle crime,public order,bicycle theft,drugs,theft from a person,other crime,robbery,possession of weapons".split(',').sort();
    crimeLocations = 'FCT, Abia, Adamawa, Akwa Ibom, Anambra, Bauchi, Bayelsa, Benue, Borno, Cross River, Delta, Ebonyi, Edo, Ekiti, Enugu, Gombe, Imo, Jigawa, Kaduna, Kano, Katsina, Kebbi, Kogi, Kwara, Lagos, Nasarawa, Niger, Ogun, Ondo, Osun, Oyo, Plateau, Rivers, Sokoto, Taraba, Yobe, Zamfara'.split(', ');
    criminalNames = "Abu, Sheqau, Spark, Killi, Sunday, Loma, Abdul, Ali, Smith, Kilo, Alimi, Aremo, Olusan, Obagboki, Agama, Atlas, Crocro, Adamu, Baba, Knife, Cutta, Gomma, Gadu, Gboyi, Clinton, Marvela, Uche, Akano".split(', ');
    loggedInKey = 'user_logged_in';

    constructor(
        public router: Router,
        private titleService: Title,
    ) {
        this.loggedIn = JSON.parse(localStorage.getItem(this.loggedInKey) || 'false') || false;
    }

    getRandomNumber(start = 1, end = 20): number {
        return Math.floor(Math.random() * (end - start)) + start;
    }

    setPageTitle(title: string) {
        this.titleService.setTitle(`${title.trim()} | Operation Paja`);
    }

    getNotifications() {
        
        if(this.notifications.length) return this.notifications;
        let now = new Date();

        const notifications: ICrimeNotification[] = [];

        for (let index = 0; index < 100; index++) {
            const shuffled = [...this.crimeTypes].sort(() => 0.5 - Math.random());
            const types = shuffled.slice(0, Math.floor(Math.random() * 2) + 1);
            const state = this.crimeLocations[Math.floor(Math.random()* this.crimeLocations.length)]
            const userId = ('000'+ (Math.floor(Math.random() * 999) + 10));
            notifications.push({
                userId: 'A'+ userId.substring(userId.length - 4),
                coordinates: '12.3717016,11.8668518',
                state,
                timestamp: new Date(now),
                types,
                description: `Reporting the following crime live from ${state} : ${types.join(', ')}`,
                detection: Math.floor(Math.random() * 2000) + 50,
            })
            
            const interval = Math.floor(Math.random() * 50) + 10;
            now = new Date(now.getTime() - (interval * 60 * 60 * 1000))
        }
        this.notifications = [...notifications];
        return this.notifications
    }

    getStateDistributionData() {
        if(this.statesData.length) return this.statesData;
        const data: IStateData[] = this.crimeLocations.map(l => {
            return {
                state: l,
                cd: this.getRandomNumber(3, 7),
                gk: this.getRandomNumber(40, 100),
                fs: this.getRandomNumber(200, 400),
                notifications: this.getRandomNumber(10, 20),
                detections: this.getRandomNumber(0, 2000)
            }
        })
        this.statesData = [...data];
        return this.statesData;
    }

    getCriminalList() {
        console.log(this.criminals)
        if(this.criminals.length) return this.criminals;

        const criminals: ICriminal[] = [];
        for (let index = 0; index < 100; index++) {
            const shuffled = [...this.criminalNames].sort(() => 0.5 - Math.random()).slice(0, 2).join(' ');
            criminals.push({
                name: [...this.criminalNames].sort(() => 0.5 - Math.random()).slice(0, 2).join(' '),
                gender: 'male',
                yearOfBirth: this.getRandomNumber(1940, 2010),
                classification: ['commander', 'gateKeeper', 'footSoldier'].sort(() => 0.5 - Math.random())[0],
                captured: [false, true, true, false, false].sort(() => 0.5 - Math.random())[0]
            })
        }

        this.criminals = [...criminals];
        return this.criminals;
    }
}