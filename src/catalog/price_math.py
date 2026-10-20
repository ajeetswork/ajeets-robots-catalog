import math

def cents_from_dollars(value: float) -> int:
    """Convert a non-negative catalog price to integer cents."""
    return math.floor((value * 100) + 0.5)
