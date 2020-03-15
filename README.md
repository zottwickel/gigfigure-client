# Gig Figure Client

This repository is the client-side code for https://www.gigfigure.com. It was made in React.js and is hosted on Zeit. This is the source code for this app.

Tech used: HTML, JavaScript, CSS, React.js, VSCode, Zeit, create-react-app, Git, Chrome DevTools, Font Awesome.

## Features

Many of these features are contained within nested React routes that render these components in a logical way based on where the user will navigate. It renders differently depending on if users are logged in or not, and will load a specific page if the one of the URL routes is initially chosen.

### Landing page

This page contains a breif description of what this app is for, and how it is used. As with each page, there is a navigation section at the top to get around the app. Login/register buttons are at the top, and if users are logged in they can navigate to cases and contacts through the tabs. Otherwise, tabs will just navigate users to the login page.

### Login/Register pages

These pages contain forms for users to be able to log in or register using some credentials. Once submitted successfully, the form will navigate users to the landing page as a logged in user.

### Cases

This page is where a list of the user's cases will appear. A single case can be inspected by clicking on the link to that case, and a new case can be added with a form that comes up when you click "add new case". The new case will appear on the list upon form submission.

### Contacts

This page will have a list of each contact, along with their contact information. Near the top is a link to follow which will open a form to add a new contact. The only requirements are Name and Type. Other information is not needed for the creation of a contact.

### Footer

In the footer contains a simple set of icons directing the user back to my linkedin, portfolio, and github in order for them to explore my professional skills and experience.