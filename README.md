# Library Management

server >> storing certain book data >> user register >> subscriber

This is a book record management API server / backend for the library system

Fine system:
user: 28/11/2023 - 28/02/2024
01/03/2024 => 50/- per day

3 month (basic) - subscription
6 month (standard)
12 month (premium)

if the subscription type is standard && if the subscription date is 28/11/2023
=> then subscription valid till 28/05/2024

with subscription date >> if we miss renewal of book >> 50/- perday
subscription date is also been missed >> also ,issed the renewal >> 100 + (50/- per day)

-> book renewal date - 28/11/2023
-> want to renew on date - 01/12/2023 >> 50*2
-> subscription is also outdated then >> 100 + (50*2)

# Routes & Endpoints

## /users

POST: Create a new user
GET: Get all the user info here

## /users/{id}

GET: Get a user by id
PUT: update a user by their id
DELETE: Delete a user by id(check if he/she still have any issued book) && (is there any fine yo paid)

## /user/subscription-details/{id}

GET: get user subscription details >> date of subscription >> valid till >> is there any fine

## /books

GET: Get all the books
PUT: create/add a new book

## /books/{id}

GET: get a book by id
PUT: update a book by id

## /books/issued

GET: get all issued books

## /books/issued/withFine

GET: get all issued books with their fine

## Mongo DB

    >> setup, then installing module ( npm i mongoose )
    >>  MVC(modal view controller)
    >> M: Modal (it depicts the structure of MongoDB collections)
    >> V: View (write into frontend part (ReactJs))
    >> C: Controllers (Brain or logical part of routes [Backend])
          >> books.controller.js
          >> users.controller.js

    Schema >> attributes with data-types & conditions [ id: string ]
    Modals >> attributes with values [ id: 1 ]
