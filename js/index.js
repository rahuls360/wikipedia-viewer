$(document).ready(function(){
  
  //fetch result json on button click
  $("button").on("click",function(){
    var searchQuery = document.querySelector("input").value;
    console.log(searchQuery);
    var url= "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=" + encodeURIComponent(searchQuery);
    console.log(encodeURIComponent(searchQuery));
    
    $.getJSON(url, function(json){
      var search = json.query.search;
      var html = "";
      search.forEach(function(post){
        //create a div for each post
        html += "<div class='post'><div class='title'><a target='_blank' href=https://en.wikipedia.org/?curid=" + post.pageid + ">"+ post.title + "</a>" + "</div><div class='snippet'>" + post.snippet + "...</div></div>";
        $(".content").html(html);
      });
    });
  
  });
  
  //get autocomplete data
  $("input").autocomplete({
        source: function(request, response) {
		$.ajax({
			type: "GET",
			url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + request.term + "&format=json&callback?",
			dataType: "jsonp",
			success: function(data) {
				response(data[1]);
			},
		});
	}
    });
  
  
  
});