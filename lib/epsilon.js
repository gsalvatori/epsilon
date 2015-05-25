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


// TODO: see how to make a real javascript structure for the library


function Epsilon (type) {

    this.leven = standardLevensteinFunction;
    this.DPleven = DPstandardLevensteinFunction;

}


/**
 * Create a new nxm matrix fill with zeros
 * @param  int n 			[row dimension]
 * @param  int m 			[column dimension]
 * @return matrix matrix    [a nxm matrix]
 */
function matrix(n,m){

	matrix = new Array(n);

	for (i = 0; i < matrix.length; i++){
		matrix[i] = new Array(m);
	}

	// fill empty matrix with zeros
	for (var k = 0; k <= n; k++) {
		for (var y = 0; y <= m; y++) {
			matrix[k][y] = 0;
		};
	};

	return matrix;

}
 

/**
 * The standard Levenshtein function
 * @param  string source 				[source string]
 * @param  string target 				[target string]
 * @return int    range[targetLength]   [the levenshtein distance]
 */
function standardLevenshteinFunction(source,target) {
    
	var sourceLength = source.length;
	var targetLength = target.length;

	var range = [];


	for (var i = 1; i <= sourceLength; i++) {
		
		var newRange = [];
		newRange[0] = i;

		for (var j = 1; j <= targetLength; j++) {

			var compare = ( source[i-1] == target[j-1] ) ? 0 : 1;
			newRange[j] = min( range[j]+1, newRange[j-1]+1, range[j-1] + compare );	

		};

		range = newRange;
	};

	return range[targetLength];

}


/* http://en.wikipedia.org/wiki/Levenshtein_distance (http://en.wikipedia.org/wiki/Levenshtein_distance) */

/**
 * Standard levenshtein function with dinamic programming
 * @param string source 	[source string]
 * @param string target 	[target string]
 * @return int distances    [DP levenshtein distance]
 */
function DPstandardLevenshteinFunction(source,target){

	var sourceLength = source.length;
	var targetLength = target.length;

	// we hold all "short" distances between characters
	// in a matrix that will be source.lenght x target.lenght in dimension
	var distances = math.matrix();


	//TODO: i've to optimize this... too many cicles
	for (var i = 0; i <= sourceLength; i++) {
		for (var j = 0; j <= targetLength; j++) {

			distances[i][j] = 0;
			
		};
	};


	for (var k = 1; k <= targetLength; k++) 
		distances[k][0]= k;
	};

	for (var y = 1; y <= sourceLength; y++){
		distances[0][y] = y;
	};


	for (y = 1; y <= sourceLength; y++) {
		for (k = 1; k <= targetLength; k++) {

			// caso base
			if (source.charAt(k) == target.charAt(y)){
				distances[k][y] = distances[k-1][y-1];
			}
			else{
				distances[k][y] = min(distances[k-1][j]+1,distances[k][y-1]+1,distances[k-1][y-1]+1);
			}
			
		};
	};

	return distances[sourceLength][targetLength];

}
