$(function () {
	var menu = $('#menu');
	var imageArray = ["url(images/pic1.jpg)", "url(images/pic2.jpg)", "url(images/pic3.jpg)", "url(images/pic4.jpg)", "url(images/pic5.jpg)"];
    var current = 0;

    function nextBackground() {
        menu.css('background-image', imageArray[current = ++current % imageArray.length]);
		setTimeout(nextBackground, 4500);
    }
    	setTimeout(nextBackground, 4500);
   		menu.css('background-image', imageArray[0]);
}); //function to swap between background images

$(document).ready(
	document.getElementById('songinfo').style.display = 'none'
	) //this div remains hidden until a media is search

//////////////////////////////////////////////////////////////////////////////

document.getElementById("form").addEventListener("submit", function(e){
	e.preventDefault();
	var search = document.querySelector("input").value; //user input in search box


if($("input[name=media]:checked", "#myForm").val() == "Music"){ //if music box is checked

	$.ajax({
		url: "https://itunes.apple.com/search",
		jsonp: "callback",
		dataType: "jsonp",
		data: {
			term: search,
			media: "music",

		}, //ajax call

		success: function(response){ //function to set variables and change html according to search
			thing = "Music";
			track = response.results[0].trackName;
			artistname = response.results[0].artistName;
			trackprice = response.results[0].trackPrice;
			itunes = response.results[0].trackViewUrl;
			music = response.results[0].previewUrl;
			$("#songinfo").show();
			console.log(response);
			$("#song").html("Song: "+ track);
			$("#artist").html("Artist: "+ artistname);
			$("#album").html("Album: "+ response.results[0].collectionName);
			$("#price").html("Price: $" + trackprice );
			$("audio").attr("src", music);
			$("#songcover").attr("src", response.results[0].artworkUrl100);
			$('#add').unbind();
		}//function success
	})//ajax call
}//if
		
//////////////////////////////////////////////////////////////////////////////////


else if($("input[name=media]:checked", "#myForm").val() == "App"){ //if app box is checked

	$.ajax({
		url: "https://itunes.apple.com/search",
		jsonp: "callback",
		dataType: "jsonp",
		data: {
			term: search,
			media: "software",

		}, //ajax call

		success: function(response){ //variables set and html is adjusted accordingly
			thing = "App";
			track = response.results[0].trackName;
			artistname = response.results[0].artistName;
			trackprice = response.results[0].formattedPrice;
			itunes = response.results[0].trackViewUrl;
			$("#songinfo").show();
			console.log(response);
			$("#song").html("App: "+ track);
			$("#artist").html("Developer: "+ artistname);
			$("#album").html("Category: "+ response.results[0].primaryGenreName);
			$("#price").html("Price: " + trackprice );
			$("audio").attr("src", "");
			$("#songcover").attr("src", response.results[0].artworkUrl512);

		}//function success
	})//ajax call
}//if
})//form submit event listener

document.getElementById("add").addEventListener("submit", function(e){ //event listener for when the user adds a media to the database
			e.preventDefault();
			alert("Added!");

	$.ajax({ //database call to post data into database
		type: 'POST',
		url: "/mediasearch",	
		data: { 
			type: thing,
			song: track,
			artist: artistname,
			price: trackprice,
			buyinfo: itunes

			}//data

		})//ajax
})//submit event listener

///////////////////////////////////////////////////////////////////////////////////////////////////

var tracksong = document.getElementById('audio');
document.getElementById('play').addEventListener("click", function(e){ //event listener for play button
	tracksong.play();
})
document.getElementById('stop').addEventListener("click", function(e){ //event listener for stop button
	tracksong.pause();
	tracksong.currentTime = 0;
})




