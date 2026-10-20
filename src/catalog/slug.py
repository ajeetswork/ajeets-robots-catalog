import re

def product_slug(name: str) -> str:
    """Create the storefront path segment for a product."""
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
