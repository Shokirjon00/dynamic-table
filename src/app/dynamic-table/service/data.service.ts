import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DataRow } from "../interface/data";
import { environment } from "../../../environments/environment";
import { IHttpResponse } from "../../core/interface/http-response";

@Injectable()
export class DataService {
  private apiUrl = environment.apiUrl + 'data.json';

  constructor(private http: HttpClient) {
  }

  getData(): Observable<IHttpResponse<DataRow[]>> {
    return this.http.get<IHttpResponse<DataRow[]>>(this.apiUrl);
  }
}
