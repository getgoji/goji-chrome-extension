import LinearProgress from "@mui/material/LinearProgress"

import type { BrandData, Category } from "./data"

/**
 * Extract category values and return them as components
 * @param categoryValues Category values
 * @returns Array of category value components
 */
const extractCategoryValues = (categoryValues: Map<Category, number>) => {
  const output = []
  categoryValues.forEach((value, category) => {
    output.push(
      <>
        <p>
          {category}: {value}
        </p>
        <LinearProgress variant="determinate" value={value} />
      </>
    )
  })
  return output
}

export const Score = (props: { data: BrandData }): JSX.Element => {
  return (
    <>
      <h1>Goji Score</h1>
      <h2>{props.data.name}</h2>
      {extractCategoryValues(props.data.categoryValues)}
    </>
  )
}
