import { Link, Stack } from "@mui/material"
import LinearProgress from "@mui/material/LinearProgress"
import Grid from "@mui/material/Unstable_Grid2"

import { useStorage } from "@plasmohq/storage/hook"

import { Berry } from "./berry"
import { type BrandData, type Category } from "./data"

export const Score = (props: {
  data: BrandData
  categoryWeights: Map<Category, number>
}): JSX.Element => {
  // Compute weighted score
  let totalWeight = 0
  let score = 0
  props.data.categoryValues.forEach((value, category) => {
    let weight = parseFloat(props.categoryWeights[category])

    // Fix undefined
    if (isNaN(weight)) {
      weight = 1
    }

    totalWeight += weight
    score += weight * value
  })
  score /= totalWeight

  return (
    <>
      <Stack spacing={2}>
        {/* Goji Berries */}
        <Stack alignItems={"center"} spacing={0} sx={{ marginBottom: "-15pt" }}>
          <Stack direction={"row"} spacing={2}>
            {printBerries(score)}
          </Stack>
          <p className="goji-card__score-number">
            {((score / 100) * 5).toPrecision(2)} / 5
          </p>
        </Stack>

        {/* Score Breakdown */}
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
        <Grid xs={"auto"}>
          <b>{category}</b>
        </Grid>
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
      output.push(<Berry type="full" key={i} />)
      score -= 20
    } else if (score > 10) {
      output.push(<Berry type="half" key={i} />)
      score -= 10
    } else {
      output.push(<Berry type="sad" key={i} />)
    }
  }

  return output
}
