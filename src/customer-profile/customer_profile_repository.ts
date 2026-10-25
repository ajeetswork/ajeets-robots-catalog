export type CustomerProfile = {
  customerId: string;
  email: string;
  deliveryInstructions: string | null;
  marketingEmailOptIn: boolean;
  loyaltyPoints: number;
  version: number;
  updatedAt: string;
};

export type DbClient = {
  query<T = unknown>(sql: string, params: unknown[]): Promise<{ rows: T[]; rowCount: number }>;
};

export async function getCustomerProfile(
  db: DbClient,
  customerId: string
): Promise<CustomerProfile | null> {
  const result = await db.query<CustomerProfile>(
    `SELECT customer_id AS "customerId",
            email,
            delivery_instructions AS "deliveryInstructions",
            marketing_email_opt_in AS "marketingEmailOptIn",
            loyalty_points AS "loyaltyPoints",
            version,
            updated_at AS "updatedAt"
       FROM customer_profiles
      WHERE customer_id = $1`,
    [customerId]
  );
  return result.rows[0] ?? null;
}

export async function saveCustomerProfile(
  db: DbClient,
  profile: CustomerProfile
): Promise<CustomerProfile> {
  const result = await db.query<CustomerProfile>(
    `UPDATE customer_profiles
        SET email = $2,
            delivery_instructions = $3,
            marketing_email_opt_in = $4,
            loyalty_points = $5,
            version = version + 1,
            updated_at = NOW()
      WHERE customer_id = $1
      RETURNING customer_id AS "customerId",
                email,
                delivery_instructions AS "deliveryInstructions",
                marketing_email_opt_in AS "marketingEmailOptIn",
                loyalty_points AS "loyaltyPoints",
                version,
                updated_at AS "updatedAt"`,
    [profile.customerId, profile.email, profile.deliveryInstructions, profile.marketingEmailOptIn, profile.loyaltyPoints]
  );
  return result.rows[0];
}

export async function saveCustomerProfileIfVersion(
  db: DbClient,
  profile: CustomerProfile,
  expectedVersion: number
): Promise<CustomerProfile | null> {
  const result = await db.query<CustomerProfile>(
    `UPDATE customer_profiles
        SET email = $2,
            delivery_instructions = $3,
            marketing_email_opt_in = $4,
            loyalty_points = $5,
            version = version + 1,
            updated_at = NOW()
      WHERE customer_id = $1
        AND version = $6
      RETURNING customer_id AS "customerId",
                email,
                delivery_instructions AS "deliveryInstructions",
                marketing_email_opt_in AS "marketingEmailOptIn",
                loyalty_points AS "loyaltyPoints",
                version,
                updated_at AS "updatedAt"`,
    [profile.customerId, profile.email, profile.deliveryInstructions, profile.marketingEmailOptIn, profile.loyaltyPoints, expectedVersion]
  );
  return result.rows[0] ?? null;
}

export async function incrementLoyaltyPoints(
  db: DbClient,
  customerId: string,
  points: number
): Promise<CustomerProfile | null> {
  const result = await db.query<CustomerProfile>(
    `UPDATE customer_profiles
        SET loyalty_points = loyalty_points + $2,
            version = version + 1,
            updated_at = NOW()
      WHERE customer_id = $1
      RETURNING customer_id AS "customerId",
                email,
                delivery_instructions AS "deliveryInstructions",
                marketing_email_opt_in AS "marketingEmailOptIn",
                loyalty_points AS "loyaltyPoints",
                version,
                updated_at AS "updatedAt"`,
    [customerId, points]
  );
  return result.rows[0] ?? null;
}
