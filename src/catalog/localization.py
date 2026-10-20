def display_name(translations: dict[str, str], locale: str) -> str:
    """Choose the requested product name with English fallback."""
    return translations.get(locale, translations.get("en", ""))
