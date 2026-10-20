import re
import unicodedata

def product_slug(name: str) -> str:
    """Create the storefront path segment for a product."""
    normalized = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode("ascii")
    return re.sub(r"[^a-z0-9]+", "-", normalized.lower()).strip("-")
