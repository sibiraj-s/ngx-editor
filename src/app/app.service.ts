import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  private releaseURL = 'https://api.github.com/repos/Sibiraj-S/ngx-editor/releases';

  /**
   *
   * @param _http Performs HTTP requests
   */
  constructor(private _http: HttpClient) { }

  getLatestRelease(): any {

    return this._http.get(this.releaseURL)
      .map((response: any) => {
        if (response && response['length'] !== 0) {
          return response;
        } else {
          return [];
        }
      });
  }

}
