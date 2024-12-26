export default [
  {
     method: 'GET',
     path: '/preview',
     handler: 'sitemapController.preview',
     config: { auth: false, policies: [] },
   },
   {
     method: 'POST',
     path: '/generate',
     handler: 'sitemapController.generate',
     config: { auth: false, policies: [] },
   },
 ];
 