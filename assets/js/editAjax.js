{
  function ajaxCode(e) {
    let contactId = e.id.split("-");
    console.log(contactId[1]);
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
          var modal = document.getElementById(`example-${contactId[1]}`);
          if (modal) {
            $(`#example-${contactId[1]}`).hide();
              $(".modal-backdrop").remove();
              updateContact(data,contactId[1]);
          } else {
            console.log(`Modal ${modalId} not found.`);
          }
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }

  function updateContact(data,currId){
    console.log('here in update',data,currId);
    $('#contact-body>tr').each(function(){
      let element=$(this);
      // addComments();
      let postId = element.prop('id').split("-")[2];
      console.log(data);
      if(postId==currId){
        console.log('ji',$('#google-contact-' + currId));
        var x=$(`
        <td scope="row">${data.data.contact.firstname}</td>
        <td>${data.data.contact.lastname}</td>
        <td>${data.data.contact.email}</td>
        <td>${data.data.contact.phoneNumber}</td>
        <td><div class="dropdown">
          <a class="btn btn-secondary" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            <svg id="see-more-btn" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
          </a>
        
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" href="/profile">details</a></li>

            <!-- modal -->
            <li>
              <!-- Button trigger modal -->
              <button type="button" class=" dropdown-item" data-toggle="modal" data-target="#example-${currId}">
                Edit
              </button>
            </li>
            <form action="/func/delete" method="POST" id="new-contact-form">
            <li>
              <input type="submit" style="background: transparent;border: none;text-align: center;margin-left:17px" value="Delete"></li>
              <input type="hidden" name="contact_id" value="${currId}">
            </form>
            <li><a class="dropdown-item" href="#">More</a></li>
          </ul>
        </div>
      </td>
        `)
      $('#google-contact-' + currId).text(' ');
      $('#google-contact-' + currId).append(x);

      }
  });
  }

  function c_delete(){
    
  }
  c_delete();

}
