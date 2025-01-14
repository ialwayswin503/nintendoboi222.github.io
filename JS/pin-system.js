document.addEventListener('DOMContentLoaded', () => {
    const pinnedGames = JSON.parse(localStorage.getItem('pinnedGames') || '[]');
    
    const gameLinks = document.querySelectorAll('.game-link');
    gameLinks.forEach(link => {
        const gameTitle = link.textContent;
        const pinButton = document.createElement('span');
        pinButton.className = 'pin-button';
        pinButton.textContent = pinnedGames.includes(gameTitle) ? '🌟' : '⭐';
        
        if (pinnedGames.includes(gameTitle)) {
            pinButton.classList.add('pinned');
        }
        
        pinButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            pinButton.classList.toggle('pinned');
            pinButton.textContent = pinButton.classList.contains('pinned') ? '🌟' : '⭐';
            
            const updatedPins = pinButton.classList.contains('pinned') 
                ? [...pinnedGames, gameTitle]
                : pinnedGames.filter(game => game !== gameTitle);
                
            localStorage.setItem('pinnedGames', JSON.stringify(updatedPins));
            
            reorderGames();
        });
        
        link.insertBefore(pinButton, link.firstChild);
        
        link.addEventListener('click', (e) => {
            if (e.target.classList.contains('pin-button')) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });
    
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
    
    reorderGames();
});
