import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import {
  GoogleSigninButtonModule,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    SocialLoginModule,
    GoogleSigninButtonModule
    
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('238281219198-p4k3irijfgr88moosrssde184i8jk9rj.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },]

})
export class AuthModule { }