import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/interfaces/Photo';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css'],
})
export class PhotoPreviewComponent implements OnInit {
  imageId: String = '';
  photoInfo: Photo = {
    _id: '',
    title: '',
    description: '',
    imagePath: '',
  };

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params) => (this.imageId = params['id'])
    );
    this.photoService.getPhotoById(this.imageId).subscribe(
      (res) => (this.photoInfo = res),
      (err) => console.log(err)
    );
  }

  editPhoto(
    title: HTMLInputElement,
    description: HTMLTextAreaElement
  ): boolean {
    this.photoService
      .editPhoto(this.imageId, title.value, description.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/photos']);
        },
        (err) => console.log(err)
      );
    return false;
  }

  deletePhoto(): boolean {
    this.photoService.deletePhoto(this.imageId).subscribe(
      (res) => {
        this.router.navigate(['/photos']);
      },
      (err) => console.log(err)
    );

    return false;
  }
}
