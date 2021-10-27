const deletePostHandler = (event) => {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/post/:${id}`, {
        method: "DELETE",
        body: JSON.stringify({
            post_id: id
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

document.querySelector("deleteBtn").addEventListener("button", deletePostHandler)