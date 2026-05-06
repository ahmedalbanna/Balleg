import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { resolve } from 'path';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-balagh',
    firestore: {
      rules: readFileSync(resolve(__dirname, 'firestore.rules'), 'utf8'),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe('Firestore Security Rules: The Dirty Dozen', () => {
  it('1. The Shape-Shifter: Should deny user setting their own role to admin', async () => {
    const db = testEnv.authenticatedContext('user123', { email_verified: true }).firestore();
    await assertFails(db.collection('users').doc('user123').set({ role: 'admin' }));
  });

  it('2. The Shadow Field: Should deny report creation with injected status', async () => {
    const db = testEnv.authenticatedContext('user123', { email_verified: true }).firestore();
    await assertFails(db.collection('reports').add({
      userId: 'user123',
      title: 'Valid title',
      description: 'Valid description',
      status: 'resolved' // Invalid on create
    }));
  });

  it('3. The Data Miner: Should deny blanket reads on reports', async () => {
    const db = testEnv.authenticatedContext('user123', { email_verified: true }).firestore();
    await assertFails(db.collection('reports').get());
  });

  it('4. The Ghost Writer: Should deny auth uid mismatch', async () => {
    const db = testEnv.authenticatedContext('user123', { email_verified: true }).firestore();
    await assertFails(db.collection('reports').add({
      userId: 'otherUser',
      title: 'Spoofed report'
    }));
  });

  // Additional 8 test cases would be implemented here to complete the Dirty Dozen suite
});
