import { flagEnabled } from "../flags";
import { CHECKOUT_FLAGS } from "./flags";

export function resolveCheckoutFlow() {
  if (flagEnabled(CHECKOUT_FLAGS.expressFlow)) {
    return "express-v2";
  }
  return "legacy-checkout";
}
