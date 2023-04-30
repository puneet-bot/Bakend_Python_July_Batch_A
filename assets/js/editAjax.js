{
  // let createPost = function () {
  //     let postForm = $('#new-post-form');
  //     postForm.submit(function (e) {
  //         //preventing default actions
  //         e.preventDefault();
  //         // $.ajax({
  //         //     type: 'post',
  //         //     url: '/posts/create',
  //         //     data: postForm.serialize(),
  //         //     success: function (data) {
  //         //         console.log(data);
  //         //         let newPostData=newPost(data.data.post);
  //         //         $(' #post-list-container').prepend(newPostData);
  //         //         //mentioning that this class is under newPostData in jquery...
  //         //         // console.log('Dhan Nirankar Ji')
  //         //         deletePost($('.delete-post-button',newPostData));
  //         //         // addComments();
  //         //         new ToggleLike($(' .toggle-like-button',newPostData));
  //         //     }, error: function (error) {
  //         //         console.log(error.responseText);
  //         //     }
  //         // })
  //     })
  // }

  // contact-643bf8ec62733c7b2b6f040c
  function ajaxCode(e) {
    console.log(e.id);

    let postForm = $(`#edit-${e.id}`);
    console.log(postForm);
    postForm.submit(function (ev) {
      console.log(ev);
      ev.preventDefault();
      $.ajax({
        type: "post",
        url: "/func/edit",
        data: postForm.serialize(),
        success: function (data) {
          console.log(data);
          
        //   let newPostData = newPost(data.data.post);
        //   $(" #post-list-container").prepend(newPostData);
        //   //mentioning that this class is under newPostData in jquery...
        //   // console.log('Dhan Nirankar Ji')
        //   deletePost($(".delete-post-button", newPostData));
        //   // addComments();
        //   new ToggleLike($(" .toggle-like-button", newPostData));
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }
}
