// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// `.env.ts` is generated by the `npm run env` command
// `npm run env` exposes environment variables as JSON for any usage you might
// want, like displaying the version or getting extra config from your CI bot, etc.
// This is useful for granularity you might need beyond just the environment.
// Note that as usual, any environment variables you expose through it will end up in your
// bundle, and you should not use it for any sensitive information like passwords or keys.
import { env } from './.env';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBLHmb9k7z2AdpsTM62i8ir3NBTofLTiI8',
    authDomain: 'prueba-emt.firebaseapp.com',
    databaseURL: 'https://prueba-emt-default-rtdb.firebaseio.com',
    projectId: 'prueba-emt',
    storageBucket: 'prueba-emt.appspot.com',
    messagingSenderId: '1074642426331',
    appId: '1:1074642426331:web:870931d37324e0dd11effe',
    measurementId: 'G-XQTWPYVN6L',
  },
  version: env['npm_package_version'] + '-dev',
  serverUrl: '/api',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US', 'fr-FR'],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
