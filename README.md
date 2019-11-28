# Booked

Booked is a book app that allows users to search for books, add books to book lists, share book lists, and chat in online book clubs.

The frontend repo is deployed via Netlify, and the backend repo ([here](https://github.com/aresnik11/booked-backend)) is deployed via Heroku. Visit the site at [https://booked.netlify.com](https://booked.netlify.com).

[![Netlify Status](https://api.netlify.com/api/v1/badges/73e38dc7-1ee2-4cf8-baf2-52821da94970/deploy-status)](https://app.netlify.com/sites/booked/deploys)

![Booked Book Lists](https://user-images.githubusercontent.com/8761638/69598792-924b9180-0fd8-11ea-9500-6134ad2ead10.png)

![Booked Books](https://user-images.githubusercontent.com/8761638/69598794-94adeb80-0fd8-11ea-834f-5dd299b52a67.png)

## Demo

<a href="http://www.youtube.com/watch?feature=player_embedded&v=ufUUwquSsTg
" target="_blank"><img src="http://img.youtube.com/vi/ufUUwquSsTg/0.jpg" 
alt="Booked Demo" width="240" height="180" border="10" /></a>

You can watch a live demo of the app [here](https://youtu.be/ufUUwquSsTg) or visit the site at [https://booked.netlify.com](https://booked.netlify.com).

## Technology Used

* React
* Redux
* Websockets via ActionCable
* Google Books API
* Custom infinite scroll
* React Router
* Semantic UI
* Custom CSS
* JWT Authentication
* Ruby on Rails
* PostgreSQL database
* ActiveModel Serializer

The GitHub repo for the backend can be found [here](https://github.com/aresnik11/booked-backend).

## Features

Booked allows users to:

* Create an account
* Securely log in to an existing account
* Create a new book list
* Share a book list with another user
* Delete a book list
* Search for books by title, author, or genre - makes live calls to the Google Books API
* Automatically load next 40 books from search when user reaches the bottom of the page
* Click the back to top button to take the user back to the top of the search page
* Add a book to one of their book lists
* Remove a book from one of their book lists
* Create a new book club
* Chat with other users in real-time in a book club
* Delete a book club
* Securely log out
* Delete their account

## How To Use

Visit the site at [https://booked.netlify.com](https://booked.netlify.com).

To test on your own machine:
1. Visit the backend repo [here](https://github.com/aresnik11/booked-backend) and follow instructions on the README. The backend server should be started before the next steps are run.
2. Clone this repository
3. Update all fetch request urls within `actions` to the url where your rails server is running
4. In terminal run
```
npm install
npm start
```

## Enjoy!
