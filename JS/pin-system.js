document.addEventListener('DOMContentLoaded', () => {
    const pinnedGames = JSON.parse(localStorage.getItem('pinnedGames') || '[]');
    const originalOrder = [];

    const gameLinks = document.querySelectorAll('.game-link');
    gameLinks.forEach((link, index) => {
        const gameTitle = link.querySelector('.game-title').textContent;
        originalOrder.push({ gameTitle, index });

        const pinButton = document.createElement('span');
        pinButton.className = 'pin-button';
        pinButton.textContent = pinnedGames.includes(gameTitle) ? '💛' : '💜';

        if (pinnedGames.includes(gameTitle)) {
            pinButton.classList.add('pinned');
        }

        pinButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            pinButton.classList.toggle('pinned');
            pinButton.textContent = pinButton.classList.contains('pinned') ? '💛' : '💜';

            let updatedPins;
            if (pinButton.classList.contains('pinned')) {
                updatedPins = [...new Set([...pinnedGames, gameTitle])];
            } else {
                updatedPins = pinnedGames.filter(game => game !== gameTitle);
            }

            try {
                localStorage.setItem('pinnedGames', JSON.stringify(updatedPins));
            } catch (error) {
                console.error('Failed to save pinned games:', error);
                alert('Unable to save changes. Your browser might be in private mode or not support localStorage.');
            }

            reorderGames();
        });

        link.insertBefore(pinButton, link.firstChild);
    });

    function reorderGames() {
        const gameGrid = document.querySelector('.game-grid');
        const games = Array.from(gameGrid.children);

        games.sort((a, b) => {
            const aPinned = a.querySelector('.pin-button').classList.contains('pinned');
            const bPinned = b.querySelector('.pin-button').classList.contains('pinned');

            if (aPinned && !bPinned) return -1;
            if (!aPinned && bPinned) return 1;

            const aTitle = a.querySelector('.game-title').textContent;
            const bTitle = b.querySelector('.game-title').textContent;

            const aOriginalIndex = originalOrder.find(item => item.gameTitle === aTitle).index;
            const bOriginalIndex = originalOrder.find(item => item.gameTitle === bTitle).index;

            return aOriginalIndex - bOriginalIndex;
        });

        gameGrid.innerHTML = '';
        games.forEach(game => gameGrid.appendChild(game));
    }

    reorderGames();
});
