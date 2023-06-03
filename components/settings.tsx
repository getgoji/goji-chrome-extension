import { TextField } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

import type { Category } from "./data"
import { categories } from "./data"

/**
 * Settings page component
 * @param props Category weights and setter
 * @returns Settings page component
 */
export const SettingsPage = (props: {
  categoryWeights: Map<Category, number>
  setCategoryWeights: (weights: Map<Category, number>) => void
}): JSX.Element => {
  return (
    <>
      <Grid container spacing={1}>
        {categories.map((category) => {
          return (
            <>
              <Grid xs={9} alignItems={"top"}>
                <p className="goji-card__category">{category}</p>
              </Grid>
              <Grid xs={3}>
                <TextField
                  type="number"
                  inputProps={{ min: 1 }}
                  defaultValue={1}
                  value={props.categoryWeights[category]}
                  onChange={(event) =>
                    props.setCategoryWeights({
                      ...props.categoryWeights,
                      [category]: event.target.value
                    })
                  }
                />
              </Grid>
            </>
          )
        })}
      </Grid>
    </>
  )
}
