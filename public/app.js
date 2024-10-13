"use strict";

// app.js

// Load the My List from local storage
const myList = JSON.parse(localStorage.getItem('myInternshipList')) || [];

// Function to toggle heart button and add/remove internships from My List
function toggleHeart(title, company, location, duration, button) {
    const internship = { title, company, location, duration };
    const selected = button.classList.toggle('selected'); // Toggle the selected class

    // Toggle the selected class on the parent internship div as well
    const internshipDiv = button.closest('.internship');
    internshipDiv.classList.toggle('selected');

    if (selected) {
        // Add to My List
        if (!isInternshipInMyList(internship)) {
            myList.push(internship); // Add to the local array
            localStorage.setItem('myInternshipList', JSON.stringify(myList)); // Update local storage
            alert(`${title} added to My List!`);
        } else {
            console.log("Internship already in My List!");
        }
    } else {
        // Remove from My List
        const index = myList.findIndex(item => item.title === title);
        if (index !== -1) {
            myList.splice(index, 1); // Remove from the local array
            localStorage.setItem('myInternshipList', JSON.stringify(myList)); // Update local storage
            alert(`${title} removed from My List!`);
        }
    }
}

// Function to check if an internship is already in My List
function isInternshipInMyList(internship) {
    return myList.some(item => item.title === internship.title);
}

// Call displayInternships on My List page load
if (document.getElementById('internshipContainer')) {
    displayInternships();
}

// Display internships on My List page
function displayInternships() {
    const container = document.getElementById('internshipContainer');
    container.innerHTML = ''; // Clear previous content

    if (myList.length === 0) {
        container.innerHTML = '<p>No internships added yet.</p>';
        return;
    }

    myList.forEach(internship => {
        const internshipDiv = document.createElement('div');
        internshipDiv.className = 'internship';
        internshipDiv.setAttribute('data-id', internship.title); // Use title as unique ID
        internshipDiv.innerHTML = `
            <h3>${internship.title}</h3>
            <p>Company: ${internship.company}</p>
            <p>Location: ${internship.location}</p>
            <p>Duration: ${internship.duration}</p>
            <button class="heart-button selected" onclick="removeFromMyList('${internship.title}')">❤️</button>
        `;
        container.appendChild(internshipDiv);
    });
}

// Remove internship from My List and update local storage
function removeFromMyList(title) {
    const index = myList.findIndex(item => item.title === title);
    if (index !== -1) {
        myList.splice(index, 1); // Remove from local array
        localStorage.setItem('myInternshipList', JSON.stringify(myList)); // Update local storage
        displayInternships(); // Re-display the internships
        alert(`${title} removed from My List!`);
    }
}

// Clear My List button functionality
document.getElementById('clearListButton')?.addEventListener('click', () => {
    localStorage.removeItem('myInternshipList'); // Remove from local storage
    myList.length = 0; // Clear the local array
    displayInternships(); // Re-display the internships
});
