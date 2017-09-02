import { User } from './../model/user';
import { IonicPost } from './../model/ionic-post';
import { IonicAppService } from '../services/ionic-app.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-app-posts',
  templateUrl: './app-posts.component.html',
  styleUrls: ['./app-posts.component.css']
})
export class AppPostsComponent implements OnInit {

  posts: IonicPost[] = [];
  users: User[] = [];
  user: User;
  constructor(private ionicAppService: IonicAppService) { }


  ngOnInit() {
    this.getPosts('profile');
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
        this.user = this.users[0];
      });
  }

  getPosts(user: string) {
    // tslint:disable-next-line:prefer-const
    let dbRef = firebase.database().ref(user + '/posts/');
    dbRef.once('value')
      .then((snapshot) => {
        // tslint:disable-next-line:prefer-const
        let tmp: string[] = snapshot.val();
        this.posts = Object.keys(tmp).map(key => tmp[key]);
        this.posts = this.posts.filter((post: IonicPost) => post.foto_postagem !== '');
      });
  }

  onScroll() {
    //console.log('scrolled!!');
  }

}
