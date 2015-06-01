/*

 epsilon

 Copyright(c) 2015 Gabriele Salvatori
 http://www.salvatorigabriele.com
 salvatorigabriele@gmail.com

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.


 */


var epsilon = (function () {


	/**
	 * Find minimum value of all the arguments
	 * much faster than Math.min
	 * @return min minimum value
	 */
	var levenMin = function(){

		var length = arguments.length;
		var min = Infinity;

		while (length--) {
			if (arguments[length] < min) {
				min = arguments[length];
			}
		}

		return min;

	};


	/**
	 * Create a new nxm matrix fill with zeros
	 * @param  {int}     n		 row dimension
	 * @param  {int}     m	     column dimension
	 * @return {matrix}  matrix  a nxm matrix
	 */
	var matrix = function(n,m){

		var matrix = [];

		for (i=0; i<n; i++) {
			matrix[i] = [];
			for (j=0; j<m; j++) {
				matrix[i][j]=0;
			}
		}

		return matrix;

	};


	/**
	 * Create an array range from start to edge
	 * @param  {int}   start description
	 * @param  {int}   edge  description
	 * @param  {int}   step  description
	 * @return {array} ret   description
	 */
	var createRange = function(start,edge,step){

	    // If only one number was passed in make it the edge and 0 the start.
		if (arguments.length == 1) {
			edge = start;
			start = 0;
		}
	 
	  	// Validate the edge and step numbers.
	  	edge = edge || 0;
	  	step = step || 1;
	 
	  	// Create the array of numbers, stopping befor the edge.
	  	for (var ret = []; (edge - start) * step > 0; start += step) {
	    	ret.push(start);
	  	}

	  	return ret;

	};


	//public methods
	return {

		/**
		* The standard Levenshtein function
		* @param  {string} source  source string
		* @param  {string} target  target string
		* @return {int}    range   the levenshtein distance
		*/
		leven: function(source,target) {

			var sourceLength = source.length;
			var targetLength = target.length;

			var range = createRange(0,targetLength+1,1);


			for (var i = 1; i <= sourceLength; i++) {

				var newRange = [];
				newRange[0] = i;

				for (var j = 1; j <= targetLength; j++) {

					// if the characther of the first string is equal to the second, then the LD is 0
					// else is 1
					var compare = ( source[i-1] == target[j-1] ) ? 0 : 1;
					newRange[j] = levenMin( range[j]+1, newRange[j-1]+1, range[j-1] + compare );

				}

				range = newRange;

			}

			return range[targetLength];
		
		},


		/**
		* Standard levenshtein function with dinamic programming
		* @param  {string} source 	  source string
		* @param  {string} target 	  target string
		* @return {int}    distances  DP levenshtein distance
		*/
		DPLeven: function(source,target){

			var sourceLength = source.length;
			var targetLength = target.length;

			// we hold all "short" distances between characters
			// in a matrix that will be source.lenght x target.lenght in dimension
			var distances = matrix(sourceLength,targetLength);


			for (var k = 0; k <= targetLength-1; k++){
				distances[k][0]= k;
			}

			for (var y = 0; y <= sourceLength-1; y++){
				distances[0][y] = y;
			}


			for (y = 1; y < sourceLength; y++) {
				for (k = 1; k < targetLength; k++) {

					// caso base
					if (source.charAt(k) == target.charAt(y)){
						distances[k][y] = distances[k-1][y-1];
					}
					else{
						distances[k][y] = levenMin(distances[k-1][y]+1,distances[k][y-1]+1,distances[k-1][y-1]+1);
					}

				}
			}

			return distances[sourceLength-1][targetLength-1];

		},


        // check if this function actually works
        

		/**
		 * [OSADistance description]
		 * @param  {string} source description
		 * @param  {string} target description
		 * @return {int}    table  description
		 */
		OSADistance: function(source,target){

			var sourceLength = source.length;
			var targetLength = target.length;

			var table = matrix(sourceLength,targetLength);

			var cost = 0;

			for (var i = 0; i < sourceLength; i++) {
				table[i][0] = i;
			}

			for (var j = 0; j < targetLength; j++) {
				table[j][0] = j;
			}

			for (var k = 1; k < sourceLength; k++) {
				for (var y = 1; y < targetLength; y++) {

					cost = ( source[k] == target[y] ) ? 0 : 1;

					table[k][y] = levenMin(table[k-1][y] + 1, table[k][y-1] + 1, table[k-1][y-1] + cost);

					// this is the actual optimization
					if(k > 1 & y > 1 & source[k] == target[y-1] & source[k-1] == target[y]){

						table[k][y] = levenMin(table[k][y], table[k-2][y-2] + cost, null);

					}

				}
			}

			return table[sourceLength-1][targetLength-1];

		},


		/**
		 * [DLevenshtein description]
		 * @param  {} source description
		 * @param  {} target description
		 * @return {} 	     description
		 */
		DLevenshtein: function(source,target){

			var sourceLength = source.length;
			var targetLength = target.length;

			if (sourceLength === 0 || targetLength === 0){
				return Math.max(sourceLength,targetLength);
			}else{

				var cost = (source[sourceLength-1] != target[targetLength-1]) ? 1 : 0;
				var H1 = source.substring(0,sourceLength-1);
				var H2 = target.substring(0,targetLength-1);

				if (sourceLength>1 && targetLength>1 && source[sourceLength-1] == target[targetLength-2]
				&& source[sourceLength-2] == target[targetLength-1]) {

					return levenMin(

					this.DLevenshtein(H1,target)+1,
					this.DLevenshtein(source,H2)+1,
					this.DLevenshtein(H1,H2)+cost,
					this.DLevenshtein(source.substring(0,sourceLength-2),target.substring(0,targetLength-2)+1)

					);

				}

				return levenMin(

				this.DLevenshtein(H1,target)+1,
				this.DLevenshtein(source,H2)+1,
				this.DLevenshtein(H1,H2)+cost

				);

			}

		},


		/**
		* [hammingDistance description]
		* @param  {} source    description
		* @param  {} target    description
		* @return {} distance  description
		*/
		hamming: function(source,target){

			var distance = 0;
			var value = source ^ target;

			while(value !== 0){
				distance++;
				value &= value-1;
			}

			return distance;

		},


		/**
		 * [bitap description]
		 * @param  {[type]} string  [description]
		 * @param  {[type]} pattern [description]
		 * @return {[type]}         [description]
		 */
		// bitap: function(string,pattern){

		// 	var patternLength = pattern.length;

		// 	if (patternLength == 0){
		// 		return string;
		// 	}

		// 	// initialization of the R bit array
		// 	var R = []
		// 	R[0] = 1;

		// 	for (var i=1; i < patternLength+1; i++) {
		// 		R[i] = 0;
		// 	}

		// 	for (var k = 0; k < string.length; k++) {
		// 		for (var y = patternLength; y >= 1; y--) {

		// 			R[y] = R[y-1] & (string[k] == pattern[y-1]);

		// 			if( (R & (1UL << m) == 0 ){

		// 			}

		// 		}
		// 	}

		// 	return null;

		// }

	};


})();

