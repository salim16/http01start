import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoggingInterceptorService } from './logging.-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    // Auth Service (Interceptors service are provided in a special way)
    // Also Interceptiors defined here runs in the same order provided here
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true // it tells angular that there can be other interceptors and this one also 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true // it tells angular that there can be other interceptors and this one also 
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
