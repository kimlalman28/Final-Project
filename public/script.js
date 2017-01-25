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
			$("#songinfo").show();
			console.log(response);
			$("#song").html("Song: "+ track);
			$("#artist").html("Artist: "+ artistname);
			$("#album").html("Album: "+ response.results[0].collectionName);
			$("#price").html("Price: $" + trackprice );
			$("audio").attr("src", response.results[0].previewUrl);
			$("#songcover").attr("src", response.results[0].artworkUrl100)
			console.log(track);

		document.getElementById("add").addEventListener("submit", function(e){
			e.preventDefault();
			alert("Song Added!");

			$.ajax({
				type: 'POST',
				url: "/home",
				
				data: {
					song: track,
					artist: artistname,
					price: trackprice

				},

			})
		})

		},
	})
})

var track = document.getElementById('audio');
document.getElementById('play').addEventListener("click", function(e){ //event listener for play button
	track.play();
})
document.getElementById('stop').addEventListener("click", function(e){ //event listener for stop button
	track.pause();
	track.currentTime = 0;
})



