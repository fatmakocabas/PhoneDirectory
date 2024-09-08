import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSectionComponent } from './view-section.component';

describe('ViewPersonalComponent', () => {
  let component: ViewSectionComponent;
  let fixture: ComponentFixture<ViewSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
