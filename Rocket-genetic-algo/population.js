
function Population()
{
	this.rockets = [];
	this.matingPool = [];

	this.initialize = function ()
	{
		for (var i = 0; i < populationSize; i++)
		{
			this.rockets[i] = new Rocket();
      this.rockets[i].id = i;
		}
	}

	this.evaluate = function ()
	{
		var maxFitness = 0;
		for (var i = 0; i < populationSize; i++)
		{
			this.rockets[i].calcFitness();
			if (this.rockets[i].fitness > maxFitness)
			{
				maxFitness = this.rockets[i].fitness;
			}

		}

		bestFitnessP.html("score Gen "+currentGen+" : " + maxFitness);
		currentGen++;

		// normalize fitnesses
		for (var i = 0; i < populationSize; i++) {
      this.rockets[i].fitness /= maxFitness;
    }

		// clear the pool
		this.matingPool = [];

		for (var i = 0; i < populationSize; i++)
		{
			var n = this.rockets[i].fitness * 100;
			for (var j = 0; j < n; j++) {
				this.matingPool.push(this.rockets[i]);
			}


		}
		//console.log("Gen "+ currentGen + " : mating pool size " + this.matingPool.length);
		//console.log(this.matingPool);
	}


  this.selection = function()
  {
    var newRockets = [];

    for(var i = 0; i < this.rockets.length; i++)
    {
      var parentA = random(this.matingPool);
      var parentB = random(this.matingPool);
      var parentADNA = parentA.dna;
      var parentBDNA = parentB.dna;

      var childDNA = parentADNA.crossOver(parentBDNA);
      //console.log("mixing " + parentA.id + " & " + parentB.id);
      childDNA.mutation();
      newRockets[i] = new Rocket(childDNA);
        newRockets[i].dna = childDNA;
      newRockets[i].id = i;
    }
    this.rockets = newRockets;

  }


  this.run = function ()
	{
		for (var i = 0; i < populationSize; i++)  {
      this.rockets[i].update();
    }
	}

	this.draw = function()
	{
			for (var i = 0; i < populationSize; i++)
			{
				this.rockets[i].show();
			}
	}

}
