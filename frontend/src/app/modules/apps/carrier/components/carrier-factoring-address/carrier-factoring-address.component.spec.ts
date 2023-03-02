import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierFactoringAddressComponent } from './carrier-factoring-address.component';

describe('CarrierFactoringAddressComponent', () => {
  let component: CarrierFactoringAddressComponent;
  let fixture: ComponentFixture<CarrierFactoringAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrierFactoringAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierFactoringAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
