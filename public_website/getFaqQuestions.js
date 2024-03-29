const fetch = require('node-fetch')
require('dotenv').config()
const fs = require('fs').promises
const getFaqQuestions = async () => {
  try {
    let headers = null

    if (process.env.ZENDESK_AUTHORIZATION_TOKEN) {
      headers = {
        headers: {
          Authorization: `Basic ${process.env.ZENDESK_AUTHORIZATION_TOKEN}`,
        },
      }
    }
    // Fetching category data
    const categoryResponse = await fetch(
      'https://passculture.zendesk.com/api/v2/help_center/categories?per_page=100',
      headers
    )
    const categoryResponseObject = await categoryResponse.json()
    const categoriesData = categoryResponseObject.categories

    const resultObject = {}

    // Using for...of loop to iterate over categories
    for (const category of categoriesData) {
      const categoryId = category.id
      resultObject[categoryId] = []

      // Fetching FAQ data for each category
      let faqResponse = await fetch(
        `https://passculture.zendesk.com/api/v2/help_center/categories/${categoryId}/articles?per_page=100`,
        headers
      )
      let faqResponseObject = await faqResponse.json()

      resultObject[categoryId].push(...faqResponseObject.articles)

      // Fetching additional pages of FAQ data if available
      const pageCount = faqResponseObject.page_count
      if (pageCount > 1) {
        // Using Promise.all to fetch multiple pages concurrently
        const additionalPageFetches = []
        for (let index = 2; index <= pageCount; index++) {
          additionalPageFetches.push(
            fetch(
              `https://passculture.zendesk.com/api/v2/help_center/categories/${categoryId}/articles?per_page=100&page=${index}`
            ).then((response) => response.json())
          )
        }
        // Waiting for all additional page fetches to complete
        const additionalPageResults = await Promise.all(additionalPageFetches)
        // Merging results from additional pages into resultObject
        additionalPageResults.forEach((pageResult) => {
          resultObject[categoryId].push(...pageResult.articles)
        })
      }
    }

    // Building the content of the JSON file
    const jsonData = JSON.stringify(resultObject)

    // Determining the location of the JSON file in the static generation folder
    const filePath = './faqData.json' // or './static/data.json' depending on your setup

    // Writing the JSON file to the specified location
    await fs.writeFile(filePath, jsonData)

    console.log('JSON file built successfully!')
  } catch (error) {
    console.error('Error building JSON file:', error)
  }
}

// Calling the function to execute the script
getFaqQuestions()
