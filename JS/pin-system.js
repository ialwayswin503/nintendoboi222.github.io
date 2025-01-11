document.addEventListener('DOMContentLoaded', () => {
    // Load pinned games from localStorage
    const pinnedGames = JSON.parse(localStorage.getItem('pinnedGames') || '[]');
    
    // Add pin buttons to all game links
    const gameLinks = document.querySelectorAll('.game-link');
    gameLinks.forEach(link => {
        const gameTitle = link.textContent;
        const pinButton = document.createElement('span');
        pinButton.className = 'pin-button';
        pinButton.textContent = '📌';
        
        // Set initial pin state
        if (pinnedGames.includes(gameTitle)) {
            pinButton.classList.add('pinned');
        }
        
        // Handle pin click
        pinButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            pinButton.classList.toggle('pinned');
            
            // Update localStorage
            const updatedPins = pinButton.classList.contains('pinned') 
                ? [...pinnedGames, gameTitle]
                : pinnedGames.filter(game => game !== gameTitle);
                
            localStorage.setItem('pinnedGames', JSON.stringify(updatedPins));
            
            // Reorder games
            reorderGames();
        });
        
        link.insertBefore(pinButton, link.firstChild);
    });
    
    // Function to reorder games
    function reorderGames() {
        const gameGrid = document.querySelector('.game-grid');
        const games = Array.from(gameGrid.children);
        
        games.sort((a, b) => {
            const aPinned = a.querySelector('.pin-button').classList.contains('pinned');
            const bPinned = b.querySelector('.pin-button').classList.contains('pinned');
            
            if (aPinned && !bPinned) return -1;
            if (!aPinned && bPinned) return 1;
            return 0;
        });
        
        games.forEach(game => gameGrid.appendChild(game));
    }
    
    // Initial sort
    reorderGames();
});
