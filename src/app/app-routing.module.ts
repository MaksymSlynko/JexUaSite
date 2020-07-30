import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './pages/main/main.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { VideosComponent } from './pages/videos/videos.component';
import { ShopComponent } from './pages/shop/shop.component';
import { BasketComponent } from './pages/basket/basket.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProductComponent } from './pages/product/product.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminSalesComponent } from './admin/admin-sales/admin-sales.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminDevicesComponent } from './admin/admin-devices/admin-devices.component';
import { AdminVideosComponent } from './admin/admin-videos/admin-videos.component';
import { LoginComponent } from './login/login/login.component'
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main'},
  { path: 'main', component: MainComponent},
  { path: 'devices', component: DevicesComponent},
  { path: 'videos', component: VideosComponent},
  { path: 'shop', component: ShopComponent},
  { path: 'shop/:id', component: ProductComponent},
  { path: 'basket', component: BasketComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children:[
    {path: '', pathMatch: 'full', redirectTo: 'devices'},
    {path: 'devices', component: AdminDevicesComponent},
    {path: 'videos', component: AdminVideosComponent},
    {path: 'category', component: AdminCategoryComponent},
    {path: 'products', component: AdminProductsComponent},
    {path: 'sales', component: AdminSalesComponent},
    {path: 'orders', component: AdminOrdersComponent}
  ]},
  { path: '**', pathMatch: 'full', redirectTo: 'main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }