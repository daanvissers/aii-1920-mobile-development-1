import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DexPage } from './dex.page';

describe('HomePage', () => {
  let component: DexPage;
  let fixture: ComponentFixture<DexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DexPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
