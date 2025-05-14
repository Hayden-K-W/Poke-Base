const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonContainer = document.getElementById('pokemon-container');

function displayPokemonData(data) {
    
    pokemonContainer.innerHTML = '';
    
    if (!data || !data.name) {
        pokemonContainer.textContent = 'No Pokemon found. Please check your input.';
        return;
    }
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    
    
    const name = document.createElement('h2');
    name.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    
    
    const image = document.createElement('img');
    image.src = data.sprites.front_default;
    image.alt = data.name;
    
    
    const types = document.createElement('p');
    types.textContent = `Type: ${data.types.map(type => 
        type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
    ).join(', ')}`;
    
    
    const stats = document.createElement('div');
    stats.classList.add('stats');
    
    const statsList = document.createElement('ul');
    data.stats.forEach(stat => {
        const statItem = document.createElement('li');
        const statName = stat.stat.name.replace('-', ' ');
        statItem.textContent = `${statName.charAt(0).toUpperCase() + statName.slice(1)}: ${stat.base_stat}`;
        statsList.appendChild(statItem);
    });
    
    stats.appendChild(statsList);
    
    
    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(types);
    card.appendChild(stats);
    

    pokemonContainer.appendChild(card);
}


function searchPokemon() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        pokemonContainer.textContent = 'Please enter a Pokemon name or ID';
        return;
    }
    
    console.log('Searching for:', searchTerm);
    
    
    pokemonContainer.textContent = 'Loading...';
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokemon not found! Check the spelling or try another Pokemon.');
            }
            return response.json();
        })
        .then(data => {
            displayPokemonData(data);
        })
        .catch(error => {
            pokemonContainer.textContent = error.message;
        });
}


searchButton.addEventListener('click', searchPokemon);


searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchPokemon();
    }
});

