// Script for SpaceX Missions

fetch('https://api.spacexdata.com/v3/missions')
    .then(result => result.json())
  .then((res) => {
    missions(res);
  })
.catch(err => console.log(err))

var apiError = "API Error - AB001";

function missions(result){
    
    var missionArray = result;
    var missionContainer = document.getElementById("mission");
   console.log(missionContainer);
    
    // NB! Check for NULL on websites!!!!!!!!!
    // This is messy
    
    for(i = 0; i < missionArray.length; i++) {
        var div = document.createElement("div");
        div.className = "missionBox";
        div.setAttribute('id','missionBox' + [i]);
        
        var small = document.createElement("small");
        small.innerHTML = "<strong>MISSION ID: </strong>" + result[i].mission_id;
        
        var h2 = document.createElement("h2");
        h2.className = "missionTitle";
        h2.innerHTML = result[i].mission_name;
        
        var para = document.createElement("p");
        para.className= "missionDesc";
        var str = result[i].description;
        
        if(str.length > 120) {
            str = str.substring(0,120) + "<span class='moreText' id='more" + [i] + "'>" + str.substring(120, 2000) + "</span><span id='dots" + [i] + "'>...</span> <br /><br /> <strong><a onclick='myFunction(" + [i] + ")' id='myBtn" + [i] + "'>Read More..</a></strong>";
        } else {
            
        }
        para.innerHTML = str;
 
        
        var wiki = document.createElement("span");
        wiki.className="missionLink";
        wiki.innerHTML = "<p class='linkspara'><a href='" + result[i].wikipedia + "'>Wikipedia </a></p>";
        
        var web = document.createElement("span");
        web.className="missionLink";
        web.innerHTML = "<p class='linkspara'><a href='" + result[i].website + "'><span class='spansep'>//</span> Website </a></p>";
        
        var twitter = document.createElement("span");
        twitter.className="missionLink";
        twitter.innerHTML = "<p class='linkspara'><a href='" + result[i].twitter + "'><span class='spansep'>//</span> Twitter</a></p>";
        
        missionContainer.appendChild(div);
        div.appendChild(small);
        div.appendChild(h2);
        div.appendChild(para);
        
        if (result[i].wikipedia != null) {
            div.appendChild(wiki);
        } else {
            
        }
        
        if(result[i].website != null) {
            div.appendChild(web);
        } else {
            
        }
        
        if(result[i].twitter != null) {
            div.appendChild(twitter);
        } else {
            
        }
        

    }
}

function myFunction(i) {
    var dots = document.getElementById("dots" + i);
    var moreText = document.getElementById("more" + i);
    var btnText = document.getElementById("myBtn" + i);

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more.."; 
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less.."; 
        moreText.style.display = "inline";
    }
}