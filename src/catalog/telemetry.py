def catalog_view_events(product_id: str) -> list[dict[str, str]]:
    """Build analytics events for a product detail view."""
    event = {"name": "catalog_view", "product_id": product_id}
    return [event, event.copy()]
