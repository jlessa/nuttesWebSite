import { IonicAppService } from './../../services/ionic-app.service';
import { User } from './../../model/user';
import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';


@Component({
    templateUrl: './galeria.component.html',
    styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

    private users: User[];
    private filteredUsers: any[];
    private selectedUser: User;
    private userFilter = '';
    private userBlocked = false;
    private imageUploadGaleria;
    private imageUploadProfile;
    private imageUploadCapa;
    private imageDefault;
    private profileFileName = '';
    private capaFileName = '';
    private galeriaFileName = '';
    private images: any;
    private innerWidth: any;
    private uploadType: string[];
    private showPanel;



    constructor(private ionicAppService: IonicAppService) {
        this.innerWidth = (window.screen.width) - 90;
    }

    ngOnInit() {
        this.getUser();
        this.showPanel = false;
        this.imageDefault = 'assets/images/image-clean.png'
        this.imageUploadGaleria = this.imageUploadProfile = this.imageUploadCapa = this.imageDefault;
        this.selectedUser = new User('', '', this.imageDefault, '', '');
        this.selectedUser.foto_capa = this.imageDefault;
        this.uploadType = ['galeria', 'profile', 'capa'];
        this.images = [];

    }

    clearAutoComplete() {
        this.showPanel = false;
        this.selectedUser = new User('', '', this.imageDefault, '', '');
    }

    getUser() {
        let dbRef = firebase.database().ref('/');
        dbRef.once('value')
            .then((snapshot) => {
                let tmp: string[] = snapshot.val();
                this.users = Object.keys(tmp).map(key => tmp[key]);
            });
    }

    filterNames(event) {
        this.getUser();
        this.filteredUsers = [];
        for (let i = 0; i < this.users.length; i++) {
            let userName = this.users[i].nome;
            if (userName.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
                this.filteredUsers.push(this.users[i]);
            }
        }
    }

    handleDropdownClick(event) {
        this.filteredUsers = [];
        this.showPanel = true;
        this.userFilter = event.nome;
        this.selectedUser = event;
        this.imageUploadProfile = this.selectedUser.foto_profile;
        this.imageUploadCapa = this.selectedUser.foto_capa;
        this.images = Object.keys(this.selectedUser.galeria).map(key => this.selectedUser.galeria[key]);
        this.selectedUser.foto_capa == null
            ? this.selectedUser.foto_capa = this.imageDefault
            : this.selectedUser.foto_capa = this.selectedUser.foto_capa;
    }

    cancelUpload(tipo) {
        switch (tipo) {
            case this.uploadType[0]:
                this.galeriaFileName = '';
                if (this.imageUploadGaleria != this.imageDefault)
                    this.imageUploadGaleria = this.imageDefault;
                break;
            case this.uploadType[1]:
                this.profileFileName = '';
                this.selectedUser.foto_profile == this.imageDefault
                    ? this.imageUploadProfile = this.imageDefault
                    : this.imageUploadProfile = this.selectedUser.foto_profile;
                break;
            case this.uploadType[2]:
                this.capaFileName = '';
                this.selectedUser.foto_capa == this.imageDefault
                    ? this.imageUploadCapa = this.imageDefault
                    : this.imageUploadCapa = this.selectedUser.foto_capa;
                break;
        }

    }

    fileLoad($event: any, tipo) {
        let myReader: FileReader = new FileReader();
        let file: File = $event.target.files[0];
        myReader.readAsDataURL(file);

        switch (tipo) {
            case this.uploadType[0]:
                this.galeriaFileName = file.name;
                myReader.onload = (e: any) => {
                    this.imageUploadGaleria = e.target.result;
                };
                break;
            case this.uploadType[1]:
                this.profileFileName = file.name;
                myReader.onload = (e: any) => {
                    this.imageUploadProfile = e.target.result;
                };
                break;
            case this.uploadType[2]:
                this.capaFileName = file.name;
                myReader.onload = (e: any) => {
                    this.imageUploadCapa = e.target.result;
                };
                break;
        }


    }

    resetFiles() {
        this.galeriaFileName = this.profileFileName = this.capaFileName = '';
        this.filteredUsers = [];
        this.userFilter = '';
        this.showPanel = false;
    }

    removeDefaultGaleria(user: User) {
        Object.keys(this.selectedUser.galeria).map(key => this.selectedUser.galeria[key]).forEach(item => {
            if (item.alt == 'default') {
                this.deleteGaleria(item);
            }
        });

    }

    deleteGaleria(galeria: any) {
        firebase.database().ref().child('/' + this.selectedUser.id + '/galeria/' + galeria.id).remove();
        this.getUser();
    }

    deleteStorage(user: User, tipo: string, fileName: string) {
        let storageRef = firebase.storage().ref();
        storageRef.child(user.nome + '/' + tipo + '/' + fileName).delete();
    }

    addFotoGaleria() {
        this.addImageGaleriaStorage(this.selectedUser, this.galeriaFileName, this.imageUploadGaleria);
        this.imageUploadGaleria = this.imageDefault;
        this.resetFiles();
    }

    updateImageProfile() {
        this.updateProfileImageStorage(this.selectedUser, this.profileFileName, this.imageUploadProfile);
        this.resetFiles();
    }

    updateImageCapa() {
        this.updateCapaImageStorage(this.selectedUser, this.capaFileName, this.imageUploadCapa);
        this.resetFiles();
    }

    addImageGaleriaStorage(user: User, fileName, file) {
        let storageRef = firebase.storage().ref();

        storageRef.child(user.nome + '/galeria/' + fileName).putString(file.substring(23), 'base64')
            .then((snapshot) => {
                let url = snapshot.metadata.downloadURLs[0];
                this.addFotoGaleriaDb(user, url);
                this.removeDefaultGaleria(user);
            })
            .catch((error) => {
                alert(`failed upload: ${error}`);
            });
    }

    updateProfileImageStorage(user: User, fileName, file) {
        let storageRef = firebase.storage().ref();

        storageRef.child(user.nome + '/profile/' + fileName).putString(file.substring(23), 'base64')
            .then((snapshot) => {
                let url = snapshot.metadata.downloadURLs[0];
                this.updateUserFoto(this.selectedUser, url);
            })
            .catch((error) => {
                alert(`failed upload: ${error}`);
            });
    }

    updateCapaImageStorage(user: User, fileName, file) {
        let storageRef = firebase.storage().ref();

        storageRef.child(user.nome + '/capa/' + fileName).putString(file.substring(23), 'base64')
            .then((snapshot) => {
                let url = snapshot.metadata.downloadURLs[0];
                this.updateUserCapa(this.selectedUser, url);
            })
            .catch((error) => {
                alert(`failed upload: ${error}`);
            });
    }

    addFotoGaleriaDb(user: User, url) {
        let dbRefUser = firebase.database().ref('/' + user.id + '/galeria');
        let newGaleria = dbRefUser.push();
        newGaleria.set({
            source: url,
            alt: '',
            title: '',
            id: newGaleria.key
        });
        this.images = Object.keys(this.selectedUser.galeria).map(key => this.selectedUser.galeria[key]);
    }


    updateUserFoto(user: User, url) {
        let dbRef = firebase.database().ref('/').child(user.id)
            .update({
                foto_profile: url,
            });
    }


    updateUserCapa(user: User, url) {
        let dbRef = firebase.database().ref('/').child(user.id)
            .update({
                foto_capa: url
            });
    }
}
