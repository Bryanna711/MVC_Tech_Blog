const updatePostHandler = (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const postContent = document.querySelector("#update_content").value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/post/update/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            title,
            postContent,
            post_id = id
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

document.querySelector("updateBtn").addEventListener("button", updatePostHandler)