import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import Settings from "@mui/icons-material/Settings"
import Star from "@mui/icons-material/Star"
import { ScopedCssBaseline, Tab, Tabs } from "@mui/material"
import cssText from "data-text:./card.css"
import type {
  PlasmoCSConfig,
  PlasmoCSUIJSXContainer,
  PlasmoGetStyle,
  PlasmoRender
} from "plasmo"
import { type SyntheticEvent, useState } from "react"
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
  const [tab, setTab] = useState(0)

  return (
    <div id="goji-card-host">
      {tab === 0 && <div>Goji Score page!</div>}

      {tab === 1 && <div>Settings page!</div>}

      <Tabs
        value={tab}
        onChange={(_: SyntheticEvent, newValue: number) => setTab(newValue)}
        variant="fullWidth">
        <Tab icon={<Star />} label="Score" value={0} />
        <Tab icon={<Settings />} label="Settings" value={1} />
      </Tabs>
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
