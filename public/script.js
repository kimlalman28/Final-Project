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
});

$(document).ready(
	document.getElementById('songinfo').style.display = 'none'
	)

document.getElementById("form").addEventListener("submit", function(e){
	e.preventDefault();
	var song = document.querySelector("input").value;

	$.ajax({
		url: "https://itunes.apple.com/search",
		jsonp: "callback",
		dataType: "jsonp",
		data: {
			term: song,
			media: "music",

		},

		success: function(response){
			track = response.results[0].trackName;
			artistname = response.results[0].artistName;
			trackprice = response.results[0].trackPrice;
			itunes = response.results[0].trackViewUrl;
			$("#songinfo").show();
			console.log(response);
			$("#song").html("Song: "+ track);
			$("#artist").html("Artist: "+ artistname);
			$("#album").html("Album: "+ response.results[0].collectionName);
			$("#price").html("Price: $" + trackprice );
			$("audio").attr("src", response.results[0].previewUrl);
			$("#songcover").attr("src", response.results[0].artworkUrl100)

		document.getElementById("add").addEventListener("submit", function(e){
			e.preventDefault();
			alert("Song Added!");

			$.ajax({
				type: 'POST',
				url: "/songsearch",
				
				data: {
					song: track,
					artist: artistname,
					price: trackprice,
					buyinfo: itunes

				},

			})
		})

		},
	})
})

var tracksong = document.getElementById('audio');
document.getElementById('play').addEventListener("click", function(e){ //event listener for play button
	tracksong.play();
})
document.getElementById('stop').addEventListener("click", function(e){ //event listener for stop button
	tracksong.pause();
	tracksong.currentTime = 0;
})




