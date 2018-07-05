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

            var searchTerm = $('#list-input')

            $("#list-input").val("");


            retrieveYelpResults(searchTerm, searchLocation).then(handleYelpSearchResults);

            function retrieveYelpResults(searchTerm, searchLocation) {
                // var qURL = `https://api.yelp.com/v3/businesses/search?term=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(searchLocation)}&apikey=KJ_7-uskE47z1-8JIMTR6ASNgy3sh0yzqZWxjlPwTNF8NzO4h2DFrVGiIcl5lz2Jp38QGWQbfzT1fLpR_K0DeD9FgdugoL33W_AM9DfcGAOPmfI6HvtpNguty4s1W3Yx`;
                var qURL = `https://api.yelp.com/v3/businesses/search?term=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(searchLocation)}&limit=8`;

                var token = 'KJ_7-uskE47z1-8JIMTR6ASNgy3sh0yzqZWxjlPwTNF8NzO4h2DFrVGiIcl5lz2Jp38QGWQbfzT1fLpR_K0DeD9FgdugoL33W_AM9DfcGAOPmfI6HvtpNguty4s1W3Yx'
                return $.ajax({
                    url: qURL,
                    // headers: {Authorization: "Bearer KJ_7-uskE47z1-8JIMTR6ASNgy3sh0yzqZWxjlPwTNF8NzO4h2DFrVGiIcl5lz2Jp38QGWQbfzT1fLpR_K0DeD9FgdugoL33W_AM9DfcGAOPmfI6HvtpNguty4s1W3Yx"},
                    method: "GET",
                    beforeSend: function (xhr, settings) { xhr.setRequestHeader('Authorization', 'Bearer ' + token); }
                })



            }

            function handleYelpSearchResults(responseYelp) {
                console.log(JSON.stringify(responseYelp, null, 2))
                //JSON.parse and usual .notation

                var results = responseYelp.businesses;

                for (var i = 0; i < results.length; i++) {


                    var p = $('<div class="card"><img class="card-img-top" src="./assets/images/Singapore.jpg" alt="Card image cap" id="hotelPic"><div class="card-body"><h5 class="card-title" id="business-name">Business Name</h5><p class="card-text" id="company-name"><a href=' + url + '>' + companyName + '</a></p></div><ul class="list-group list-group-flush"><li class="list-group-item"><h5 id="business-1">User Ratings</h5><p id="user-ratings">' + userRatings + '</p></li><li class="list-group-item"><h5 id="business-2">Phone</h5><p id="phone-num">' + userPhone + '</p></li><li class="list-group-item"><h5 id="business-4">Price</h5><p id="price">' + userPrice + '</p></li></ul><div class="card-body"><button type="submit" class="btn btn-primary" id="buckit-add-btn">Add to Bucket</button></div></div>');

                    $(".card-magic").append(p);



                    if (results[i].rating >= 4) {
                        var result = results[i];
                        var companyName = result.name;
                        // var image = result.image_url;
                        var userRatings = result.rating;
                        var userPhone = result.phone;
                        var userPrice = result.price;
                        var url = result.url;

                    }



                }
            }
        });

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
















   






