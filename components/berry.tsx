import fullGoji from "data-base64:~icons/goji.png"
import halfGoji from "data-base64:~icons/half-goji.png"
import sadGoji from "data-base64:~icons/sad-goji.png"

type BerryType = "sad" | "half" | "full"

/**
 * Convert berry type to image source
 * @param type Berry type
 * @returns Image source for the given type
 */
const typeToIcon = (type: BerryType) => {
  switch (type) {
    case "sad":
      return sadGoji
    case "half":
      return halfGoji
    case "full":
      return fullGoji
  }
}

/**
 * Create a berry icon of the given type for the Goji Score
 * @param props Berry type
 * @returns Berry icon for Goji Score
 */
export const Berry = (props: { type: BerryType }) => {
  return <img src={typeToIcon(props.type)} className="goji-card__score-icon" />
}
