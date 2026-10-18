// AUTO-GENERATED from api/openapi.yaml.
// Do not edit directly. Regenerate using the catalog codegen configuration.

export class CatalogClient {
  constructor(private readonly baseUrl: string) {}

  async getProduct(id: string): Promise<unknown> {
    const response = await fetch(`${this.baseUrl}/products/${encodeURIComponent(id)}`);
    return response.json();
  }
}
