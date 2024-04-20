import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileserviceService {

  // Define a function to convert a Blob to a File
  blobToFile(blob: Blob, fileName: string): File {
    // Create a new File instance
    const file = new File([blob], fileName, {type: blob.type});

    return file;
  }
}
