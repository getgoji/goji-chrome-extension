import dataText from "data-text:~data.csv"

export const categories = [
  "Carbon Emissions",
  "Water Usage",
  "Ethical Sourcing",
  "Labor Rights",
  "Transparency & Policy",
  "Diversity, Equity, & Inclusion"
]
export type Category = (typeof categories)[number]

export interface BrandData {
  name: string
  categoryValues: Map<Category, number>
  total: number
  moreInfo: string
  url: string
}

export const brandData = (): BrandData => {
  let data: BrandData

  // Loop through each branch
  dataText.split("\n").every((line) => {
    // Extract the URL to test
    const urlPattern = line.substring(line.lastIndexOf(",") + 1)

    if (window.location.href.includes(urlPattern)) {
      // Extract the rest of the brand data
      const lineSplit = line.split(",")

      // Create the brand data (empty category values)
      data = {
        name: lineSplit[0],
        categoryValues: new Map<Category, number>(),
        total: parseFloat(lineSplit[7]),
        moreInfo: lineSplit[8],
        url: urlPattern
      }

      // Fill in the category values
      for (let i = 0; i < categories.length; i++) {
        // lineSplit[i + 1] = the value of the category
        data.categoryValues.set(categories[i], parseFloat(lineSplit[i + 1]))
      }

      // Stop searching
      return false
    }
    return true
  })

  return data
}
