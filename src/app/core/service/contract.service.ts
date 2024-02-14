import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";

import {HttpClient} from "@angular/common/http";
import {Contract} from "@/core/model/app-contract-plan";


@Injectable({
  providedIn: 'root'
})
export class ContractService {

    constructor(private http: HttpClient) {}






    getContractPlans(): Observable<Contract> {
        const url = `/api/v1/contract`;
        return this.http.get<Contract>(url).pipe(
            catchError((error) => {

                return throwError(error);
            })
        );

    }

    createContract(contract:Object){
      const url = "/api/v1/contract"
      return this.http.post(url,contract);
    }

    updateContract(contract:Object){
      const url = "/api/v1/contract"
      return this.http.patch(url,contract);
    }


    transformEligibilityStringToInt(eligibility: string): string {
        if (eligibility === 'ONE_MONTH') {
            return "1";
        } else if (eligibility === 'TWO_MONTH') {
            return "2";
        }
        else if (eligibility === 'THREE_MONTH') {
            return "3";
        } else {
            return "0";
        }
    }
}
