import { Injectable } from '@angular/core';
import { gapi } from 'gapi-script';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private CLIENT_ID = 'YOUR_CLIENT_ID';
  private API_KEY = 'YOUR_API_KEY';
  private DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  private SCOPES = "https://www.googleapis.com/auth/calendar.events";

  constructor() { 
    gapi.load('client:auth2', this.initClient.bind(this));
  }

  private initClient() {
    gapi.client.init({
      apiKey: this.API_KEY,
      clientId: this.CLIENT_ID,
      discoveryDocs: this.DISCOVERY_DOCS,
      scope: this.SCOPES
    }).then(() => {
      gapi.auth2.getAuthInstance().signIn();
    });
  }
  public isSignedIn(): boolean {
    return gapi.auth2.getAuthInstance().isSignedIn.get();
  }

  public signOut(): void {
    gapi.auth2.getAuthInstance().signOut();
  }
}
