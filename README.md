# pic-gallery
  1. Download all the code under plugins folder from final version.
  2. Include the following dependencies in the index.html:
  3. Scripts:
		<script
		src="https://code.jquery.com/jquery-3.2.1.min.js"
		integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
		crossorigin="anonymous">
		</script>

		<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
		<!-- Latest compiled and minified JavaScript -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

		<!-- font-awesome -->
		<script src="https://use.fontawesome.com/c3c32e4ecd.js"></script>

		<script src="./plugins/loader/jquery.loader.js"></script>


		<script src="./plugins/timeline/jquery.timeline.js"></script>

		<script src="./plugins/album/jquery.album.js"></script>

		<script src="./plugins/pic-gallery/jquery.gallery.js"></script>

		<script src="./plugins/image-detail/jquery.image-detail.js"></script>
  4. Styles:
		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-         BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

		<!-- Optional theme -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

		<link rel="stylesheet" href="./plugins/timeline/jquery.timeline.css">
		<link rel="stylesheet" href="./plugins/album/jquery.album.css">
		<link rel="stylesheet" href="./plugins/pic-gallery/jquery.gallery.css">
		<link rel="stylesheet" href="./plugins/image-detail/jquery.image-detail.css">
		
  5. I assume that these plugins will be inserted into the page on the click of the gallery link in your main page. 
	In that case, please add the target location where we are going to display the gallery in your main page and add an Id or reference to  it.
	6. Please take a look at my index.html page for reference.
  
I have added a separate timelinecontainer in my index to accomodate external styles apart from the plugin styles.Please add the styles under the given main.css file to your main css file and include the contents from the main.js file into your app's main script file. I have added comments to indicate the code to be invoked when we click the gallery button/link.

According to the current design, the entire gallery info json is retrieved only once when the gallery is to be displayed. API can be designed with REST end points for every album/pic, in case of which the UI should be modified too.

Also, the images are loaded lazily as per the album clicked.

The data mock is in the pics.json file. I have currently hosted the data in my git to fetch it async. Ideally the data should come from the DB. The current JSON structure is an object with "albums" which is an array of objects each containing the year and an array of events.
Each event contains the name, summary and an array of pics.
Each pics object in turn has a title, thumbnail url and full url.

What remains is to design and develop the backend to enable uploading the pics and simultaneously create a thumbnail for each pic and save it and update the urls in the json.
	
