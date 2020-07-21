import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//angular material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from "@angular/material/checkbox"
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from './service/helper/jwt.retriever';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,



    //angular material
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatTableModule,
        MatDividerModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatOptionModule,
        MatCheckboxModule,
        CdkTableModule,


        //JWT
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
//            whitelistedDomains: ['localhost:3000'],
            //blacklist        
            //blacklistedRoutes: ['localhost:4000/api/auth']
          }
        })
  
  ],
  providers: [



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
