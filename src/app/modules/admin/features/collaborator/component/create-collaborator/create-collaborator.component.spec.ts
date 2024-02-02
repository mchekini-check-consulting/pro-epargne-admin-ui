import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollaboratorComponent } from './create-collaborator.component';

describe('UpdateCollaboratorComponent', () => {
  let component: CreateCollaboratorComponent;
  let fixture: ComponentFixture<CreateCollaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCollaboratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
