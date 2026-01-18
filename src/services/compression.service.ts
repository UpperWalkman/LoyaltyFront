import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompressionService {
  constructor(private httpClient: HttpClient) { }

  compressString(data: string) {
    //return compress(data);
  }
  compressObject(data: any) {
    //return compress(JSON.stringify(data));
  }

  decompressString(compressed: string): string | any {
    //return decompress(compressed);
  }
  decompressObject(compressed: string): any  {
    return null; //JSON.parse(decompress(compressed));
  }

  getFile(url: string): Observable<File> {
    const headers2 = new HttpHeaders()
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .set('Access-Control-Allow-Methods', 'POST')
    .set('Access-Control-Allow-Origin', '*');
   

    let options = {  headers: headers2}
    return this.httpClient.get<File>(url, options);
  }
}
