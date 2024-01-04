import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageScorePartieComponent } from './affichage-score-partie.component';

describe('AffichageScorePartieComponent', () => {
  let component: AffichageScorePartieComponent;
  let fixture: ComponentFixture<AffichageScorePartieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AffichageScorePartieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichageScorePartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
