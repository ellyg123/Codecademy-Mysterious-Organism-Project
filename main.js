// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G'];
    return dnaBases[Math.floor(Math.random() * 4)];
  };
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase());
    }
    return newStrand;
  };
  
  const pAequorFactory = (number, dnaStrand) => {
      return {
          specimenNum: number,
          dna: dnaStrand,
          //selects random DNA base and changes it to random selection
          mutate () {
            let randomBaseToChange = Math.floor(Math.random() * 15);
            let changedBase = this.dna[randomBaseToChange];

            for (let i = 0; i < 4; i++) {
                let newBase = returnRandBase();
                if (newBase !== changedBase){
                    this.dna[randomBaseToChange] = newBase;
                    break;
                }
            }
            return this.dna;
          },

          compareDNA (newOrganism) {
              let sameBase = 0;

              for (let i = 0; i < this.dna.length; i++) {
                if (this.dna[i] === newOrganism.dna[i]){
                    sameBase++;
                }
              }
              let percentage = Math.floor(sameBase / this.dna.length * 100);
              let message = `specimen ${this.specimenNum} and specimen ${newOrganism.specimenNum} have ${percentage}% DNA in common`;
              return message;
          },

          willLikelySurvive () {
              const numberOfGC = [];
                for (let i = 0; i < this.dna.length; i++){
                    if (this.dna[i] === 'G' || this.dna[i] === 'C'){
                        numberOfGC.push(this.dna[i]);
                    }
                }
                const GCpercentage = Math.floor(numberOfGC.length / this.dna.length * 100);
                return GCpercentage >= 60;
          },

          complementStrand () {
              const createComplementStrand = [];
              const dnaStrand = this.dna;
              for (let i = 0; i < dnaStrand.length; i++){
                  if (dnaStrand[i] === 'A'){
                      createComplementStrand.push('T');
                  } else if (dnaStrand[i] === 'T'){
                    createComplementStrand.push('A');
                } else if (dnaStrand[i] === 'C'){
                    createComplementStrand.push('G');
                } else if (dnaStrand[i] === 'G'){
                    createComplementStrand.push('C');
                };
              }
              return createComplementStrand;
          }
      }
      
  }

//tests
 const organism1 = pAequorFactory(1, mockUpStrand());
  //console.log(organism1);
  const organism2 = pAequorFactory(2, mockUpStrand());
  //console.log(organism2);

  //console.log(organism1.compareDNA(organism2));
  //console.log(organism1.willLikelySurvive());
  //console.log(organism1.dna)
  //console.log(organism1.complementStrand());

  let survivalBatch = () => {
    const dnaStrandOfOrganisms = [];
    let counter = 1;

    for (i = 1; dnaStrandOfOrganisms.length < 30; i++){
        let possibleOrganism = pAequorFactory(counter, mockUpStrand());
        if (possibleOrganism.willLikelySurvive()) {
            dnaStrandOfOrganisms.push(possibleOrganism);
            counter++;
        }
    }
    return dnaStrandOfOrganisms;
  }

  // test log console.log(survivalBatch());