import { UrlTree ,DefaultUrlSerializer, UrlSerializer } from '@angular/router';

export class CleanUrlSerializer extends DefaultUrlSerializer { 
     
    public override parse(url: string): UrlTree {
        const newUrl = url.replace(/\(|\)/g,'');
        console.log('URL: ', newUrl)
        return super.parse(newUrl);
    }
}