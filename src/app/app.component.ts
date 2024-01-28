import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from "angular-oauth2-oidc";
import { authCodeFlowConfig } from "./auth.config";
import { UserService } from "./core/user/user.service";

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    standalone : true,
    imports    : [RouterOutlet],
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(private oauthService : OAuthService, private userService: UserService)
    {
        this.oauthService.configure(authCodeFlowConfig);
        this.oauthService.loadDiscoveryDocumentAndLogin().then(resp => {
            // @ts-ignore
            this.name = this.oauthService.getIdentityClaims()['name'];
            // @ts-ignore
            this.email = this.oauthService.getIdentityClaims()['email'];
            // @ts-ignore
            this.userService._user.next({name : this.name, email : this.email});
        })
    }
}
