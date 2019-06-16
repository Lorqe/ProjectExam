// get URL query string
function getQueryStringValue (key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
// variable for the id
var flightNumber = getQueryStringValue("flightNumber");
var apiError = "API Error - AB001";

if(flightNumber === "") {
    
    var title = document.createElement("h2");
    title.innerHTML = "NO LAUNCH";
    document.getElementById("launchTitle").appendChild(title);
    
} else {
    
    fetch("https://api.spacexdata.com/v3/launches/" + flightNumber)
    .then(result => result.json())
    .then(res => {
        createLaunch(res);
    })
.catch(err => console.log(err))
    
    function createLaunch(result) {
        var title = document.getElementById("launchTitle");
        title.innerHTML = result.mission_name;
        
        var year = document.getElementById("launchYear");
        var yearTwo = document.getElementById("launchYearTwo");
        yearTwo.innerHTML = result.launch_year;
        year.innerHTML = result.launch_year;
    
        //var flightNumber = document.getElementById('flightNumber');
          //  if(result.flight_number != undefined) {
                flightNumber.innerHTML += result.flight_number;
            //} else {
            //    flightNumber.innerHTML += apiError;
            //}
        
    
        // var missionName = document.getElementById("missionName");
           // if(result.mission_name != undefined) {
             //   missionName.innerHTML += result.mission_name;
            // } else {
            //    missionName.innerHTML += apiError;
            // }
        
    
        // Get latest launch date and format it.
        var launchDate = document.getElementById("launchDate");
        var date = new Date(result.launch_date_utc);
        var dateString = [
            date.getUTCFullYear() ,
            ("0" + (date.getUTCMonth()+1)).slice(-2),
            ("0" + date.getUTCDate()).slice(-2)
        ].join("-");

        if(dateString != undefined) {
            launchDate.innerHTML += dateString;
        } else {
            launchDate.innerHTML += apiError;
        }

        // Mission Patch
        var imgPatch = document.getElementById("missionPatch");
            imgPatch.src = result.links.mission_patch;

        var details = document.getElementById("details");
            details.innerHTML = result.details;

        // Youtube Link
        var youTube = document.getElementById("youtubeLink");
            youTube.href = result.links.video_link;

        // Images
        
        console.log(result.links.flickr_images.length);

        var imgArray = result.links.flickr_images;
        var imgContainer = document.getElementById("imgContainer");
        var str = "";
        
        if(result.links.flickr_images.length === 0) {
            str += "<p class='laucnhDescription'>There seems to be 0 images linked to this launch.</p>";
            imgContainer.innerHTML = str;
        } else {
            imgArray.forEach(function(image) {
            str += '<a href="' + image + '" target="_blank";><img class="newImage" src=' + image + '></a>'; 
        });

        imgContainer.innerHTML = str;
        }
        
        

        // Rocket
        // var rocketName = document.getElementById("rocketName");
        //    rocketName.innerHTML = result.rocket.rocket_name;
    
}
    
}