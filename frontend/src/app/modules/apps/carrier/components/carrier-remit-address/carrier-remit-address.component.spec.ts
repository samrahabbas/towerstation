import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierRemitAddressComponent } from './carrier-remit-address.component';

describe('CarrierRemitAddressComponent', () => {
  let component: CarrierRemitAddressComponent;
  let fixture: ComponentFixture<CarrierRemitAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrierRemitAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierRemitAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
