// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Written by Frederic PONT.
//(c) Frederic Pont 2019


// x, y = selected dots
// x1, y1 = selected columns containing x,y pairs
// selectedCellNames return an array with the name of selected cells
function selectedCellNames(x, y, x1, y1){
    
    var selCellNames = {}
   
    // dictionnary cellNames => [tSNE1,tSNE2]
    CellstSNE = window.CellstSNE
    
    // dictionnary x1_y1 => array[cellNames] because some cells have exactly the same x1 y1 !
    X1Y1CellNames = DicoX1Y1CellNames(x1, y1)

    // search valid xy pairs in X1Y1CellNames
    var L = x.length
    for( var i=0; i < L; ++i) {
        testKey = x[i].toString() + "_" + y[i].toString()
        if ( testKey in X1Y1CellNames) {
            cNames = X1Y1CellNames[testKey]
            var L2 = cNames.length
            for (var j = 0; j < L2; j++) {
                selCellNames[cNames[j]] = true
            }
        }
    }

    //console.log("selCellNames", selCellNames)
    return Object.keys(selCellNames)
}


// create dictionnary X1_Y1 => CellName
function DicoX1Y1CellNames(x1, y1){
    //var CellNames = window.cellNames

    
    if (window.cumulGate == true) {
        CellNames = window.gateCellNames
    } else {
        CellNames = window.cellNames
    }
    
    
    X1Y1CellNames = {}
    var L = x1.length
    for(var i=0; i < L; ++i) {
        key = x1[i].toString() + "_" + y1[i].toString()
        if ( key in X1Y1CellNames) {
            X1Y1CellNames[key].push(CellNames[i]) // if the key x1y1 already exists, the cell name with same coordinates is appended
        } else {
            X1Y1CellNames[key] = [CellNames[i]]
        }
        
    }

    //console.log("X1Y1CellNames", X1Y1CellNames)
    return X1Y1CellNames
}