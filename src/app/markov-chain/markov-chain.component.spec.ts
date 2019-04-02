import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkovChainComponent } from './markov-chain.component';

describe('MarkovChainComponent', () => {
  let component: MarkovChainComponent;
  let fixture: ComponentFixture<MarkovChainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkovChainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkovChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
