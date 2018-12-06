This web site was created to replace a commercial site for Spingfield Villas Aprtments in Lockhart, Texas. The apartment complex is comprised of two communities, both which are effected by federal and local equal housing rights. After partnering with the owners, I was able to take information from existing website and add CSS and Bootstrap (along with some basic JavaScript and jQuery) to enhance the first site from a basic drag and drop build-your-own site, to a colorful interactive site for current and prosepctive residents.

index.html - HOME page
    This was my first attempt to create a professional website using Bootstrap. Color palette was chosen based on initial picture of photos of the property that included the welcome to community sign.
        1) I redesigned the nav bar using Bootsrap so that site would be more fluid on smaller devices and yet still allow user interaction as if they were on a larger device.
        2) I was also able to play with Google fonts which allowed me to come up with a more readable and professional font - this was something I had been exposed to in class but never used on my own.
        3) This was also the first time I had to learn to embed a YouTube video

photos.html - PHOTOS page
    Concept was to take photos from inital site by downloading directly from current site and then saving for later use.
        1) First attempt at using Bootstrap Carousel
        2) In a future version, I would like to streamline the code for the carousel: currently if owner wante to change pictures, they would have to download to assets folder and ensure that they followed a standard naming practice so that images would be read and pulled into JavaScript using a hard-coded limited amount of pictures.
            a) Thoughts include using Node in order for owner to download images to assets folder however they want.
            b) Node (read-file.js?) would then read the files and insert into HTML using jQuery .append() methods by looping through all image files.
            c) This would also allow flexibility with images as the jQuery can read as many files as are in assets image folder; currently there is a set number of images so if owner uses less images, then there is a false representation of images with class="carousel-indicators" and owner cannot use more than nine images.

floor.html - FLOOR PLANS page
    I wanted an easy way to distinguish the different floor plans and to allow user to click on image and get a larger version for better viewing.
        1) Images on html are pulled from a standard assets/image folder
        2) Once user clicks on an image, jQuery registers the event and then opens a new window to display a larger image of pdf floor plan for the user to manipulate as needed.
        3) Had to do some research in order to learn how to use .href and .src attributes for current image

current.html - CURRENT RESIDENT page
    During consultation with owner, it was discussed that they would like residents to be able to submit a basic request for maintenance repairs and a way for them to pay fees and rent using Zelle.
        1) Using a standard button event event, user is taken to requests.html to fill out a form which is used to submit information to owner through email
        2) Using a standard button event, user triggers a confirmation event through jQuery asking for permission to leave current site and be re-directed to Zelle.com.
            a) This was the first time 