import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';

import { Router } from '@angular/router';

interface HtmlInputEvent extends Event {
  target: EventTarget | null;
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css'],
})
export class PhotoFormComponent implements OnInit {
  photoSelected: string | ArrayBuffer | null = '';
  file: File;

  constructor(private photoService: PhotoService, private router: Router) {}

  ngOnInit() {}

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.file = <File>target.files[0];
        // image preview
        const reader = new FileReader();
        reader.onload = (e) => (this.photoSelected = reader.result);
        reader.readAsDataURL(this.file);
      }
    }
  }

  uploadPhoto(
    title: HTMLInputElement,
    description: HTMLTextAreaElement
  ): boolean {
    this.photoService
      .createPhoto(title.value, description.value, this.file)
      .subscribe(
        (res) => {
          this.router.navigate(['/photos']);
        },
        (err) => console.log(err)
      );
    return false;
  }
}
