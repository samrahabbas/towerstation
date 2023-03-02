import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierMailingAddressComponent } from './carrier-mailing-address.component';

describe('CarrierMailingAddressComponent', () => {
  let component: CarrierMailingAddressComponent;
  let fixture: ComponentFixture<CarrierMailingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrierMailingAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierMailingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
