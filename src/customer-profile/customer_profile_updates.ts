import {
  DbClient,
  getCustomerProfile,
  incrementLoyaltyPoints,
  saveCustomerProfileIfVersion,
} from "./customer_profile_repository";

export class CustomerProfileNotFoundError extends Error {}
export class CustomerProfileConflictError extends Error {}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function updateContactEmail(
  db: DbClient,
  customerId: string,
  email: string
) {
  const current = await getCustomerProfile(db, customerId);
  if (!current) throw new CustomerProfileNotFoundError(customerId);

  const next = { ...current, email: normalizeEmail(email) };
  const saved = await saveCustomerProfileIfVersion(db, next, current.version);
  if (!saved) {
    throw new CustomerProfileConflictError(
      `Customer profile changed while contact email was being updated: ${customerId}`
    );
  }
  return saved;
}

export async function updateDeliveryInstructions(
  db: DbClient,
  customerId: string,
  deliveryInstructions: string | null
) {
  const current = await getCustomerProfile(db, customerId);
  if (!current) throw new CustomerProfileNotFoundError(customerId);

  const next = {
    ...current,
    deliveryInstructions: deliveryInstructions?.trim() || null,
  };
  const saved = await saveCustomerProfileIfVersion(db, next, current.version);
  if (!saved) {
    throw new CustomerProfileConflictError(
      `Customer profile changed while delivery instructions were being updated: ${customerId}`
    );
  }
  return saved;
}

export async function updateMarketingPreferences(
  db: DbClient,
  customerId: string,
  marketingEmailOptIn: boolean
) {
  const current = await getCustomerProfile(db, customerId);
  if (!current) throw new CustomerProfileNotFoundError(customerId);

  const next = { ...current, marketingEmailOptIn };
  const saved = await saveCustomerProfileIfVersion(db, next, current.version);

  if (!saved) {
    throw new CustomerProfileConflictError(
      `Customer profile changed while preferences were being updated: ${customerId}`
    );
  }
  return saved;
}

export async function awardLoyaltyPoints(
  db: DbClient,
  customerId: string,
  points: number
) {
  if (!Number.isInteger(points) || points <= 0 || points > 5000) {
    throw new Error("points must be a positive integer no greater than 5000");
  }

  const saved = await incrementLoyaltyPoints(db, customerId, points);
  if (!saved) throw new CustomerProfileNotFoundError(customerId);
  return saved;
}
