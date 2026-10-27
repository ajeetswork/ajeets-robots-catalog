import { toPublicError } from "./PublicErrorMapper.js";
import {
  createCatalogItem,
  loadCatalogItem,
  publishCatalogItem,
  requestPreview,
  updateCatalogItem,
} from "./CatalogOperationsService.js";

function run(handler, successStatus = 200) {
  try {
    return [successStatus, handler()];
  } catch (error) {
    return toPublicError(error);
  }
}

export function getCatalogItem(itemId) {
  return run(() => loadCatalogItem(itemId));
}

export function postCatalogItem(body) {
  return run(() => createCatalogItem(body), 201);
}

export function patchCatalogItem(itemId, body, actorRole) {
  return run(() => updateCatalogItem(itemId, body, actorRole));
}

export function postCatalogPreview(itemId, burstCount) {
  return run(() => requestPreview(itemId, burstCount), 202);
}

export function postCatalogPublication(itemId, body) {
  return run(() => publishCatalogItem(itemId, body), 202);
}
