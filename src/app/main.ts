import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

// doc : https://www.npmjs.com/package/debug
localStorage.debug='*'

platformBrowserDynamic().bootstrapModule(AppModule);
