import { Link, Stack } from "@mui/material"
import LinearProgress from "@mui/material/LinearProgress"
import Grid from "@mui/material/Unstable_Grid2"

import { Berry } from "./berry"
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

/**
 * Print out berry icons for score
 * @param score Score to print
 * @returns Array of berry components
 */
const printBerries = (score: number) => {
  const output = []

  // Add 5 berries based on score
  for (let i = 0; i < 5; i++) {
    if (score > 20) {
      output.push(<Berry type="full" />)
      score -= 20
    } else if (score > 10) {
      output.push(<Berry type="half" />)
      score -= 10
    } else {
      output.push(<Berry type="sad" />)
    }
  }

  return output
}

export const Score = (props: { data: BrandData }): JSX.Element => {
  return (
    <>
      <h1>Goji Score</h1>
      <h2>{props.data.name}</h2>
      <Stack direction={"row"} spacing={2}>
        {printBerries(props.data.total)}
      </Stack>
      <Stack spacing={2}>
        {extractCategoryValues(props.data.categoryValues)}

        {/* More Info Link */}
        <Link
          href={props.data.moreInfo}
          target="_blank"
          rel="noopener noreferrer">
          More Info
        </Link>
      </Stack>
    </>
  )
}
