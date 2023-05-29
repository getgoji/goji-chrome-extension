import createCache from "@emotion/cache"
import type { EmotionCache } from "@emotion/react"
import { CacheProvider } from "@emotion/react"
import type {
  PlasmoCSUIJSXContainer,
  PlasmoCSUIProps,
  PlasmoRender
} from "plasmo"
import type { PlasmoCSConfig } from "plasmo"
import type { FC } from "react"
import { createRoot } from "react-dom/client"

import { GojiCard } from "./card"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"],
  all_frames: true
}

// let cssCache: EmotionCache
const App: FC<PlasmoCSUIProps> = () => {
  return <GojiCard />
}

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
    <CacheProvider value={cssCache}>
      <App />
    </CacheProvider>
  )
}

export default App
