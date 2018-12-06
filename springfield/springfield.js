


// carousel for photos.html jQuery
$(document).ready(function(){
    // Activate Carousel
    $("#myCarousel").carousel({
        interval: 3000
    });
    
    // Enable Carousel Indicators
    $(".item1").click(function(){
        $("#myCarousel").carousel(0);
    });
    $(".item2").click(function(){
        $("#myCarousel").carousel(1);
    });
    $(".item3").click(function(){
        $("#myCarousel").carousel(2);
    });
    $(".item4").click(function(){
        $("#myCarousel").carousel(3);
    });
    $(".item5").click(function(){
        $("#myCarousel").carousel(4);
    });
    $(".item6").click(function(){
        $("#myCarousel").carousel(5);
    });
    $(".item7").click(function(){
        $("#myCarousel").carousel(6);
    });
    $(".item8").click(function(){
        $("#myCarousel").carousel(7);
    });
    $(".item9").click(function(){
        $("#myCarousel").carousel(8);
    });
    
    // Enable Carousel Controls
    $(".left").click(function(){
        $("#myCarousel").carousel("prev");
    });
    $(".right").click(function(){
        $("#myCarousel").carousel("next");
    });
});

// carousel for sect-8.html jQuery
$(document).ready(function(){
    // Activate Carousel
    $("#myCarousel8").carousel({
        interval: 3000
    });
    
    // Enable Carousel Indicators
    $(".item1").click(function(){
        $("#myCarousel8").carousel(0);
    });
    $(".item2").click(function(){
        $("#myCarousel8").carousel(1);
    });
    $(".item3").click(function(){
        $("#myCarousel8").carousel(2);
    });
    $(".item4").click(function(){
        $("#myCarousel8").carousel(3);
    });
    $(".item5").click(function(){
        $("#myCarousel8").carousel(4);
    });
    $(".item6").click(function(){
        $("#myCarousel8").carousel(5);
    });
    $(".item7").click(function(){
        $("#myCarousel8").carousel(6);
    });
    $(".item8").click(function(){
        $("#myCarousel8").carousel(7);
    });
    
    // Enable Carousel Controls
    $(".left").click(function(){
        $("#myCarousel8").carousel("prev");
    });
    $(".right").click(function(){
        $("#myCarousel8").carousel("next");
    });
});

// opens up a new page with larger version of the floor plans
$(document).ready(function () {
    $("img").click(function(){
        var newPdf = document.getElementById("newImagePos");
        newPdf.href = this.src;
        newPdf.click();
    });//closes img click function
});// closes function

$(document).ready(function(){ //houses the click functions for contact us page
    $("#payRent").click(function (){//called when button is clicked 
        if(confirm("You are about to leave the Springfield Villas page and be re-directed to the Zelle online payment site.")) { //tests to see if user clicked ok or cancel in confirm box
            window.open("https://www.zellepay.com", "_blank");//switches to Zelle website if user clicks ok
        }
        return; //stays on current page if user clicks on cancel
    });//closes payRent click
    $("#application-springfield__online").click(function (){//called when text is clicked
        if(confirm("You are about to leave the Springfield Villas page and be re-directed to the TAA lease application site.")) { //tests to see if user clicked ok or cancel in confirm box
            window.open('https://www.taa.org/about/local/', '_blank'); //switches to TAA click/lease/local sitewebsite if user clicks ok
        };
        return; //stays on current page if user clicks on cancel
    });//closes application-springfield__online click
    $("#application-springfield__print").click(function(){
        window.open("assets/applications/springfield-app.pdf");
    });//closes the application print click function

    $("#application-imperial__online").click(function (){//called when text is clicked
        if(confirm("You are about to leave the Springfield Villas page and be re-directed to the TAA lease application site.")) { //tests to see if user clicked ok or cancel in confirm box
            window.open('https://www.taa.org/about/local/', '_blank'); //switches to TAA click/lease/local sitewebsite if user clicks ok
        };
        return; //stays on current page if user clicks on cancel
    });//closes application-springfield__online click
    $("#application-imperial__print").click(function(){
        window.open("assets/applications/imperial-app.pdf");
    });//closes the application print click function

    // $("#maintenanceRequest").click(function() {
    //     window.open("requests.html", "_blank")
    // });//closes request maintenance click function
});// closes function

// Google maps function
function myMap() {
    var mapProp= {
        center:new google.maps.LatLng(29.873010,-97.661024),
        zoom:16,
};

var map=new google.maps.Map(document.getElementById("mapLocation"),mapProp);
}

// Calculator eligibility function
var incomeThresh = [33660, 38460, 43260, 48060, 51960];
var nonEligibility = "Unfortunately, it looks like you may not be eligible at this time."

function householdIncome(household, hhIncome){
    var text = "Please contact office or fill out an application to continue.";
    var hh = Number(household);
    var income = Number(hhIncome);
    eligibleResults.className = "green";
    
    switch (hh) {
        case 1:
            if (income > incomeThresh[hh-1]){
                text = nonEligibility;
                eligibleResults.className = "red";
            };
            break;
        case 2:
            if (income > incomeThresh[hh-1]){
                text = nonEligibility;
                eligibleResults.className = "red";
            };
            break;
        case 3:
            if (income > incomeThresh[hh-1]){
                text = nonEligibility;
                eligibleResults.className = "red";
            };
            break;
        case 4:
            if (income > incomeThresh[hh-1]){
                text = nonEligibility;
                eligibleResults.className = "red";
            };
            break;
        case 5:
            if (income > incomeThresh[hh-1]){
                text = nonEligibility;
                eligibleResults.className = "red";
            };
            break; 
        default:
            break;
    }
    eligibleResults.innerHTML = text;
    
};  

// clears previous display results
function resetEligibleResults(){
    eligibleResults.innerHTML = "";
};

// REQUESTS page
$(document).ready(function(){
    $("#emergency").click(function(event){
        alert("Please call the following number and someone will get back to you as soon as possible: 512.398.3100");

    });//closes click function id=emergency
});//closes function