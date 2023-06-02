import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import Settings from "@mui/icons-material/Settings"
import Star from "@mui/icons-material/Star"
import {
  BottomNavigation,
  BottomNavigationAction,
  ScopedCssBaseline
} from "@mui/material"
import cssText from "data-text:./card.css"
import type {
  PlasmoCSConfig,
  PlasmoCSUIJSXContainer,
  PlasmoGetStyle,
  PlasmoRender
} from "plasmo"
import { type SyntheticEvent, useState } from "react"
import { createRoot } from "react-dom/client"

import { brandData } from "~components/data"
import { Score } from "~components/score"
import { SettingsPage } from "~components/settings"

// The Card itself
const GojiCard = (): JSX.Element => {
  const [tab, setTab] = useState(0)

  return (
    <div className="goji-card__host">
      {/* Card Content */}
      <div className="goji-card__content">
        {/* Brand Goji Score */}
        {tab === 0 && <Score data={brandData()} />}

        {/* Settings */}
        {tab === 1 && <SettingsPage />}
      </div>

      <BottomNavigation
        showLabels
        className="goji-card__nav"
        value={tab}
        onChange={(_: SyntheticEvent, newValue: number) => setTab(newValue)}>
        <BottomNavigationAction icon={<Star />} label="Score" value={0} />
        <BottomNavigationAction
          icon={<Settings />}
          label="Settings"
          value={1}
        />
      </BottomNavigation>
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
  const cssCache = createCache({
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

// Inject card styles
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

// Plasmo configuration
export const config: PlasmoCSConfig = {
  matches: [
    "https://www.abercrombie.com/*",
    "https://www.adidas.com/*",
    "https://www.ae.com/*",
    "https://www.allbirds.com/*",
    "https://www.amazon.com/*",
    "https://www.urbanoutfitters.com/*",
    "https://us.boohoo.com/*",
    "https://www.boyish.com/*",
    "https://brothervellies.com/*",
    "https://us.burberry.com/*",
    "https://www.c-and-a.com/*",
    "https://christydawn.com/*",
    "https://www.eileenfisher.com/*",
    "https://www.everlane.com/*",
    "https://www.forever21.com/*",
    "https://www.fashionnova.com/*",
    "https://www.filippa-k.com/*",
    "https://www.gap.com/*",
    "https://girlfriend.com/*",
    "https://www.gucci.com/*",
    "https://www2.hm.com/en_us/*",
    "https://www.inditex.com/*",
    "https://www.jcrew.com/*",
    "https://www.jcpenney.com/*",
    "https://www.kohls.com/*",
    "https://www.levi.com/*",
    "https://shop.lululemon.com/*",
    "https://marahoffman.com/*",
    "https://www.marksandspencer.com/*",
    "https://www.missguided.co.uk/*",
    "https://www.mothercare.com.sg/*",
    "https://mudjeans.eu/*",
    "https://www.next.co.uk/*",
    "https://www.nike.com/*",
    "https://nisolo.com/*",
    "https://www.patagonia.com/*",
    "https://www.primark.com/*",
    "https://www.ralphlauren.com/*",
    "https://www.thereformation.com/*",
    "https://www.rossstores.com/*",
    "https://us.shein.com/*",
    "https://www.stellamccartney.com/*",
    "https://www.target.com/*",
    "https://www.childrensplace.com/*",
    "https://www.ewm.co.uk/*",
    "https://www.tjx.com/*",
    "https://www.underarmour.com/en-us/*",
    "https://www.uniqlo.com/us/en/*",
    "https://www.veja-store.com/*",
    "https://www.victoriassecret.com/*",
    "https://www.walmart.com/*",
    "https://www.zalando/*"
  ],
  all_frames: true
}

export default GojiCard
