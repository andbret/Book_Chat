$(document).ready(() => {
  // Getting references to our form and inputs
    var unInput = document.querySelector("#username_input");
    var psInput = document.querySelector("#password_input");
  const loginForm = $("form.form-signin");
  const usernameInput = $("input#username_input");
  const passwordInput = $("input#password_input");

  $("#signupBtn").on("click", event => {
    event.preventDefault();
    window.location.replace("/signup");
  })

  // When the form is submitted, we validate there's an username and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    unInput.classList.remove('is-invalid');
    psInput.classList.remove('is-invalid');
    $("#error").remove()
    const userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
      $("#errormessage").show()
      return;
    }

    // If we have an username and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(username, password) {
    $.post("/api/login", {
      username: username,
      password: password
    })
      .then((data) => {
        console.log(data);
        console.log("data")
        window.location.replace("/homepage");
        // If there's an error, log the error
      })
      .catch(err => {
        if (err){
        
          unInput.classList.add('is-invalid');
         
          psInput.classList.add('is-invalid');
          $(".errorInput").append('<div class="invalid-feedback" id="error"> This user does not exist</div>');
          $("#errormessage").show()
        }
        console.log(err);
        console.log("error")
      });
  }
});
