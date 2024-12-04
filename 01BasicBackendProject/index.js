const express = require('express')
require('dotenv').config();
const app = express()
const port = 5000

const githubData = {
  "login": "PrateekKumar15",
  "id": 168417667,
  "node_id": "U_kgDOCgnZgw",
  "avatar_url": "https://avatars.githubusercontent.com/u/168417667?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/PrateekKumar15",
  "html_url": "https://github.com/PrateekKumar15",
  "followers_url": "https://api.github.com/users/PrateekKumar15/followers",
  "following_url": "https://api.github.com/users/PrateekKumar15/following{/other_user}",
  "gists_url": "https://api.github.com/users/PrateekKumar15/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/PrateekKumar15/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/PrateekKumar15/subscriptions",
  "organizations_url": "https://api.github.com/users/PrateekKumar15/orgs",
  "repos_url": "https://api.github.com/users/PrateekKumar15/repos",
  "events_url": "https://api.github.com/users/PrateekKumar15/events{/privacy}",
  "received_events_url": "https://api.github.com/users/PrateekKumar15/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": "prateek_kumar_15",
  "company": null,
  "blog": "",
  "location": "Jhunjhunu, Rajasthan, India",
  "email": null,
  "hireable": null,
  "bio": null,
  "twitter_username": null,
  "public_repos": 6,
  "public_gists": 0,
  "followers": 8,
  "following": 13,
  "created_at": "2024-04-29T09:07:33Z",
  "updated_at": "2024-12-04T07:51:12Z"
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/twitter", (req,res)=>{
    res.send("Tanu")
})

app.get("/login", (req,res)=> {
    res.send("<h1>Please login at Chai aur Code</h1>")
})

app.get("/tanu", (req,res)=> {
    res.send("<h1> Bunny </h1>")
})

app.get("/github", (req,res)=> {
  res.json(githubData)
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port https://localhost:${process.env.PORT}`)
})