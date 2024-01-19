const detailsContainer = document.getElementById('detailsContainer');
const details = [
    {
        "author": "Arun Poudel",
        "addedAt": new Date().toLocaleString(),
        "views": 0,
        "comments": 1200,
        "statusChange": "Published",
        "imgSrc": "./images/2.jpeg"
    },
    {
        "author": "Jonty",
        "addedAt": new Date().toLocaleString(),
        "views": 0,
        "comments": 1200,
        "statusChange": "Published",
        "imgSrc": "./images/3.png"
    },
    {
        "author": "John Doe",
        "addedAt": new Date().toLocaleString(),
        "views": 0,
        "comments": 1200,
        "statusChange": "Published",
        "imgSrc": "./images/1.jpg"
    }
];
details.forEach((detail) => {
    // Create a div for the image and buttons
    const imageButtonDiv = document.createElement('div');
    imageButtonDiv.classList.add('image-button-container');

    // Create a div for the details
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details-container');

    // Create a new div for each detail
    const detailDiv = document.createElement('div');
    detailDiv.classList.add('detail'); 

    // Image element
    const imgElement = document.createElement('img');
    imgElement.src = detail.imgSrc;
    imgElement.width = 500;
    imageButtonDiv.appendChild(imgElement);

    // Buttons
    const readButton = document.createElement('button');
    readButton.textContent = 'Read it';
    readButton.className = 'button read-button';
    readButton.addEventListener('click', () => {
        detail.isRead = !detail.isRead;
        detail.views += detail.isRead ? 1 : 0;
        viewsElement.textContent = `Views: ${detail.views}`;
    });
    imageButtonDiv.appendChild(readButton);

    const commentButton = document.createElement('button');
    commentButton.textContent = 'Add Comment';
    commentButton.className = 'button comment-button';
    commentButton.addEventListener('click', () => {
        detail.comments += 1;
        commentsElement.textContent = `Comments: ${detail.comments}`;
    });
    imageButtonDiv.appendChild(commentButton);

    const statusButton = document.createElement('button');
    statusButton.textContent = getStatusButtonText(detail.statusChange);
    statusButton.className = 'button status-button';
    statusButton.addEventListener('click', () => {
        detail.toggleStatus();
        statusChangeElement.textContent = `Status: ${detail.statusChange}`;
        statusButton.textContent = getStatusButtonText(detail.statusChange);
    });
    imageButtonDiv.appendChild(statusButton);

    // Append the imageButtonDiv to the detailDiv
    detailDiv.appendChild(imageButtonDiv);

    // Append the details to the detailsDiv
    const authorElement = document.createElement('p');
    authorElement.textContent = `Author: ${detail.author}`;
    detailsDiv.appendChild(authorElement);

    const addedAtElement = document.createElement('p');
    addedAtElement.textContent = `Added At: ${detail.addedAt}`;
    detailsDiv.appendChild(addedAtElement);

    const viewsElement = document.createElement('p');
    viewsElement.textContent = `Views: ${detail.views}`;
    viewsElement.id = `views-${detail.author.toLowerCase().replace(/\s+/g, '-')}`;
    detailsDiv.appendChild(viewsElement);

    const commentsElement = document.createElement('p');
    commentsElement.textContent = `Comments: ${detail.comments}`;
    commentsElement.id = `comments-${detail.author.toLowerCase().replace(/\s+/g, '-')}`;
    detailsDiv.appendChild(commentsElement);

    const statusChangeElement = document.createElement('p');
    statusChangeElement.textContent = `Status: ${detail.statusChange}`;
    detailsDiv.appendChild(statusChangeElement);

    // Append the detailsDiv to the detailDiv
    detailDiv.appendChild(detailsDiv);

    detailsContainer.appendChild(detailDiv); // Append the detail to the container
});

function getNextStatus(currentStatus) {
    switch (currentStatus) {
        case 'Published':
            return 'Archived';
        case 'Archived':
            return 'Draft';
        case 'Draft':
            return 'Published';
        default:
            return currentStatus;
    }
}

function getStatusButtonText(status) {
    switch (status) {
        case 'Published':
            return 'Archive';
        case 'Archived':
            return 'Draft';
        case 'Draft':
            return 'Publish';
        default:
            return status;
    }
}

details.forEach((detail) => {
    detail.toggleStatus = function () {
        this.statusChange = getNextStatus(this.statusChange);
    };
});
