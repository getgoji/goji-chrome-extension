import Button from "@mui/material/Button"
import cssText from "data-text:./card.css"
import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"],
  all_frames: true
}

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const GojiCard = () => {
  return (
    <div id="goji-card-host">
      <h1>Goji Card</h1>
      <Button variant="contained">Button</Button>
    </div>
  )
}

export default GojiCard
