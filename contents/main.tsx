import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import type { PlasmoRender } from "plasmo"
import { createRoot } from "react-dom/client"

import { GojiCard } from "./card"

export const render: PlasmoRender<JSX.Element> = async ({
  anchor, // the observed anchor, OR document.body.
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

  const root = createRoot(rootElement) // Any root
  root.render(
    <CacheProvider value={cache}>
      <GojiCard />
    </CacheProvider>
  )
}
