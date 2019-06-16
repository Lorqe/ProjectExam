// Script for latest SpaceX info

fetch('https://api.spacexdata.com/v3/info')
    .then(result => result.json())
  .then((res) => {
    spaceX(res);
  })
.catch(err => console.log(err))

var apiError = "API Error - AB001";

function spaceX(result){
    var foundedCont = document.getElementById("founded");
    var veichlesCont = document.getElementById("veichles");
    var employeeCont = document.getElementById("employees");
    
    foundedCont.innerHTML = result.founded;
    veichlesCont.innerHTML = result.vehicles;
    employeeCont.innerHTML = result.employees + "+";
}
    