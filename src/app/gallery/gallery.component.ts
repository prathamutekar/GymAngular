import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from '../global.service';

declare var $: any; // Declare jQuery

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [MessageService]
})
export class GalleryComponent {
  galleryImages: any = [];

  constructor(private router: Router, private messageService: MessageService, private global: GlobalService) { }

  ngAfterViewInit() {
    this.getGalleryImages();
  }

  navigateTo(val: any) {
    this.router.navigate([val]);
    this.global.actTab = val;
    sessionStorage.setItem('userActiveTab', val)
  }

  getGalleryImages() {
    this.global.get(this.global.basepath + '/getGalleryImage').subscribe((res: any) => {
      this.galleryImages = res.data;

      // Initialize Magnific Popup after getting gallery images
      this.initializeMagnificPopup();
    });
  }

  initializeMagnificPopup() {
    $('#dynamicGallery').magnificPopup({
      delegate: 'a.image-popup',
      type: 'image',
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true,
        duration: 300,
        opener: function (element: any) {
          return element.find('i');
        }
      }
    });
  }
}
