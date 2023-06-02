import type { Category } from "./data"
import { categories } from "./data"

/**
 * Settings page
 * @returns Settings page
 */
export const SettingsPage = (props: {
  categoryWeights: Map<Category, number>
  setCategoryWeights: (weights: Map<Category, number>) => void
}): JSX.Element => {
  return (
    <>
      <h1>Category Weights</h1>

      {categories.map((category) => {
        return (
          <>
            <label>{category}</label>
            <input
              type="number"
              min={1}
              max={6}
              value={props.categoryWeights[category]}
              onChange={(event) =>
                props.setCategoryWeights({
                  ...props.categoryWeights,
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
