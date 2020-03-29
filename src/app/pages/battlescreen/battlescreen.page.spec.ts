import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BattlescreenPage } from './battlescreen.page';

describe('BattlescreenPage', () => {
  let component: BattlescreenPage;
  let fixture: ComponentFixture<BattlescreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlescreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BattlescreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
