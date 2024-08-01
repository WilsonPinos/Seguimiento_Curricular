import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = this.getBaseUrl();
  }

  private getBaseUrl(): string {
    const hostname = window.location.hostname;
    if (hostname === 'localhost') {
      return 'http://localhost:8080/api/files';
    } else {
      return 'http://192.168.0.110:8080/api/files'; // Reemplaza con la IP adecuada si es necesario
    }
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(`${this.baseUrl}/upload`, formData).pipe(
      catchError(error => {
        if (error.status === 409) {
          return throwError(() => new Error('File with the same name already exists.'));
        }
        return throwError(() => new Error('Error uploading file.'));
      })
    );
  }

  downloadFile(fileName: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${fileName}`, { responseType: 'blob' });
  }

  saveFile(blob: Blob, fileName: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  checkFileExists(fileName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/${fileName}`);
  }

  deleteFile(fileName: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${fileName}`).pipe(
      catchError(error => {
        return throwError(() => new Error('Error deleting file.'));
      })
    );
  }
}
