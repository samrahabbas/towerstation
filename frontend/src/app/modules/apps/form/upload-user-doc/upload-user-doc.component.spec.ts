import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadUserDocComponent } from './upload-user-doc.component';

describe('UploadUserDocComponent', () => {
  let component: UploadUserDocComponent;
  let fixture: ComponentFixture<UploadUserDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadUserDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadUserDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
