import { TestBed } from '@angular/core/testing';

import { CephService } from './ceph.service';

describe('CephService', () => {
  let service: CephService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CephService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
