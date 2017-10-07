import { IonicAppService } from './../../services/ionic-app.service';
import { User } from './../../model/user';
import { Car } from './car';
import { CarService } from './car-service';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import * as firebase from 'firebase';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'modelos-admin',
    templateUrl: './modelos-admin.component.html',
    styleUrls: ['./modelos-admin.component.css']
})
export class ModelosAdminComponent implements OnInit {

    private users: User[];
    private selectedUser: User;
    private displayDialog = false;

    constructor(private carService: CarService, private ionicAppService: IonicAppService) { }

    ngOnInit() {
        this.selectedUser = new User('', '', 'assets/images/image-clean.png', '', '');
        this.getUser();
    }

    editUser(user: User) {
        this.selectedUser = user;
        this.displayDialog = true;
    }
    onUpload() {
        this.updateUser(this.selectedUser);
        this.displayDialog = false;
        this.getUser();
    }
    getUser() {
        // tslint:disable-next-line:prefer-const
        let dbRef = firebase.database().ref('/');
        dbRef.once('value')
            .then((snapshot) => {
                // tslint:disable-next-line:prefer-const
                let tmp: string[] = snapshot.val();
                this.users = Object.keys(tmp).map(key => tmp[key]);
            });
    }

    onDialogHide() {
        this.displayDialog = false;
    }

    updateUser(user: User) {
        // tslint:disable-next-line:prefer-const
        firebase.database().ref('/').child(user.id).update(user);
    }

    onDeleteUser(user: User) {
        this.deleteUser(user);
    }

    deleteUser(user: User) {
        firebase.database().ref('/').child(user.id).remove();
        this.getUser();
    }
}
