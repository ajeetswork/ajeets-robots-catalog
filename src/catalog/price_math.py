from decimal import Decimal, ROUND_HALF_UP

def cents_from_dollars(value: float) -> int:
    """Convert a dollar amount to integer cents using currency rounding."""
    amount = Decimal(str(value)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    return int(amount * 100)
