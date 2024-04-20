import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageDataService {
  private imageData: any[] = [];
  private currentIndex = 1;
  setImageData(data: any[]) {
    this.imageData = data;
  }

  getImageData() {
    return this.imageData;
  }

  getNextImageData() {
    this.currentIndex = (this.currentIndex + 1) % this.imageData.length;
    return this.imageData[this.currentIndex];
  }

  getPreviousImageData() {
    this.currentIndex = (this.currentIndex - 1 + this.imageData.length) % this.imageData.length;
    return this.imageData[this.currentIndex];
  }

  getCurrentIndex() {
    return this.currentIndex;
  }

  setCurrentIndex(index: number) {
    this.currentIndex = index;
  }
}
