import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AppComponent } from './app.component';
import { frontComponents } from './front/front.pages';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { UIKitModule } from './ui-kit/ui-kit.module';
import { frontRoutes } from './front/front.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { userComponents } from './user/user.pages';


@NgModule({
  declarations: [
    AppComponent,
    ...frontComponents,
    ...userComponents
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UIKitModule,
    RouterModule.forRoot(frontRoutes),
    FormsModule,
    BrowserAnimationsModule, 
    SlickCarouselModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
