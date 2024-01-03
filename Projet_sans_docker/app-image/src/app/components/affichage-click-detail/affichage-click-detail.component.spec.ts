import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageClickDetailComponent } from './affichage-click-detail.component';

describe('AffichageClickDetailComponent', () => {
  let component: AffichageClickDetailComponent;
  let fixture: ComponentFixture<AffichageClickDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AffichageClickDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichageClickDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
