// fetch call post comment
//eventhandler on button

const newCommentHandler = async (event) => {
    event.preventDefault();

    const commentContent = document.querySelector("#comment_content").value;
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch("/api/comments/new", {
        method: "POST",
        body: JSON.stringify({
            commentContent,
            postId
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.reload();
    } else {
        res.status(response)
    }
};

document.querySelector("commentBtn").addEventListener("click", newCommentHandler)

//fetch call on update comment
//event handler button

const updateCommentHandler = async (event) => {
    event.preventDefault();

    const updateCommentContent = document.querySelector("#update_content").value;
    const commentId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            updateCommentContent,
            commentId,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.replace("/");
    } else {
        res.status(response)
    }
};

document.querySelector("updateCommentBtn").addEventListener("button", updateCommentHandler)


//fetch call on delete comment
//event handler button

const deleteCommentHandler = async (event) => {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
            comment_id: id
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.replace("/");
    } else {
        res.status(response)
    }
};

document.querySelector("deleteComment").addEventListener("button", deleteCommentHandler)