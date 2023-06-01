import dataText from "data-text:~data.csv"

export const categories = ["Carbon Emissions", "Water Usage", "Ethical Sourcing", "Labor Rights", "Transparency & Policy", "Diversity, Equity, & Inclusion"]
export type Category = typeof categories[number]

interface BrandData {
  name: string
  carbonEmissions: number
  waterUsage: number
  ethicalSourcing: number
  laborRights: number
  transparency: number
  dei: number
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

      data = {
        name: lineSplit[0],
        carbonEmissions: parseFloat(lineSplit[1]),
        waterUsage: parseFloat(lineSplit[2]),
        ethicalSourcing: parseFloat(lineSplit[3]),
        laborRights: parseFloat(lineSplit[4]),
        transparency: parseFloat(lineSplit[5]),
        dei: parseFloat(lineSplit[6]),
        total: parseFloat(lineSplit[7]),
        moreInfo: lineSplit[8],
        url: urlPattern
      }

      // Stop searching
      return false
    }
    return true
  })

  return data
}
