import createCache from "@emotion/cache"
import { CacheProvider, ThemeProvider } from "@emotion/react"
import { ScopedCssBaseline } from "@mui/material"
import Button from "@mui/material/Button"
import cssText from "data-text:./card.css"
import type {
  PlasmoCSConfig,
  PlasmoCSUIJSXContainer,
  PlasmoGetStyle,
  PlasmoRender
} from "plasmo"
import { createRoot } from "react-dom/client"

// Plasmo configuration
export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"],
  all_frames: true
}

// Inject card styles
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

// The Card itself
const GojiCard = (): JSX.Element => {
  return (
    <div id="goji-card-host">
      <h1>Goji Card hi</h1>
      <Button variant="contained">Button</Button>
    </div>
  )
}

// Custom render with CSS cache
export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async ({
  anchor,
  createRootContainer
}) => {
  // Create default root container
  const rootContainer = await createRootContainer(anchor)

  // Create root and style root
  const rootElement = document.createElement("div")
  const emotionRoot = document.createElement("style")
  rootContainer.appendChild(emotionRoot)
  rootContainer.appendChild(rootElement)

  // Create CSS cache
  let cssCache = createCache({
    key: "css",
    prepend: true,
    container: emotionRoot
  })

  // Render
  const root = createRoot(rootElement) // Any root
  root.render(
    <ScopedCssBaseline>
      <CacheProvider value={cssCache}>
        <GojiCard />
      </CacheProvider>
    </ScopedCssBaseline>
  )
}

export default GojiCard
