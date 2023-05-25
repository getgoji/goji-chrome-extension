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

let cssCache: EmotionCache
const App: FC<PlasmoCSUIProps> = () => {
  console.log("Call App");
  
  return (
    <CacheProvider value={cssCache}>
      <GojiCard />
    </CacheProvider>
  )
}

export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async ({
  createRootContainer // This creates the default root container
}) => {
  const rootContainer = await createRootContainer()
  const rootElement = document.createElement("div")
  const emotionRoot = document.createElement("style")
  rootContainer.appendChild(emotionRoot)
  rootContainer.appendChild(rootElement)

  const cache = createCache({
    key: "css",
    prepend: true,
    container: emotionRoot
  })

  console.log("Goji Custom render")

  const root = createRoot(rootElement) // Any root
  root.render(<App />)
}

export default App
