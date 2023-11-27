import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPersonalComponent } from './view-personal.component';

describe('ViewPersonalComponent', () => {
  let component: ViewPersonalComponent;
  let fixture: ComponentFixture<ViewPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
