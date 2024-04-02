/**
 * Because of limitations with the zendesk API filtering, we cannot efficiently
 * fetch only the answers that we want (from one or more specific categories and
 * with a filtering flag).
 *
 * Instead we fetch every answsers at build time and store them in a local JSON file.
 * This JSON file is then imported in the Faq component which displays only the
 * answers from the wanted categories with whatever flag.
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')
require('dotenv').config()
const fs = require('fs').promises

// TODO: add the env variable everywhere it is needed, then remove the default url
const ZENDESK_API_URL =
  process.env.ZENDESK_API_URL ?? 'https://passculture.zendesk.com/api/v2'
const ZENDESK_AUTHORIZATION_TOKEN = process.env.ZENDESK_AUTHORIZATION_TOKEN

const getFaqQuestions = async () => {
  try {
    let headers = null

    if (ZENDESK_AUTHORIZATION_TOKEN) {
      headers = {
        Authorization: `Basic ${ZENDESK_AUTHORIZATION_TOKEN}`,
      }
    }

    // Fetch categories
    const categoryResponse = await fetch(
      `${ZENDESK_API_URL}/help_center/categories?per_page=100`,
      { headers }
    )
    const categoryResponseObject = await categoryResponse.json()
    const categoriesData = categoryResponseObject.categories

    const resultObject = {}

    for (const category of categoriesData) {
      const categoryId = category.id
      resultObject[categoryId] = []

      // Fetching FAQ data for each category
      let faqResponse = await fetch(
        `${ZENDESK_API_URL}/help_center/categories/${categoryId}/articles?per_page=100`,
        { headers }
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
              `${ZENDESK_API_URL}/help_center/categories/${categoryId}/articles?per_page=100&page=${index}`,
              {
                headers,
              }
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

    // Writing the JSON file to the specified location
    await fs.writeFile('./faqData.json', jsonData)

    /* eslint-disable-next-line no-console */
    console.log('JSON file built successfully!')
  } catch (error) {
    console.error('Error building JSON file:', error)
  }
}

getFaqQuestions()
