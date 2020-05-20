# YelpCamp

- Add Landing Page
- Add Campgrounds Page that lists all campgrounds

## Each Campground has:

- Name
- Image

## Layout and Basic Styling

- Create our header and footer partials
- add in Bootstrap

## Style the Campgrounds page

- Add a better header/tittle
- make campground display in a gris

## Style the Navbar and Form

- add a navbar to all templates
- style the new campground form

## Add Mongoose

- Install and configure mongoose
- Setup campground model
- Use campground model inside of our routes!

## Show Page

- Review the RESTful routes we've seem so far
- Add descriptors to our campground model
- Show db.collection.drop()
- add a show route/template

## Refactor Mongoose Code

- Create a model directory
- Use module.exports
- Require everything correctly

# Add Seeds File

- Add a seeds.js file
- Run the seeds file every time the server starts

# Add the Comment model!

- Make our errors go away!
- Display comments on campground show page

## Comment New/Create

- Discuss nested routes
- Add the comment new and create routes
- Add the new comment form

## Style Show Page

- Add sidebar to show page
- Display comments nicely

## Finish Styling Show Page

- Add public directory
- Add custom stylesheet

## Add User Model

- Install all packages needed for auth
- Define User Model

## Add Auth Register

- Configure Passport
- Add register routes
- Add register template

## Add Auth Login

- Add login routes
- add login template

## Add Auth Logout / Navbar

- Add Logout route
- Prevent User from adding a comment if not signed in
- Add links to navbar

## Auth Show/Hide Links

- Show/Hide auth links correctly

## Refactoring

- Create a .js file for every routing section (campgrounds, comments, index).
- Use Express router to reorganize all routes.
- router = express.Router({mergeParams: true}) tou merge all params passed through with the Router method.
- replace all app. with router.
- we have to require packages that the routes require as well as models needed.

## Restful Routes

| Name    | URL            | verb   | Description                            | Mongoose Method         |
| ------- | -------------- | ------ | -------------------------------------- | ----------------------- |
| INDEX   | /dogs          | GET    | Display a list of all dog              | dog.find()              |
| NEW     | /dogs/new      | GET    | Display form to make dog               | N/A                     |
| CREATE  | /dogs          | POST   | Add new dog, the redirect              | dog.create()            |
| SHOW    | /dogs/:id      | GET    | Shows info about one dog               | dog.findById()          |
| Edit    | /dogs/:id/edit | GET    | Show Edit form for one dog             | dog.findById()          |
| Update  | /dogs/:id      | PUT    | Update a particular dog, then redirect | dog.findByIdAndUpdate() |
| Destroy | /dogs/:id      | DELETE | Delete a particular dog                | dog.findByIdAndRemove() |

| Name   | URL                          | verb |
| ------ | ---------------------------- | ---- |
| NEW    | campgrounds/:id/comments/new | GET  |
| CREATE | campgrounds/:id/comments     | POST |
