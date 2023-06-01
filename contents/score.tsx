import type { BrandData } from "./data"

export const Score = (props: { data: BrandData }): JSX.Element => {
  return (
    <>
      <h1>Goji Score</h1>
      <h2>{props.data.name}</h2>
      <p>{props.data.categoryValues["Carbon Emissions"]}</p>
    </>
  )
}
