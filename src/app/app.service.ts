import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  private releaseURL = 'https://api.github.com/repos/Sibiraj-S/ngx-editor/releases';

  constructor(private _http: HttpClient) { }

  getLatestRelease() {

    return this._http.get(this.releaseURL)
      .map((response) => {
        if (response && response['length'] !== 0) {
          return response[0];
        } else {
          return [];
        }
      });
  }


}
