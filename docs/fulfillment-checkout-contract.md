# Fulfillment and checkout behavior

The storefront and warehouse helpers in `src/fulfillment/checkout-rules.js` follow these behaviors.

## Education pricing
Verified school customers receive a 10% merchandise discount when the merchandise subtotal is at least $500.00. The discount is zero below the threshold and for non-school customers. Shipping is not discounted.

Example: a verified school order with a $500.00 merchandise subtotal receives a $50.00 merchandise discount.

## Carrier selection
Standard-size orders in delivery zones 1 through 3 use `ground`. Standard-size orders outside zones 1 through 3 use `regional`. Any oversized order uses `freight` regardless of zone.

## Pickup codes
Pickup codes are six numeric characters. Order number 42 is represented as `000042`; leading zeroes are part of the code.

## Dispatch-plan smoke coverage
The lightweight dispatch-plan check in CI is intentionally a smoke test. It only needs to establish that a dispatch plan can be produced for a normal order and remains associated with the source order. Detailed carrier and signature rules are protected separately.

## Checkout total
Checkout total equals merchandise subtotal minus the applicable merchandise discount plus a flat $15.00 shipping charge.

Example: $500.00 subtotal minus a $50.00 education discount plus $15.00 shipping produces a $465.00 checkout total.

## Alternative recommendations
When an item is unavailable, the storefront may return up to three in-stock, non-discontinued alternatives from the same category. Shorter lead time is generally preferred, but merchandising may override tie ordering and there is no fixed contract for items with equal lead time.
