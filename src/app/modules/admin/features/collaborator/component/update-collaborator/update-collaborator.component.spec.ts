import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCollaboratorComponent } from './update-collaborator.component';

describe('UpdateCollaboratorComponent', () => {
  let component: UpdateCollaboratorComponent;
  let fixture: ComponentFixture<UpdateCollaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCollaboratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
