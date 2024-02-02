import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private httpClient:HttpClient) { }

  postContract(contract:Object){
    console.log(contract)
    return this.httpClient.post("api/common/contract",contract)
  }
}
