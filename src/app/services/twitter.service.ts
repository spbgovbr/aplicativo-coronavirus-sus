import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TWITTER_TOKEN, URL_CDN } from '../../environments/environment';

@Injectable()
export class TwitterService {

  constructor(
    private http: HttpClient
  ) {}

  getAuth() {
    return new Promise<any>((resolve) => {
      let apiHeader = new HttpHeaders();
      apiHeader = apiHeader.append('Authorization', TWITTER_TOKEN);
      apiHeader = apiHeader.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
      apiHeader = apiHeader.append('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
      apiHeader = apiHeader.append('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Origin, Accept');
      this.http.post(encodeURI(URL_CDN + '/twitter'), {},
        {headers: apiHeader, withCredentials: false}).toPromise().then((response: any) => {
        resolve(response);
      });
    });
  }

  async getTwittes(last?): Promise<any> {
    const auth = await this.getAuth();
    const tweets = [];
    return new Promise<any>((resolve) => {
      let next = '';
      if (last) {
        next = `max_id=${last}&`;
      }
      let apiHeader = new HttpHeaders();
      apiHeader = apiHeader.append('Authorization', 'Bearer ' + auth.access_token);
      apiHeader = apiHeader.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
      apiHeader = apiHeader.append('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
      apiHeader = apiHeader.append('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Origin, Accept');
      this.http.get(encodeURI(URL_CDN + '/twitter?' + next + 'screen_name=minsaude&count=10&tweet_mode=extended&exclude_replies=' +
          'true&include_rts=1'),
        {headers: apiHeader, withCredentials: false}).toPromise().then((response: any) => {
          for (const status of response) {
            if (status.retweeted_status || status.in_reply_to_user_id || status.in_reply_to_status_id) {
              continue;
            }
            let medias = '';
            if (status.entities.media) {
              medias = status.entities.media[0].media_url;
            }
            // tslint:disable-next-line:variable-name
            let expanded_url = '';
            if (status.entities.media) {
              expanded_url = status.entities.media[0].expanded_url;
            } else {
              expanded_url = 'https://twitter.com/minsaude';
            }
            const date = new Date(status.created_at);
            const dateFormat = `${this.pad(date.getDate(),2)}/${this.pad(date.getMonth() + 1, 2)}/${date.getFullYear()}`;
            const hourFormat = `${this.pad(date.getHours(), 2)}:${this.pad(date.getMinutes(), 2)}`;
            const tweet = {
              id: status.id,
              horario: hourFormat,
              imagem: medias,
              data: dateFormat,
              texto: status.full_text,
              expanded_url
            };
            tweets.push(tweet);
          }
          resolve(tweets);
      }).catch(() => {
        resolve([]);
      });
    });
  }

  pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }
}

