import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreCoupsJeuComponent } from './nombre-coups-jeu.component';

describe('NombreCoupsJeuComponent', () => {
  let component: NombreCoupsJeuComponent;
  let fixture: ComponentFixture<NombreCoupsJeuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NombreCoupsJeuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NombreCoupsJeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
