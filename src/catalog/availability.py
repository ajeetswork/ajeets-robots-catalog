def is_orderable(stock_count: int) -> bool:
    """Return whether the storefront should offer Add to Cart."""
    return stock_count > 0
