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

## Users + Comments

- Associate users and comments.
- Save author's name to a comment automatically.

## Users + Campgrounds

- Prevent an unauthenticated user from creating a campground
- Save username+id to newly created campground

## Editing Campgrounds

- Add Method-Override
- Add Edit Route for Campgrounds
- Add link to Edit Page
- Add Update Route
- Fix \$set problem

## Deleting Campgrounds

- Add Destroy Route
- Add Delete Button

## Authorization

- User can only edit his/her campgrounds
- User can only delete his/her campgrounds
- Hide/Show edit and delete buttons

## Editing Comments

- Add Edit route
- Add Edit button
- Add Update route

## Deleting Comments

- Add destroy route
- Ass delete button

## Authorization to Comments

- User can only edit his/her comments
- User can only delete his/her comments
- Hide/Show edit and delete buttons

## Refactoring Middleware

- Create middleware dir with index.js (index is loaded by default when folder is required)
- Create an object {} and each middleware is declared as part of the object
- we have to require dependencies needed for the functions
- Require in routes .js the middleware file
- use middleware.nameOfMiddleware to call

# Adding in Flash

- Install and configure connect-flash
- Add bootstrap alerts to header

## RESTful Routes

| Name    | URL                   | verb   | Description                         | Mongoose Method                 |
| ------- | --------------------- | ------ | ----------------------------------- | ------------------------------- |
| INDEX   | /campgrounds          | GET    | Display a list of all campgrounds   | campgrounds.find()              |
| NEW     | /campgrounds/new      | GET    | Display form to make campgrounds    | N/A                             |
| CREATE  | /campgrounds          | POST   | Add new campgrounds, then redirect  | campgrounds.create()            |
| SHOW    | /campgrounds/:id      | GET    | Shows info about one campgrounds    | campgrounds.findById()          |
| Edit    | /campgrounds/:id/edit | GET    | Show Edit form for one campgrounds  | campgrounds.findById()          |
| Update  | /campgrounds/:id      | PUT    | Update a campgrounds, then redirect | campgrounds.findByIdAndUpdate() |
| Destroy | /campgrounds/:id      | DELETE | Delete a campgrounds                | campgrounds.findByIdAndRemove() |

| Name    | URL                                       | verb   | Mongoose Method              |
| ------- | ----------------------------------------- | ------ | ---------------------------- |
| NEW     | campgrounds/:id/comments/new              | GET    | N/A                          |
| CREATE  | campgrounds/:id/comments                  | POST   | comments.create()            |
| Edit    | campgrounds/:id/comments/:comment_id/edit | GET    | comments.findById()          |
| Update  | campgrounds/:id/comments/:comment_id      | PUT    | comments.findByIdAndUpdate() |
| Destroy | campgrounds/:id/comments/:comment_id      | DELETE | comments.findByIdAndRemove() |
