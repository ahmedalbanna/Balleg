# Security Specification for "بلغ" Platform

## 1. Data Invariants
1. **Report Immutability**: A citizen who creates a report cannot edit it once it has been accepted by an operator (status changed from pending to anything else).
2. **Role Integrity**: A user's role and category must remain secure and cannot be arbitrarily self-assigned during registration or updated by the user themselves unless via secure paths.
3. **Department Isolation**: Specialists and Officials from one department cannot read or act upon reports assigned to another department.
4. **Verified Actions**: Actions such as resolving a report or claiming a task are only permitted by authenticated and verified actors with explicit clearance.
5. **Private Reporting**: Reports can only be accessed by their Creator, System Operators, Verifiers, and the Assigned Department Specialists. Other citizens cannot read them. Journalists and Neighborhood Councils have aggregate or anonymized access.
6. **Timeline Integrity**: The `createdAt` field across all collections is strictly immortal. Tracking timestamps such as `updatedAt` reflect request time.
7. **No Array/List Exhaustion**: Any array (e.g. `images`, `tags`) cannot exceed a strict length (e.g., 5 items for images, 10 for tags), preventing Denial of Wallet.
8. **Relational Constraints**: Sub-collections such as `comments` or `evaluations` cannot be created unless the parent `reports` document exists and the user is authorized.

## 2. The "Dirty Dozen" Payloads

1. **The Shape-Shifter** (Illegal Role Escalation):
   Trying to register or update user profile with `role: "admin"` or `isAdmin: true`.
2. **The Shadow Field** (Ghost Injection):
   Creating a report with all valid fields but appending `status: "resolved"` or `verified: true` during creation.
3. **The Data Miner** (Blanket Read):
   Sending a global `.get()` request on the `reports` or `users` collection without a `where("userId", "==", myUid)` filter.
4. **The Ghost Writer** (Spoofing Author ID):
   Trying to create a report setting `userId` to someone else's UID.
5. **The DoS Payload** (Resource Exhaustion):
   Uploading an array of 5,000 tags or a 2MB string for the `title` field.
6. **The Time Traveler** (Forged Timestamps):
   Setting `createdAt` to a historical date during document creation.
7. **The Status Jumper** (Invalid State Transition):
   Trying to update a report straight from `pending` to `resolved` without touching intermediary states, or bypassing validation constraints.
8. **The PII Scrapper** (Profile Scraping):
   Trying to query `users` collection to scrape phone numbers or emails of other citizens.
9. **The Orphan Maker** (Dangling Sub-collection):
   Creating a vote or comment on a `reportId` that does not exist.
10. **The Imposter Admin** (Unverified Admin Email):
    Logging in with an admin-like email but `email_verified` is false, trying to perform admin actions.
11. **The Infinite Liker** (Counter Tampering):
    Updating a counter field by setting it directly to 9999 instead of using `FieldValue.increment(1)`.
12. **The Terminal Resurrector** (Editing Finalized State):
    Trying to append a comment or change fields on a report whose status is `resolved`.

## 3. The Test Runner

See `firestore.rules.test.ts`.
