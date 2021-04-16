// Attraverso una chiamata ajax all'API di boolean
// https://flynn.boolean.careers/exercises/api/array/music
// avremo a disposizione una decina di dischi musicali. 
// Utilizzando vue, stampiamo a schermo una card per ogni album.
// BONUS: Creare una select con tutti i generi dei dischi.
// In base a cosa scegliamo nella select, vedremo i corrispondenti cd.
// BONUS 2: Ordinare i dischi per anno di uscita.

function init() {
  
    new Vue({
        
      el: '#app',
      
      data: {

        discs: [],
        genres: [],
        selected: 'all'
      },

      methods: {
        
        genreSelect: function(index) {

          const disc = this.discs[index];

          const active = disc.genre == this.selected 
            || this.selected == 'all' ? '' : 'display-none';
          
          return active;
        }
      },
      
      mounted () {

        axios.get('https://flynn.boolean.careers/exercises/api/array/music')
        .then(data => {
          
          this.discs = data.data.response;

          this.discs.sort((a, b) => a.year - b.year);
          
          this.discs.forEach(disc => {
            
            const genres = this.genres;
            const currentGenre = disc.genre;

            if (!genres.includes(currentGenre)) {

              genres.push(currentGenre);
            }
          });
        })
      }          
    })
  }
  
  document.addEventListener('DOMContentLoaded', init);