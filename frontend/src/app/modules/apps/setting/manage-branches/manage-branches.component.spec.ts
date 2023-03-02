import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBranchesComponent } from './manage-branches.component';

describe('ManageBranchesComponent', () => {
  let component: ManageBranchesComponent;
  let fixture: ComponentFixture<ManageBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBranchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
