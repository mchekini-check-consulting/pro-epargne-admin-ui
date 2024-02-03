import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

import {HttpClient} from "@angular/common/http";
import {Contract} from "@/core/model/app-contract-plan";


@Injectable({
  providedIn: 'root'
})
export class ContractService {

    constructor(private http: HttpClient) {}



    getContractPlans(id: number): Observable<Contract> {
        const url = `/api/v1/contracts/${id}`;
        return this.http.get<Contract>(url);
    }

    createContract(contract:Object){
      const url = "/api/v1/contract"
      return this.http.post(url,contract);
    }
}
