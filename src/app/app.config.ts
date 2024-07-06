import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  DefaultUrlSerializer,
  RouterModule,
  UrlSerializer,
  UrlTree,
  provideRouter,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReversePipe } from './reverse.pipe';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  override parse(url: string): UrlTree {
    return super.parse(url.toLowerCase());
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    ReversePipe,
    provideHttpClient(),
    importProvidersFrom(FormsModule, RouterModule),
    provideRouter(routes),
  ],
};
