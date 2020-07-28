import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
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

import { environment } from 'src/environments/environment';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AboutProductComponent } from './pages/about-product/about-product.component';

import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { ngxUiLoader } from './shared/helpers/preloader-config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    DevicesComponent,
    VideosComponent,
    ShopComponent,
    BasketComponent,
    PaymentComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductsComponent,
    AdminSalesComponent,
    AdminOrdersComponent,
    AdminDevicesComponent,
    AdminVideosComponent,
    ProductComponent,
    AboutProductComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    NgxYoutubePlayerModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoader),
    NgxUiLoaderRouterModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
