import { TestBed } from '@angular/core/testing';

import { FamilyListService } from '../family-list.service';

describe('FamilyListService', () => {
  let service: FamilyListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
