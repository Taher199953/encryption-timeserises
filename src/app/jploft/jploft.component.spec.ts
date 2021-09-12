import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JploftComponent } from './jploft.component';

describe('JploftComponent', () => {
  let component: JploftComponent;
  let fixture: ComponentFixture<JploftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JploftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JploftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
