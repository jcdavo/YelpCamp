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

## Refactor Mongoose Code

- Create a model directory
- Use module.exports
- Require everything correctly
