def display_name(translations: dict[str, str], locale: str) -> str:
    """Choose the requested product name with English fallback."""
    localized = translations.get(locale)
    return localized if localized else translations.get("en", "")
