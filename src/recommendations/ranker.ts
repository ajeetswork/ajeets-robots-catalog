import { variantFor } from "../flags";

export function recommendationRanker() {
  return variantFor("recommendation_ranker_v3") === "treatment" ? "ranker-v3" : "ranker-v2";
}
