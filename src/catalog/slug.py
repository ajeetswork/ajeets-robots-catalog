import re
import unicodedata

def _ascii_name(name: str) -> str:
    return unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode("ascii")

def product_slug(name: str) -> str:
    """Create the storefront path segment for a product."""
    return re.sub(r"[^a-z0-9]+", "-", _ascii_name(name).lower()).strip("-")
