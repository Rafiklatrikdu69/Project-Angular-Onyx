import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageScoreComponent } from './affichage-score.component';

describe('AffichageScoreComponent', () => {
  let component: AffichageScoreComponent;
  let fixture: ComponentFixture<AffichageScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AffichageScoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichageScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
