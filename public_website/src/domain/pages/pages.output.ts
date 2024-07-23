import { getPage as getPageService } from './pages.actions'

export const Pages = {
  getPage: (section: string, queryParams: string) =>
    getPageService(section, queryParams),
}
