import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReversePipe } from './reverse.pipe';

export const appConfig: ApplicationConfig = {
  providers: [
    ReversePipe,
    provideHttpClient(),
    importProvidersFrom(
      FormsModule,      
    ),
    provideRouter(routes)
  ]
};
