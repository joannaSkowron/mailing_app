import { BASE_URL } from '../constants/URL';

export class FetchService {

  constructor() {
    this.controller = new AbortController();
  }

  useFetch(API, options, successCallback, failureCallback) {

    options.signal = this.controller.signal;
    API = BASE_URL + API;

    fetch(API, options)

      .then(response => {

        if (response.status === 200) {
          return response;

        } else if (response.status === 400) {
          alert("Request is not valid, Validation Error");
          throw Error('Error'); //użycie throw spowoduje, że obietnica uzyska stan rejected, wywoła się metoda catch

        } else if (response.status === 401) {
          alert("Access to this feature is only for logged users, Unauthorized");
          throw Error('Error');

        } else if (response.status === 403) {
          alert("Access to this feature has been forbidden, Forbidden");
          throw Error('Error');

        } else if (response.status === 404) {
          alert("Network location doesn't exist, Page Not Found");
          throw Error('Error');

        } else if (response.status === 500) {
          alert("Internal Server Error");
          throw Error('Error');
        }
      })

      .then(response => response.headers.get("Content-Length") > 0 ? response.json() : null)

      .then(data => {
        successCallback(data)
      })

      .catch(err => {
        failureCallback(err);
      })
  }


  abortFetch() {
    this.controller.abort();
    console.log(`Fetch aborted`);
  }
}