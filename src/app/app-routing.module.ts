import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/authguard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'users', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'products', loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'categories', loadChildren: () => import('./modules/category/category.module').then(m => m.CategoryModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'suppliers', loadChildren: () => import('./modules/supplier/supplier.module').then(m => m.SupplierModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'bonus-cards', loadChildren: () => import('./modules/bonus-card/bonus-card.module').then(m => m.BonusCardModule),
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
