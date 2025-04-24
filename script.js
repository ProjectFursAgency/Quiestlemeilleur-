// Initialize vote counts if no existing votes
let votesYetanotherbeast = localStorage.getItem('votesYetanotherbeast') ? parseInt(localStorage.getItem('votesYetanotherbeast')) : 0;
let votesKaitoVR = localStorage.getItem('votesKaitoVR') ? parseInt(localStorage.getItem('votesKaitoVR')) : 0;

// Function to handle voting
function vote(tiktoker) {
    // Check if the user has already voted
    if (localStorage.getItem('hasVoted')) {
        alert('Tu as déjà voté !');
        return;
    }

    // Update the vote count
    if (tiktoker === 'yetanotherbeast') {
        votesYetanotherbeast++;
        localStorage.setItem('votesYetanotherbeast', votesYetanotherbeast);
    } else if (tiktoker === 'kaito.vr') {
        votesKaitoVR++;
        localStorage.setItem('votesKaitoVR', votesKaitoVR);
    }

    // Mark that the user has voted
    localStorage.setItem('hasVoted', 'true');

    // Update the displayed vote counts
    updateVotes();
    alert('Ton vote a été envoyé avec succès !');
}

// Function to get and display current vote counts
function updateVotes() {
    document.getElementById('votes-yetanotherbeast').textContent = `Votes: ${votesYetanotherbeast}`;
    document.getElementById('votes-kaito.vr').textContent = `Votes: ${votesKaitoVR}`;
}

// Initial vote count update
updateVotes();
