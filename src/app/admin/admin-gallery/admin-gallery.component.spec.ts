import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGalleryComponent } from './admin-gallery.component';

describe('AdminGalleryComponent', () => {
  let component: AdminGalleryComponent;
  let fixture: ComponentFixture<AdminGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGalleryComponent]
    });
    fixture = TestBed.createComponent(AdminGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
