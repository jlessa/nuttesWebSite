import { Galeria } from './../../model/galeria';
import { IonicAppService } from './../../services/ionic-app.service';
import { User } from './../../model/user';
import { UserService } from './user.service';
import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';


@Component({
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

    private users: User[];
    private displayDialog: boolean;
    private userBlocked = false;
    private imageUpload = 'assets/images/image-clean.png';
    private fileName = '';
    private img: any;
    private userName = '';
    private userEmail = '';
    private userTelefone = '';
    private userSenha = '';
    private userDescricao = '';
    private galeriaDefault;
    private capaDefault;


    constructor(private userService: UserService, private ionicAppService: IonicAppService) { }

    ngOnInit() {
        this.getUser();
        this.displayDialog = false;
        this.galeriaDefault = "https://firebasestorage.googleapis.com/v0/b/ionic-app-b34ac.appspot.com/o/default%2Fgaleria.png?alt=media&token=ac8f5bcc-58cc-4ed3-9423-0f0baaff41cb"; 
        this.capaDefault = "https://firebasestorage.googleapis.com/v0/b/ionic-app-b34ac.appspot.com/o/default%2Fcapa.png?alt=media&token=6eb20179-296b-4882-98ea-7b47c82c82bf";
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

    openDialog() {
        this.displayDialog = true;
    }

    onDialogHide() {
        this.displayDialog = false;
    }

    onUpload() {
        // tslint:disable-next-line:prefer-const
        let newUser = new User(
            this.userEmail,
            this.userDescricao,
            this.imageUpload,
            this.userName,
            this.userTelefone,
            this.userBlocked,
            this.capaDefault);

        this.createUserDb(newUser);
        this.createUserStorage(newUser);
        this.createLogin(this.userEmail, this.userSenha);
        this.getUser();
        this.onDialogHide();
    }


    cancelUpload() {
        this.imageUpload = 'assets/images/image-clean.png';
    }

    fileLoad($event: any) {
        // tslint:disable-next-line:prefer-const
        let myReader: FileReader = new FileReader();
        // tslint:disable-next-line:prefer-const
        let file: File = $event.target.files[0];
        this.fileName = file.name;
        myReader.readAsDataURL(file);

        myReader.onload = (e: any) => {
            this.img = e.target.result;
            this.imageUpload = e.target.result;

        };
    }

    createLogin(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
                alert(`${error.message} Please Try Again!`);
            });
    }

    createUserDb(user: User) {
        let dbRef = firebase.database().ref('/');
        let newUser = dbRef.push();
        user.id = newUser.key;
        newUser.set({
            nome: user.nome,
            descricao: user.descricao,
            email: user.email,
            telefone: user.telefone,
            status_bloqueado: user.status_bloqueado,
            foto_profile: this.img.substring(23),
            foto_capa: user.foto_capa,
            posts: [],
            id: newUser.key
        });
        let dbRefUser = firebase.database().ref('/' + user.id + '/galeria');
        let newGaleria = dbRefUser.push();
        newGaleria.set({
            source: this.galeriaDefault,
            alt: 'default',
            title: '',
            id: newGaleria.key
        });
    }

    createUserStorage(user: User) {
        // tslint:disable-next-line:prefer-const
        let storageRef = firebase.storage().ref();
        storageRef.child(user.nome + '/' + this.fileName).putString(this.img.substring(23), 'base64')
            .then((snapshot) => {
                const url = snapshot.metadata.downloadURLs[0];
                user.foto_profile = url;
                this.updateUserFoto(user);
            })
            .catch((error) => {
                alert(`failed upload: ${error}`);
            });
    }

    updateUserFoto(user: User) {
        // tslint:disable-next-line:prefer-const
        let dbRef = firebase.database().ref('/').child(user.id)
            .update({
                foto_profile: user.foto_profile,
            });
    }
}
