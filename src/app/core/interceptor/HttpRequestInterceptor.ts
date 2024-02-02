import {HttpEvent, HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs';
import {OAuthService} from "angular-oauth2-oidc";
import {inject} from "@angular/core";

export const HttpRequestInterceptor: HttpInterceptorFn = (req, next) => {

    const oauthService = inject(OAuthService)


    const accessToken = oauthService.getAccessToken();

    if (accessToken != null) {
        req = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
        });
    }

    return next(req).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if (event.body && event.body.payload) {
                    event = event.clone({body: event.body.payload});
                } else {
                    event = event.clone({body: event.body});
                }
            }
            return event;
        })
    );
}
