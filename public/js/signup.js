const signUpHandler = async (event) => {
    event.prevent.default();
    const userName = document.querySelector("#userName");
    const signUpEmail = document.querySelector("#signUpEmail");
    const signUpPassword = document.querySelector("#signUpPass");

    if (signUpEmail && signUpPassword && userName) {
        const response = await fetch("/api/user", {
            method: "POST",
            body: JSON.stringify({
                name: userName.value,
                password: signUpPassword.value,
                email: signUpEmail.value
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            document.location.replace("/profile");
        } else {
            let result = await response.json()
            alert(result.message)
        }
    }
};

document.querySelector("#signUpForm").addEventListener("submit", signUpHandler)