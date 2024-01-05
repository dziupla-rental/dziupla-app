import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarChipComponent } from './car-chip.component';

describe('CarChipComponent', () => {
  let component: CarChipComponent;
  let fixture: ComponentFixture<CarChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarChipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
