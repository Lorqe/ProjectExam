document.getElementById("submitForm").addEventListener("click", function validateForm() {
    var name = document.getElementById("yourName").value;
    var email = document.getElementById("yourEmail").value;
    var phone = document.getElementById("yourPhone").value;
    var message = document.getElementById("yourMessage").value;
    
    var firstError = document.getElementById("nameErr");
    var secondError = document.getElementById("emailErr");
    var thirdError = document.getElementById("numErr");
    var fourthError = document.getElementById("messErr");
    
    var success = document.getElementById("success");
    var successTrueOrFalse = true;
    
    if(name == "") {
        firstError.style.display = "block";
        successTrueOrFalse = false;
    } else {
        firstError.style.display = "none";
    }
    
        // Formats xxx-xxx-xxx , xxx xxx xxxx , xxx.xxx.xxx
        var pReg = /^[0-9]{3}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{3}$/;
        
        if(pReg.test(phone) == false ) {
            thirdError.style.display = "block";
            successTrueOrFalse = false;
        } else {
            thirdError.style.display = "none";
        }
         // The standard reg expression for email addresses.
        var eReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
       
        if(eReg.test(email) == false ) {
            secondError.style.display = "block";
            successTrueOrFalse = false;
        } else {
            secondError.style.display = "none";
        }
    
        if(message == "") {
            fourthError.style.display = "block";
            successTrueOrFalse = false;
        } else {
            fourthError.style.display = "none";
        }

        if(successTrueOrFalse === true) {
            success.style.display = "block";
        } else {
            success.style.display = "none";
        }
    
    console.log(successTrueOrFalse);
})
