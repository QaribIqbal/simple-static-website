import { FirebaseConfig } from './firebase.config.js';

describe('FirebaseConfig', () => {
  it('should create an instance', () => {
    expect(new FirebaseConfig()).toBeTruthy();
  });
});
