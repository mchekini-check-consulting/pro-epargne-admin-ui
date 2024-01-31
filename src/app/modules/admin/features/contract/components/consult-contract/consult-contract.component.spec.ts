import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultContractComponent } from './consult-contract.component';

describe('ConsultContractComponent', () => {
  let component: ConsultContractComponent;
  let fixture: ComponentFixture<ConsultContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultContractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
