import { NgxGalleryImageSize } from 'ngx-gallery/lib';
import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
    templateUrl: './meninas.component.html',
    styleUrls: ['./meninas.component.css']
})

export class MeninasComponent implements OnInit {
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    isPerfilVisible = true;

    constructor() { }

    clickPerfilButton() {
        this.isPerfilVisible = this.isPerfilVisible === true ? false : true;
    }

    ngOnInit(): void {
        this.galleryOptions = [
            {
                width: '100%',
                height: '400px',
                thumbnailsColumns: 4,
                imagePercent: 100,
                imageSwipe: true,
                thumbnailsSwipe: true,
                imageAnimation: NgxGalleryAnimation.Slide,
                imageSize: NgxGalleryImageSize.Cover
            },
            // max-width 800
            {
                breakpoint: 800,
                width: '100%',
                height: '300px',
                imageSize: NgxGalleryImageSize.Contain,
                thumbnailsColumns: 3,
                fullWidth: true,
                imageSwipe: true,
                thumbnailsSwipe: true,
                imagePercent: 100,
                preview: false,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            // max-width 400
            {
                breakpoint: 400,
                width: '100%',
                height: '300px',
                imageSwipe: true,
                thumbnailsSwipe: true,
                thumbnailsColumns: 3,
                imageSize: NgxGalleryImageSize.Contain,
                fullWidth: true,
                preview: false,
                imagePercent: 100
            }
        ];

        this.galleryImages = [
            {
                small: '../../assets/images/girl/girl-01.jpg',
                medium: '../../assets/images/girl/girl-01.jpg',
                big: '../../assets/images/girl/girl-01.jpg'
            },
            {
                small: '../../assets/images/girl/girl-02.jpg',
                medium: '../../assets/images/girl/girl-02.jpg',
                big: '../../assets/images/girl/girl-02.jpg'
            },
            {
                small: '../../assets/images/girl/girl-03.jpg',
                medium: '../../assets/images/girl/girl-03.jpg',
                big: '../../assets/images/girl/girl-03.jpg'
            },
            {
                small: '../../assets/images/girl/girl-04.jpg',
                medium: '../../assets/images/girl/girl-04.jpg',
                big: '../../assets/images/girl/girl-04.jpg'
            },
            {
                small: '../../assets/images/girl/girl-05.jpg',
                medium: '../../assets/images/girl/girl-05.jpg',
                big: '../../assets/images/girl/girl-05.jpg'
            },
            {
                small: '../../assets/images/girl/girl-06.jpg',
                medium: '../../assets/images/girl/girl-06.jpg',
                big: '../../assets/images/girl/girl-06.jpg'
            },
            {
                small: '../../assets/images/girl/girl-07.jpg',
                medium: '../../assets/images/girl/girl-07.jpg',
                big: '../../assets/images/girl/girl-07.jpg'
            },
            {
                small: '../../assets/images/girl/girl-08.jpg',
                medium: '../../assets/images/girl/girl-08.jpg',
                big: '../../assets/images/girl/girl-08.jpg'
            },
            {
                small: '../../assets/images/girl/girl-09.jpg',
                medium: '../../assets/images/girl/girl-09.jpg',
                big: '../../assets/images/girl/girl-09.jpg'
            }
        ];

    }
}
