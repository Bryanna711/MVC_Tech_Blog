const logOutHandler = async () => {
    const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (response.ok) {
        document.location.replace("/");
    } else {
        res.status(response)
    }
};


document.querySelector("#logOut").addEventListener("click", logOutHandler)
