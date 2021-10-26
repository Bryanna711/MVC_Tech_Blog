
const logInHandler = async (event) => {
    // event.prevent.default();

    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    if (email && password) {
        const response = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify({
                email: email.value,
                password: password.value
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

document.querySelector("#logInForm").addEventListener("submit", logInHandler)