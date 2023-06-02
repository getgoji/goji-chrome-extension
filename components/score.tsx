import LinearProgress from "@mui/material/LinearProgress"
import Grid from "@mui/material/Unstable_Grid2"

import type { BrandData, Category } from "./data"
import { Stack } from "@mui/material"

/**
 * Extract category values and return them as components
 * @param categoryValues Category values
 * @returns Array of category value components
 */
const extractCategoryValues = (categoryValues: Map<Category, number>) => {
  const output = []
  categoryValues.forEach((value, category) => {
    output.push(
      <Grid container spacing={0}>
        <Grid xs={"auto"}>{category}</Grid>
        <Grid xs></Grid>
        <Grid xs={"auto"}>{value}%tile</Grid>
        <Grid xs={12}>
          <LinearProgress variant="determinate" value={value} />
        </Grid>
      </Grid>
    )
  })
  return output
}

export const Score = (props: { data: BrandData }): JSX.Element => {
  return (
    <>
      <h1>Goji Score</h1>
      <h2>{props.data.name}</h2>
      <Stack spacing={2}>
        {extractCategoryValues(props.data.categoryValues)}
      </Stack>
    </>
  )
}
