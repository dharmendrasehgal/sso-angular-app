import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

import { authCodeFlowConfig } from './sso.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sso-angular-app';
  constructor(
    private oauthService: OAuthService) {
      this.configureSingleSignOn();
  }
  configureSingleSignOn(){
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    //this.oauthService.loadDiscoveryDocumentAndLogin(); //redirect on Login view
  }
  login() {
    this.oauthService.initLoginFlow();
  }
  logout() {
    this.oauthService.logOut();
  }

  get token() {
    let claims:any = this.oauthService.getIdentityClaims();
    return claims ? claims: null;
  }
}
