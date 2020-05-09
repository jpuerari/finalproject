/* API.getPhoto(searchTerm)
  .then(({data}) => {
    const photoReference = data.result.photos[0].photo_reference;
    // set photoReference to state
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBWc5ek5t8mxh_Ja4oZf4GYIsNM-yo3nw4&photoreference=${photoReference}&maxwidth=1000`
​
    setPhotoUrl(photoUrl)
  })
  .catch(({data}) => {
    console.log(data);
  }) */