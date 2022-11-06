REQUIREMENTS
- [x] Users should have a first_name, last_name, email, password,
- [x] A user should be able to sign up and sign in into the blog app
- [x] Use JWT as authentication strategy and expire the token after 1 hour
- [x] A blog can be in two states; draft and published
- [x] Logged in and not logged in users should be able to get a list of published blogs created
- [x] Logged in and not logged in users should be able to to get a published blog
- [x] Logged in users should be able to create a blog.
- [x] When a blog is created, it is in draft state
- [x] The owner of the blog should be able to update the state of the blog to published
- [x] The owner of a blog should be able to edit the blog in draft or published state
- [x] The owner of the blog should be able to delete the blog in draft or published state
- [x] The owner of the blog should be able to get a list of their blogs.
- [x] The endpoint should be paginated
- [x] It should be filterable by state
- [x] Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
- [x] The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated:
  - [x] default it to 20 blogs per page.
  - [x] It should also be searchable by author, title and tags.
  - [x] It should also be orderable by read_count, reading_time and timestamp
- [x] When a single blog is requested, the api should return the user information (the author) with the blog. The read_count of the blog too should be updated by 1
- [x] Come up with any algorithm for calculating the reading_time of the blog.
- [x] Write tests for all endpoints



Models
 User
| field     | data_type     | constraints      |
| --------- | ------------- | ---------------- |
| username  | string        | required, unique |
| firstName | string        | required         |
| lastName  | string        | required         |
| email     | string        | required, unique |
| password  | string        | required         |
| articles  | ref - Article |                  |


 Article
| field        | data_type  | constraints                                              |
| ------------ | ---------- | -------------------------------------------------------- |
| title        | string     | required, unique                                         |
| description  | string     | optional                                                 |
| author       | ref - User |                                                          |
| state        | string     | required, default: 'draft', enum: ['draft', 'published'] |
| read_count   | Number     | default: 0                                               |
| reading_time | String     |                                                          |
| tags         | array      | optional                                                 |
| body         | string     | required  
 
 
 
 Route: /api/signup
- Method: POST
Body

{
  "firstName": "Jb",
  "lastName": "ola",
  "email": "joe@mail.com",
  "password": "myPassword!"
}

Response

{
  "message": "signup successful",
  
   {
     "firstName": "Jb",
  "lastName": "ola",
  "email": "joe@mail.com",
  "password": "myPassword!"
    "_id": "6367c296ba7522bd8561e4f6"
  }
}

--- Logging in
- Route: /login
- Method: POST
 Body

{
  "username": "jb",
  "password": "myPassword!"
}
```
 Response

{
  "message": "Login successful'
  "token": 'hdgdfdgdehsgdhy'
  
   Create a Blog
- Route: /authors
- Method: POST
- Header
  - Authorization: Bearer {token}
 Body

{
  "title": "The Adventures of John",
  "tags": ["memoirs", "expose", "fun"],
  "description": "Fun times as Johnny",
  "body": "A very fun article that is long enough to be fun, and short enough to be ..fun!"
}
```
Response

{
  "status": "true",
  "message": "Article created"
   {
    "title": "The Adventures of John",
    "description": "Fun times as Johnny",
    "author": "6367c296ba7522bd8561e4f6",
    "state": "draft",
    "read_count": 0,
    "tags": ["memoirs", "expose", "fun"],
    "body": "A very fun article that is long enough to be fun, and short enough to be ..fun!",
    "_id": "6367cc2271c384885108032f",
    "timestamp": "2022-11-06T15:00:50.202Z",
    "reading_time": less than a min
  }
}

GetBlogbyid by authenticated user
- Route: /authors/id
- Method: POST
- Header
  - Authorization: Bearer {token}

}

}

GetAllpublished by any user
- Route: /getarticles
- Method: GET
- Header
  - Authorization: Bearer {token}

}
