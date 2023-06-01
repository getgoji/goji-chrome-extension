import { useStorage } from "@plasmohq/storage/hook"

import { categories } from "./data"
import type { Category } from "./data"

/**
 * Genereate default category weights map for storage
 * @returns Default category weights map
 */
const defaultCategoryWeightsMap = (): Map<Category, number> => {
  const map = new Map<Category, number>()
  categories.forEach((category) => {
    map.set(category, 1)
  })

  return map
}

/**
 * Settings page
 * @returns Settings page
 */
export const SettingsPage = () => {
  // Category storage
  const [categoryWeights, setCategoryWeights] = useStorage(
    "gojiCategoryWeights",
    (stored) => (stored === undefined ? defaultCategoryWeightsMap() : stored)
  )

  return (
    <>
      <h1>Settings</h1>

      <h2>Category Weights</h2>

      {categories.map((category) => {
        return (
          <>
            <label>{category}</label>
            <input
              type="number"
              min={1}
              max={6}
              value={categoryWeights[category]}
              onChange={(event) =>
                setCategoryWeights({
                  ...categoryWeights,
                  [category]: event.target.value
                })
              }
            />
            <br />
          </>
        )
      })}
    </>
  )
}
