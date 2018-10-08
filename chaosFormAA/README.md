This code is being used to replace the current chaos code which is for childrenofchaosaa.org.

The current code for chaos is basic HTML and CSS with enough javascript to pull the API for GoogleMaps.
Otherwise, a very generic static site.

With this new code, I am will be able to automate events for the group.

1) User will submit event request per a form on website.
    a) event will be sent to dB, run by Mongo using Node, Express.js and Mongoose.js
    b) event is automatically saved as as a false value in order for it not be displayed on site
2) Webmaster will receive an email indicating event approval is needed
    a) using nodemailer,js, webmaster receives an email with link taking them to log in page for event approval
    b) once logged on, WM has option to edit and approve event or:
        a) event is sent back to dB and updated to true approved status
    c) WM has option to NOT approve event which is saved as false approved status
        a) event will be deleted from dB
        a) WM contacts event submitter and asks that they re-submit event with suggested changes.
3) User will see his event on website automatically
    a) every time the home page for childrenofchaosaa.org is loaded, it will automatically pull true approved status events from dB and display in chronological order.
    b) site only displays events which have a true approved status AND date has not passed, therefore keeping events current and very littel work for anyone who has no coding experience.