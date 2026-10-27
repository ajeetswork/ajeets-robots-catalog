'use strict';
// Test store adapter used for catalog writes. Update semantics merge patches
// exactly as the production persistence adapter's partial-update interface does.
function makeStore(seed = {}) {
  const rows = Object.fromEntries(Object.entries(seed).map(([k, records]) =>
    [k, new Map(records.map(row => [String(row.id), { ...row }]))]));
  let sequence = 100;
  const table = name => (rows[name] ||= new Map());
  return {
    async get(name, id) {
      const row = table(name).get(String(id));
      if (!row) throw new Error('Not found');
      return { ...row };
    },
    async insert(name, input) {
      const row = { id: String(++sequence), ...input };
      table(name).set(row.id, row);
      return { ...row };
    },
    async update(name, id, patch) {
      const row = await this.get(name, id);
      const next = { ...row, ...patch };
      table(name).set(String(id), next);
      return { ...next };
    }
  };
}
const actor = { accountId: 'acct-1', userId: 'staff-1' };
const clock = () => '2026-10-20T12:00:00Z';
module.exports = { makeStore, actor, clock };
