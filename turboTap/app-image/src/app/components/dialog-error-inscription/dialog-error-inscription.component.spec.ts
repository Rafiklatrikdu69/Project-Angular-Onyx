import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogErrorInscriptionComponent } from './dialog-error-inscription.component';

describe('DialogErrorInscriptionComponent', () => {
  let component: DialogErrorInscriptionComponent;
  let fixture: ComponentFixture<DialogErrorInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogErrorInscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogErrorInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
