import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortBoxComponent } from './sort-box.component';

describe('SortBoxComponent', () => {
  let component: SortBoxComponent;
  let fixture: ComponentFixture<SortBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
