const protectedUrl = process.env['NEXT_PUBLIC_STRAPI_API_URL']
const targetAudience =
  '427121120704-9qg83t8p14i1ncdbv8fi44nfu2te28dm.apps.googleusercontent.com'

import { GoogleAuth } from 'google-auth-library'

const auth = new GoogleAuth()

export async function googleIAPAuth() {
  try {
    // eslint-disable-next-line no-console
    console.info(
      `request IAP ${protectedUrl} with target audience ${targetAudience}`
    )
    const client = await auth.getIdTokenClient(targetAudience)
    const res = await client.request({ url: protectedUrl })

    return res.data
  } catch (error: unknown) {
    console.error('errorGoogleIAP ===>>>', error)
    process.exitCode = 1
  }
}
