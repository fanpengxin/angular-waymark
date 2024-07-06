import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RatingComponent } from './rating/rating.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then((c) => c.AboutComponent),
    children: [
      { path: 'rating', outlet: 'rate', component: RatingComponent },
      { path: 'feedback', outlet: 'feed', component: FeedbackComponent },
    ],
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  { path: '**', component: HomeComponent },
];
