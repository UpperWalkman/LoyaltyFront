import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EbookService {

  private baseUrlConsoft: string = "";
  private baseNotificatios: string = "";
  private tokenAPI: string = "";

  constructor(private http: HttpClient) { }

  geteBooks(token: string, filters: string): Observable<any> {
    const body =
    {
      "action": "GETBOOKS",
      "filters": filters
    };

    const headers2 = new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token}`);

      let options = {  headers: headers2 }
      //console.log(options)

    return this.http.post<any>(`${this.baseUrlConsoft}/api/consoft`,body, options)

  }

  geteBookRows(token: string, id: number,fields: string): Observable<any> {
    const body =
    {
      "action": "GETBOOKROWS",
      "BookId": id,

      "filters": fields
  }

    const headers2 = new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token}`);

      let options = {  headers: headers2 }
    return this.http.post<any>(`${this.baseUrlConsoft}/api/consoft`,body, options)

  }

  getBookRows(token: string, id: number,fields: string, filter:string): Observable<any> {
    const body =
    {
      "action": "GETBOOKROWS",
      "BookId": id,
      "fields": fields,
      "filters": filter
  }
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token}`);
    let options = { headers: headers }
    let ll = this.baseNotificatios;
    return this.http.post<any>(`${this.baseUrlConsoft}/api/consoft`,body, options)
  }

  deleteUser(token: string, bookId: number, id: number){
    const body =
    {
      "action": "DELETEROW",
      "bookid": bookId,
      "Id": id,
    }

    const headers2 = new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token}`);

      let options = {  headers: headers2 }
    return this.http.post<any>(`${this.baseUrlConsoft}/api/consoft`,body, options)
  }

  newUser(token: string, bookId: number, bookrowinfo: any){
    const body =
    {
      "action": "CREATEROW",
      "bookid": bookId,
      "bookrowinfo": bookrowinfo
    }

    const headers2 = new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token}`);
      let options = {  headers: headers2 }
      return this.http.post<any>(`${this.baseUrlConsoft}/api/consoft`,body, options)
  }

  crateNewRow(token: string, bookId: number, bookrowinfo: any){
    const body =
    {
      "action": "CREATEROW",
      "bookid": bookId,
      "bookrowinfo": bookrowinfo
    }

    const headers2 = new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token}`);
      let options = {  headers: headers2 }
      return this.http.post<any>(`${this.baseUrlConsoft}/api/consoft`,body, options);

  }

  crateNewRowNameTable(token: string, Nametable: any, bookrowNameinfo: any[]){
    const body =
    {
      "action": "CREATEROWNAMETABLE",
      "Nametable": Nametable,
      "BookrowNameinfo": bookrowNameinfo
    }

    const headers2 = new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token}`);
      let options = {  headers: headers2 }
      return this.http.post<any>(`${this.baseUrlConsoft}/api/consoft`,body, options);

  }

  execNewLogo(token: string, dataImage: any){
    const body = {
      "action" : "EXECNEWLOGO",
      "b64Logo" : dataImage
    }

    const headers2 = new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token}`);
      let options = {  headers: headers2 }
      return this.http.post<any>(`${this.baseUrlConsoft}/api/consoft`,body, options);
  }

  async GetToken(): Promise<any> {
    const body =
    {
      "ProjectId": Number(sessionStorage.getItem('idProject')),
    }
    const headers2 = new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*')
      let options = {  headers: headers2 }
      return await this.http.post<any>(`${this.tokenAPI}`,body, options).toPromise();
  }

  async SendEmailAdvance(token: any, body: any): Promise<any> {
    const headers2 = new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token.token}`);
    let options = { headers: headers2 }
    console.log(this.baseNotificatios);
      return await this.http.post<any>(`${this.baseNotificatios}`,body, options).toPromise();
  }

  execEmail(token: string,emailSender: any){
    const body =
    {
      "action": "EXECEMAILS",
      "execemail": emailSender,
    }

    const headers2 = new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token}`);
      let options = {  headers: headers2 }
      return this.http.post<any>(`${this.baseUrlConsoft}/api/consoft`,body, options);
  }

  execEmailZIP(token: string,emailSender: any){
    const body =
    {
      "action": "EXECEMAILSZIP",
      "execemail": emailSender,
    }

    const headers2 = new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token}`);
      let options = {  headers: headers2 }
      return this.http.post<any>(`${this.baseUrlConsoft}/api/consoft`,body, options);
  }

  updateUser(token: string, bookId: number, bookrowinfo: any, id: string){
    const body =
    {
      "action": "UPDATEROW",
      "bookid": bookId,
      "bookrowinfo": bookrowinfo,
      "id": id
    }

    const headers2 = new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token}`);
      let options = {  headers: headers2 }
      return this.http.post<any>(`${this.baseUrlConsoft}/api/consoft`,body, options);
  }

  readRow(token: string, bookId: number, id: number, fields: string){
    const body =
    {
      "action": "READROW",
      "bookid": bookId,
      "Id": id,
      "fields": fields
    }



    const headers2 = new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token}`);

      let options = {  headers: headers2 }
    return this.http.post<any>(`${this.baseUrlConsoft}/api/consoft`,body, options)
  }

  getBitacora(token: string):any {
    const body =
    {
      "action": "GETBITACORA"
    }

    const headers2 = new HttpHeaders()
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .set('Access-Control-Allow-Methods', 'POST')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${token}`);

    let options = {  headers: headers2 }
    //console.log(options)

    let result: Observable<any>;
    result = this.http.post<any>(`${this.baseUrlConsoft}/api/consoft`,body, options);

    let result2 = result
      // .pipe(
      //   tap( (result) => console.log(result))
      // )
      .toPromise()
      .then((data: any) =>  data.result)
      .catch((e) => {
      throw e && e.error && e.error.Message;
      });
      //console.log('REsultReports',result2)
      console.log(result2);
      return result2

  }

  geteReports(token: string):any {
    const body =
    {
      "action": "GETREPORTS"
    }

    const headers2 = new HttpHeaders()
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .set('Access-Control-Allow-Methods', 'POST')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${token}`);

    let options = {  headers: headers2 }
    //console.log(options)

    let result: Observable<any>;
    result = this.http.post<any>(`${this.baseUrlConsoft}/api/consoft`,body, options);

    let result2 = result
      // .pipe(
      //   tap( (result) => console.log(result))
      // )
      .toPromise()
      .then((data: any) =>  data.result)
      .catch((e) => {
      throw e && e.error && e.error.Message;
      });
      //console.log('REsultReports',result2)
      return result2

  }

  getHelpId( id: number):  Observable<any> {
    const body =
    {
      "datetime": "20150101101112",
      "user": "user1",
      "usertoken": "61e7c7371170a948eaf63fa578840025",
      "action": "GETHELP",
      "idhelp": id,
      "valuefilter": ""
  }

    //console.log('body', JSON.stringify(body));
      return this.http.post<any>(`${this.baseUrlConsoft}/api/consoft`,body)
  }

  execReport(token: string, idReport: number, onlyData: boolean, questions: Question[] = []): Observable<any> {
    const body =
   {
      "action": "EXECREPORT",
     "idreport": idReport,
     "onlydata": onlyData,
     "questions": questions
   }

   const headers2 = new HttpHeaders()
     .set('Access-Control-Allow-Headers', 'Content-Type')
     .set('Access-Control-Allow-Methods', 'POST')
     .set('Access-Control-Allow-Origin', '*')
     .set('Authorization', `Bearer ${token}`);

     let options = {  headers: headers2 }

       return this.http.post<any>(`${this.baseUrlConsoft}/api/consoft`,body, options)
  }

 login(projectId : number, usuario: string, password: string): Observable<any> {
  const body =
  {
    "idProject": projectId,
    "user": usuario,
    "pass": password
    };
    //console.log(body)
  return this.http.post<any>(`${this.baseUrlConsoft}/api/UserConsoft/Login`,body)

}

logout(): Observable<any> {
  const body =
  {
    "idProject": 245706,
    "user": "NASA",
    "pass": "XXXX"
    };

    const headers2 = new HttpHeaders()
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .set('Access-Control-Allow-Methods', 'POST')
    .set('Access-Control-Allow-Origin', '*');

    let options = {  headers: headers2 }
    //console.log(options)

  return this.http.post<any>('http://192.168.0.175/api/UserConsoft/Logout',body)

}


reporte(token: string): Observable<any> {
  const body =
  {
    "action": "EXECREPORT",
    "idreport": 59,
    "questions":[
                {
                    "name": "@TICKET",
                    "value": "123456"
                }
            ]
}

//console.log('toket: ', token)
    const headers2 = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .set('Access-Control-Allow-Methods', 'POST')
    .set('Authorization', `Bearer ${token}`);

    let options = {  headers: headers2 }
    //console.log('option: ', options)

  return this.http.post<any>('http://192.168.0.175/api/consoft',body, options)

}



}
