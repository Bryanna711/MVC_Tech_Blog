// fetch call post post
//eventhandler on button

const newPostHandler = (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const postContent = document.querySelector("#post_content").value;

    const response = await fetch("/api/posts/", {
        method: "POST",
        body: JSON.stringify({
            title,
            postContent
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.replace("/profile");
    } else {
        res.status(response)
    }
};

document.querySelector("postBtn").addEventListener("button", newPostHandler)
