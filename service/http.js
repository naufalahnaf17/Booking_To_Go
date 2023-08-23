import * as React from 'react';
const apiUrl = 'https://parseapi.back4app.com/classes/hotel/bVonXoSUHK';

export async function GetDetailHotel() {
  return fetch(apiUrl, {
    method: 'GET',
    headers: {
      'X-Parse-Application-Id': 'Rr9ZKgR2t2f49g5ueLWriacIrvKy8Hwv7P87FSw3',
      'X-Parse-REST-API-Key': '4C6gLjrbNGoym5m9j9mFQiDzXO5eETLxjUjY9Fzy',
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      return error;
    });
}
