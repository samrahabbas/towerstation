import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth';
import { environment } from 'src/environments/environment';
import { FormsModule } from "@angular/forms";
// #fake-start#
import { FakeAPIService } from './_fake';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxMaskModule } from "ngx-mask";
import { FlatpickrModule } from "angularx-flatpickr";
import { ImagePreloadDirective } from "../core/directives/image-preload.directive";
// #fake-end#

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise(async (resolve) => {
      // const res = await authService.getUserByToken().toPromise();
      // console.log('res: ', res);
      // resolve(res)
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    FormsModule,
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgbModule,
    SweetAlert2Module.forRoot({
      dismissOnDestroy: true
    }),
    NgxSpinnerModule,
    FlatpickrModule.forRoot({
      monthSelectorType: "dropdown",
      convertModelValue: true
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
