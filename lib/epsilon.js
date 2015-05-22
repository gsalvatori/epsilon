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

}
 

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
function DPstandardLevenshteinFunction(source,target){



}
