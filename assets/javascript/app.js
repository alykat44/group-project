$(document).ready(function () {
    //  fix the https when info provided

    var config = {
        apiKey: "AIzaSyCkhtEK3pww5RWN0vP-Qc5VjvvoF2ToeNc",
        authDomain: "first-group-project.firebaseapp.com",
        databaseURL: "https://first-group-project.firebaseio.com",
        projectId: "first-group-project",
        storageBucket: "first-group-project.appspot.com",
        messagingSenderId: "898303691060"
    };
    firebase.initializeApp(config);

    var dataBase = firebase.database();

    // 2. Adding Info
    $("#sub-btn-home").on("click", function () {

        // Grabs user input and assign to variables
        var companyName = $("#companyName").val().trim();
        var userRatings = $("#userRatings").val().trim();
        var userPhone = $("#userPhone").val().trim();
        var userPrice = $("userPrice").val().trim();

        console.log(companyName);
        console.log(userRatings);
        console.log(userPhone);
        console.log(userPrice);

        // "temporary" card data
        // push this to firebase

        var newCard = {

            name: companyName,
            ratings: userRatings,
            phone: userPhone,
            price: userPrice
        }

        newCardData.push(newCard);




        // text-boxes
        $("#company-name").val("");
        $("#user-ratings").val("");
        $("#phone-num").val("");
        $("#hours-op").val("");
        $("#price").val("");

        // Prevents page from refreshing
        return false;


    });




    var cardArray = []

    dataBase.ref().on("child_added", function (childSnapshot) {
        var searchLocation = childSnapshot.val().destinationCity;


        $("#sub-btn-act").on("click", function () {
            jQuery.ajaxPrefilter(function (options) {
                if (options.crossDomain && jQuery.support.cors) {
                    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
                }
            });

//Yelp API
            var searchTerm = $('#list-input') //may need to change the code of what the variable is equal to
            var searchLocation = childSnapshot.val().destinationCity; //may need to change based on firebase

            retrieveYelpResults(searchTerm, searchLocation).then(handleYelpSearchResults);

            function retrieveYelpResults(searchTerm, searchLocation) {
                
                var qURL = `https://api.yelp.com/v3/businesses/search?term=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(searchLocation)}&limit=8`;

                var token = 'KJ_7-uskE47z1-8JIMTR6ASNgy3sh0yzqZWxjlPwTNF8NzO4h2DFrVGiIcl5lz2Jp38QGWQbfzT1fLpR_K0DeD9FgdugoL33W_AM9DfcGAOPmfI6HvtpNguty4s1W3Yx'
                return $.ajax({
                    url: qURL,
                    method: "GET",
                    beforeSend: function (xhr, settings) { xhr.setRequestHeader('Authorization', 'Bearer ' + token); }

                })
            }

            function handleYelpSearchResults(responseYelp) {
                console.log(JSON.stringify(responseYelp, null, 2))
                //JSON.parse and usual .notation

                var results = responseYelp.businesses;

                for (var i = 0; i < results.length; i++) {

                    if (results[i].rating >= 4) {
                        var result = results[i];
                        var companyName = result.name;
                        //var image = result.image_url;
                        var userRatings = result.rating;
                        var userPhone = result.phone;
                        var userPrice = result.price;
                        var url = result.url;

                        $('#company-name').innherHTML(`<a href="${url}">${companyName}</a>`);

                        $("#user-ratings").innerHTML(`<span>${userRatings}</span>`);

                        $("#price").innerHTML(`<span>${userPrice}</span>`);

                        $('#phone-num').innerHTML(`<span>${userPhone}</span>`);
                    }
                }
            };
            //Google Maps API
            var cityDesitination = "NYC";
var stateDesitination = "NY";

retrieveLocation(cityDesitination, stateDesitination).then(handleGoogleMapResult)    

//}) 
//setting up function to retrieve the location for the ajax call
function retrieveLocation(cityDesitination, stateDesitination) {
    var queryURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityDesitination)},${encodeURIComponent(stateDesitination)}&key=AIzaSyA8Ku_LYnFyDAGVSwp2krC0JldG_Pif7Hg`;
    //ajax call for google maps API
    return $.ajax({
        url: queryURL,
        method: "GET",
    })
}
//function to pass our ajax call response into handleGoogleMapsResult
function handleGoogleMapResult(response) {
    console.log(JSON.stringify(response, null, 2))
}
function myMap() {
    var mapProp= {
        center:new google.maps.LatLng(51,-0.120850),
        zoom:5,
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    }


            $("#sub-btn-act-1").on("click", function () {
                event.preventDefault();
                var newInfo = $("#list-input-1").val().trim();
                console.log(newInfo);

                $("#list-input-1").val("");

                $("tbody").append('<tr><th> <id="checkbox-list"><input type="checkbox" name="myCheckbox" id="check-list"/><td>' + newInfo + "</td>");
            })
        });
    });
// Add card rendered that is added to to the new search

//$('#buckit-add-btn').on('click', function () {









// var newSearch = $('input').eq(0).val();
// cardArray.push(newSearch);
// renderCard(cardArray, 'searchButton', '#cardArea');
// return false;




// var businessName = businessname
// var userRatings = ratings
// var userPhone = phonenumber
// var userHours = hours
// var userPrice = price

// var firebaseName = childSnapshot.val().name;
// var firebasebusinessName = childSnapshot.val().business;
// var firebaseuserPhone = childSnapshot.val().phone;
// var firebaseuserHours = childSnapshot.val().hours;
// var firebaseuserPrice = childSnapshot.val().price;


// // text-boxes


// $("#business-1").val("");
// $("#business-2").val("");
// $("#business-3").val("");
// $("#business-4").val("");























