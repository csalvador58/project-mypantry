export const paths = {
  index: '/',
  myPantry: {
    index: '/myPantry',
    add: '/myPantry/add',
    details: '/myPantry/:pantryId',
    edit: '/myPantry/:pantryId/edit'
  },
  auth: {
    jwt: {
      login: '/auth/jwt/login',
      register: '/auth/jwt/register'
    },
  },
  docs: 'https://mypantry.io',
  notAuthorized: '/401',
  notFound: '/404',
  serverError: '/500'
};
