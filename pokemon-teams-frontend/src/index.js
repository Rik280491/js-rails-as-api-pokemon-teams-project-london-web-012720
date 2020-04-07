document.addEventListener("DOMContentLoaded", () => {
	const BASE_URL = "http://localhost:3000/";
	const pokemonsUrl = BASE_URL + "pokemons/";
	const trainersUrl = BASE_URL + "trainers/";

	const main = document.querySelector("main");
	

	const fetchAllTrainers = () => {
		return fetch(trainersUrl)
			.then((resp) => resp.json())
			.then((trainers) => renderTrainers(trainers));
	};

	// fetchAllTrainers().then(renderAllTrainers)
	const renderTrainers = (trainers) => {
		trainers.forEach(renderTrainer);
	};

	const renderTrainer = (trainer) => {
		const divCard = document.createElement("div");
		divCard.className = "card";

		const name = document.createElement("p");
		name.innerText = trainer.name;

		const dataTrainerButton = document.createElement("button");
		dataTrainerButton.innerText = "Add Pokemon";
		dataTrainerButton.addEventListener("click", (event) => {
			handleFormSubmit(event, trainer, divCard);
			console.log(trainer);
		});
		
		divCard.append(name, dataTrainerButton);
		renderTrainerPokemon(divCard, trainer)

		main.append(divCard);
	}
	

	const renderTrainerPokemon = (divCard, trainer) => {

		const prevUl = divCard.querySelector("ul")
		if (prevUl) {
			prevUl.remove()
		}
	
		const unorderedListTrainers = document.createElement("ul");
		

		trainer.pokemons.forEach((pokemon) => {
			const listOfPokemon = document.createElement("li");
			listOfPokemon.innerText = `${pokemon.nickname}(${pokemon.species})`;

			const releaseButton = document.createElement("button");
			releaseButton.className = "release";
			releaseButton.innerText = "Release";
			
			
			releaseButton.addEventListener("click", (event, trainer) => {
				console.log(trainer)
				event.preventDefault()
				fetch(`${pokemonsUrl}/${pokemon.id}`, {
					method: "DELETE"
				}).then(() => listOfPokemon.remove())
			})
			listOfPokemon.append(releaseButton);
			unorderedListTrainers.append(listOfPokemon);
			
		})

		divCard.append(unorderedListTrainers)
	};
	const handleFormSubmit = (event, trainer, divCard) => {
		event.preventDefault();

		const configObject = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				trainer_id: trainer.id,
			}),
		};
		fetch(pokemonsUrl, configObject)
			.then((resp) => resp.json())
			.then((pokemon) => {
				trainer.pokemons.push(pokemon)
				console.log(trainer)

				renderTrainerPokemon(divCard, trainer)
				
			});
	};
	// <main>
	//   <!-- Add our Pokemon -->
	//   <div class="card" data-id="1"><p>Prince</p>
	// //     <button data-trainer-id="1">Add Pokemon</button>
	// //     <ul>
	// //       <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
	// //       <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
	// //       <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
	// //       <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
	// //       <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
	// //     </ul>
	// //   </div>

	// </main>

	fetchAllTrainers();
});
