import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPdfComponent } from './load-pdf.component';

describe('LoadPdfComponent', () => {
  let component: LoadPdfComponent;
  let fixture: ComponentFixture<LoadPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
