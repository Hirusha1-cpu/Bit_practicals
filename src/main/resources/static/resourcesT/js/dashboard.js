const btnSignOut = () =>{
    let userConfirm = confirm('Are you sure you want to sign out')
    if (userConfirm) {
        window.location.assign("/logout")
    }
}