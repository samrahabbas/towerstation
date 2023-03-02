import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagementSearchComponent } from './doc-management-search.component';

describe('DocManagementSearchComponent', () => {
  let component: DocManagementSearchComponent;
  let fixture: ComponentFixture<DocManagementSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocManagementSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagementSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
