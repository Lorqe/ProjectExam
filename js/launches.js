// Script for latest SpaceX Launch.

fetch('https://api.spacexdata.com/v3/launches/latest')
    .then(result => result.json())
  .then((res) => {
    firstLaunch(res);
  })
.catch(err => console.log(err))

var apiError = "API Error - AB001";

function firstLaunch(result){
    var flightNumber = document.getElementById('flightNumber');
        if(result.flight_number != undefined) {
            flightNumber.innerHTML += result.flight_number;
        } else {
            flightNumber.innerHTML += apiError;
        }
        
    
    var missionName = document.getElementById("missionName");
        if(result.mission_name != undefined) {
            missionName.innerHTML += result.mission_name;
        } else {
            missionName.innerHTML += apiError;
        }
        
        
    var launchYear = document.getElementById("launchYear");
        if(result.launch_year != undefined) {
            launchYear.innerHTML += result.launch_year;
        } else {
            launchYear.innerHTML += apiError;
        }
        
    
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
    
    var imgArray = result.links.flickr_images;
    var imgContainer = document.getElementById("imgContainer");
    var str = "";
   
    
    imgArray.forEach(function(image) {
        str += '<a href="' + image + '" target="_blank";><img class="newImage" src=' + image + '></a>'; 
    });
    
    imgContainer.innerHTML = str;
    
    // Rocket
    var rocketName = document.getElementById("rocketName");
        rocketName.innerHTML = result.rocket.rocket_name;
    
    
    
    fetch('https://api.spacexdata.com/v3/rockets/' + result.rocket.rocket_id)
    .then(result => result.json())
    .then((res) => {
        latestRocket(res);
    })
        .catch(err => console.log(err))
    
    function latestRocket(result) {
        
        var rocketBackground = document.getElementById("rocketPage");
            if(result.flickr_images[0] != undefined) {
                rocketBackground.style.backgroundImage = "url('" + result.flickr_images[0] + "')";
            } else {
                rocketBackground.style.backgroundColor = "#f9f9f9";
            }
        
         // Cost of Launch
        
         function commaSeparateNumber(val){
            while (/(\d+)(\d{3})/.test(val.toString())){
                val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
            }
            return val;
        }
        
        var price = commaSeparateNumber(result.cost_per_launch);
        
        var costPerLaunch = document.getElementById("costPerLaunch");
            costPerLaunch.innerHTML = price;
        
        // Success Rate
        var successRate = document.getElementById("successRate");
            successRate.innerHTML = result.success_rate_pct;
        
        // First Flight
        var firstFlight = document.getElementById("firstFlight");
            firstFlight.innerHTML = result.first_flight;
        
        // Description
        var desc = document.getElementById("rocketDesc");
            desc.innerHTML = result.description;
        
    }
}

fetch('https://api.spacexdata.com/v3/launches')
    .then(result => result.json())
  .then((res) => {
    otherLaunches(res);
  })
.catch(err => console.log(err))

function otherLaunches(result) {
    
    
    var launchArray = result;
    var launchContainer = document.getElementById("launchesPara");
   
    for(i = 0; i < 10; i++) {
        var h1 = document.createElement("h1");
        h1.innerHTML = '<a href="/specific-launch.html?flightNumber=' + launchArray[i].flight_number + '">' + launchArray[i].mission_name + '</a>';
        
        launchContainer.appendChild(h1);
    }
    
}