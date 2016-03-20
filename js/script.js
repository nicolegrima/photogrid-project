$(function() {

    // .search-button class on button element
    $('.search-button').on('click', function(event) {
        event.preventDefault();

        // #hash-tag on input element
        var $hashtag = $('#hash-tag').val();

        var $instaphotos = '';
        // .photos class in <ul> in HTML
        var $photos = $('.photos');

          $("header").addClass("populated-header");

        $.ajax({
            dataType: 'jsonp', //format type
            method: 'GET',
            url: 'https://api.instagram.com/v1/tags/' + $hashtag + '/media/recent?count=12&client_id=71e21c4bf4294a8498860283067eb682'
          })

         .done(function(instaData) {
            // console.log(instaData);

         $.each(instaData.data, function(index, value) {

              $instaphotos += '<li><div class="wrapper">';
              $instaphotos += '<div class="image"><a href=" ' + value.link + ' "><img src=' + value.images.standard_resolution.url + '></a></div>';
              $instaphotos += '<div class="user-info">';
              $instaphotos += '<div class="profile-pic"><img src=' + value.user.profile_picture + '></div>';
              $instaphotos += '<div class="photo-meta">';
              $instaphotos += '<p>' + value.user.username + '</p>';
              $instaphotos += '<p><span><i class="fa fa-comments"></i></span>' + value.comments.count + '<span><i class="fa fa-heart"></i></span>' + value.likes.count + '</p></div>';
              $instaphotos += '</div></div></li>';

          $photos.empty().append($instaphotos);
          // $instaphotos = '';
        }); // closes each

     }) // closes .done
        .fail(function() {
          alert('Oopps - we\'re having a tech snafu. Check again later.'); //make sure outside of each but inside done
      }); //closes fail

  }); //closes .search-button

}); // closes document ready
