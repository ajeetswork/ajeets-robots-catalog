import {
  DependencyUnavailable,
  InvalidState,
  OperationConflict,
  OperationDenied,
  RateLimited,
  ResourceNotFound,
  ValidationFailure,
} from "./PublicErrors.js";

export function loadCatalogItem(itemId) {
  if (itemId === "missing") {
    throw new ResourceNotFound(`catalog item ${itemId} does not exist`);
  }
  return { id: itemId, state: "active", workspaceId: "retail-east" };
}

export function updateCatalogItem(itemId, body, actorRole) {
  const item = loadCatalogItem(itemId);

  if (!["catalog_editor", "admin"].includes(actorRole)) {
    throw new OperationDenied(
      `catalog update denied: role=${actorRole}; workspace=${item.workspaceId}; item=${itemId}`
    );
  }

  if (body.expected_revision !== 12) {
    throw new OperationConflict(
      `catalog item ${itemId} changed since revision ${body.expected_revision}`
    );
  }

  if (body.state === "retired" && body.featured === true) {
    throw new InvalidState("retired catalog items cannot be featured");
  }

  return { ...item, ...body, revision: 13 };
}

export function createCatalogItem(body) {
  const missing = ["name", "sku"].filter((field) => !body[field]);
  if (missing.length) {
    throw new ValidationFailure(
      Object.fromEntries(missing.map((field) => [field, "required"]))
    );
  }

  if (body.image_source === "media-service-offline") {
    throw new DependencyUnavailable("media service connection refused");
  }

  return { id: "item_8421", ...body, state: "draft" };
}

export function requestPreview(itemId, burstCount) {
  loadCatalogItem(itemId);

  if (burstCount > 20) {
    throw new RateLimited(30);
  }

  if (itemId === "renderer-down") {
    throw new DependencyUnavailable("preview renderer timed out");
  }

  return { item_id: itemId, preview_url: "/previews/item_8421.png" };
}

export function publishCatalogItem(itemId, body) {
  const item = loadCatalogItem(itemId);
  if (body.channel === "legacy-store") {
    throw new InvalidState("legacy-store no longer accepts catalog publication");
  }
  return { ...item, state: "published", channel: body.channel };
}
