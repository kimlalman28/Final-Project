document.querySelector("form").addEventListener("submit", function(e){
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
			console.log(response);
			$("#song").html("Song: "+ response.results[0].trackName);
			$("#artist").html("Artist: "+ response.results[0].artistName);
			$("#album").html("Album: "+ response.results[0].collectionName);
			$("#price").html("Price:" + response.results[0].trackPrice);
			$("audio").attr("src", response.results[0].previewUrl);
			$("#songcover").attr("src", response.results[0].artworkUrl30)


		}
	})
})
