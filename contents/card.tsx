import Button from "@mui/material/Button"
import cssText from "data-text:./card.css"
import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo"

// export const getStyle: PlasmoGetStyle = () => {
//   const style = document.createElement("style")
//   style.textContent = cssText
//   return style
// }

export const GojiCard = () => {
  return (
    <div id="goji-card-host">
      <h1>Goji Card hi</h1>
      <Button variant="contained">Button</Button>
    </div>
  )
}