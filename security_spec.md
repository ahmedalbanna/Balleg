# Security Specification - Yemen Service Portal

## 1. Data Invariants

- **Users**:
  - A user cannot change their own `role` or `isActive` status.
  - A user can only edit their own profile (`displayName`, `profileImageUrl`, `lastLoginAt`).
  - `uid` must match `request.auth.uid`.
- **Audit Logs**:
  - Only signed-in users can create audit logs.
  - Audit logs are immutable (read-only for admins, create-only for users).
- **Roles**:
  - Read-only for everyone.
- **Departments**:
  - Read-only for signed-in users.
  - Immutable via client SDK.

## 2. The "Dirty Dozen" Payloads (Attacks)

1. **Identity Spoofing**: User A tries to update User B's profile.
2. **Privilege Escalation**: User A tries to update their own role to 'admin'.
3. **Ghost Field Injection**: User A tries to add `isVerified: true` to their user profile.
4. **Audit Log Tampering**: User A tries to delete an audit log.
5. **Audit Log Alteration**: User A tries to update an existing audit log.
6. **Orphaned User Creation**: User A tries to create a user profile for a different UID.
7. **Department Defacement**: User A tries to change the name of a department.
8. **Role Hijacking**: User A tries to create a new role.
9. **Verification Bypass**: User A tries to 'get' another user's verification record.
10. **Admin Area Access**: Non-admin user tries to read `audit_logs`.
11. **Malicious ID Injection**: Pushing a document with a 2KB junk string ID.
12. **Denial of Wallet**: Attempting to list all `users` (costly query).

## 3. Test Runner Concept

Files used for testing:
- `firestore.rules.test.ts` (using `@firebase/rules-unit-testing`)
