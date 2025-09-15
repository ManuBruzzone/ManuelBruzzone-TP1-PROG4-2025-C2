import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Penales } from './penales';

describe('Penales', () => {
  let component: Penales;
  let fixture: ComponentFixture<Penales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Penales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Penales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
