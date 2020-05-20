** Code showcase for Accolade **

This is a web that I was supposed to make for a family friend.

He didn't have big budget however I still wanted to deliver something.

I choose react since it was supposed to be eshop and the react flow would allow me to nicely change all data in real time.
Then I picked redux since it's eshot I needed to keep some data in the application (page, cart items, language, opened windows and such). The redux code isn't that nice and pretty since this was a really budget application.

I picked Sass for style sheets.. it's nice, modular, better syntax, more modern.. just makes more sense to me
Then I put there bootstrap it allowed me to quickly make layouts and I picked out error popups for the order form which would be kinda hard to program myself. (not hard but again, the budget and time limit)

For the backend I picked NodeJs with express.. no real reason I could use python or whatever else, I just prefer JS

The application scheme looks like this

app - nodeJs - sql

The backend alone doesn't do that much, it can redirect to pages, it handles some url requests and serves as middle man between the database and app. However I should mention that when I am sending order only the IDs of products, quantity and size gets posted to the backend and the backend calculates the price on it's own from it's own data. Sending final price from fron end would be very dangerous :) . I tried to keep it at least at some basic level of security but it's definetly not unhackable ^^

The database functions as a system for the website owner to change data as well everything from texts to products.
So the website owner can connect to the database and change all he needs.

The real website runs on ubuntu server on digital ocean, nginx, pm2 as a wrapper around the app to make sure that the server restarts itself if some error happened.

The url https://www.indickecukrarstvi.cz/en



PS This stripped down version is not buildable and not runable.. since I didn't make it as a docker I can only give a source code not a running project. It's just for code showcase..

~ Mika
