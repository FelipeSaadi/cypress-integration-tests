import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent implements OnInit {
  
  pokemon: any;
  pokemons: any;
  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  onChange(event: any): void {
    const value = event.target.value;
    this.getPokemonData(value)
  }

  getAllPokemons(): void {
    this.pokemonService.getAllPokemons().subscribe(data => {
      this.pokemons = data;
      this.getPokemonData(data.results[0].name)
    });
  }

  getPokemonData(name: string): void {
    this.pokemonService.getPokemon(name).subscribe(data => {
      this.pokemon = data;
      this.getPokemonDescription(data.id)
    });
  }

  getPokemonDescription(id: string): void {
    this.pokemonService.getPokemonDescription(id).subscribe(data => {
      this.pokemon = {...this.pokemon, species: {...this.pokemon.species, ...data}}
    });
  }
}
