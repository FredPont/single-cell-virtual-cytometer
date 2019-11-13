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


function cumGate(){
    currentvalue = document.getElementById('onoff').value;
    //console.log("bouton", currentvalue)
    //bouton  = document.getElementById('onoff')
    //console.log(bouton)    
    //console.log("state", document.getElementById('onoff').button-active-color)
    if (currentvalue == "Gate Only Off"){
      document.getElementById("onoff").value="Gate Only On";
      document.getElementById("onoff").innerText="Gate Only On";
      document.getElementById("onoff").classList.add('is-primary')
      window.cumulGate = true
      gatePts()
      enableFRZG() // button freeze Gate is enabled when Gate Only is ON
    } else {
      document.getElementById("onoff").value="Gate Only Off";
      document.getElementById("onoff").innerText="Gate Only Off";
      document.getElementById("onoff").classList.remove('is-primary')
      window.cumulGate = false
      frzGate()     // button freeze Gate is OFF when Gate Only is OFF
      disableFRZG() // button freeze Gate is disabled when Gate Only is OFF
      window.cellsInPlot = window.totalCells // reset active cells to total cells
    }
}

// this fonction reduce the initial data table in colValues (signature/gene -> values for all cells)
// to gateColVals (signature/gene -> values for selected cells)
function gatePts() {

    let colValues = window.colValues
    var gateColVals = {}
    //var gateCellNames = []
    let selCellNames = window.selCellNames
    let selCellNamesIndex = cellNameIndex(selCellNames)

    for( var cellName in colValues) {
        gateColVals[cellName] = arraySubSet(colValues[cellName], selCellNamesIndex) // dictionnary cellName => gate values
        //gateCellNames.push(cellName)
    }

    window.gate = gateColVals
    window.gateCellNames = selCellNames
    //console.log("gateCellNames", window.gateCellNames)
}

// find index of cell names in CellNames = window.cellNames array
function cellNameIndex(selCellNames) {
    let CellNames = window.cellNames
    //let selCellNames = window.selCellNames
    var CellNameIndex = {}
    var selCellNamesIndex = []
    // create index : cell name -> position in CellNames array
    for( var i=0; i < CellNames.length; ++i) {
        CellNameIndex[CellNames[i]] = i
    }
    // create array with position in CellNames array of selected cells
    var L = selCellNames.length
    for( var i=0; i < L; ++i) {
        selCellNamesIndex.push(CellNameIndex[selCellNames[i]]) 
    }
    return selCellNamesIndex
}

// select in array a subset where indexes are in index array
function arraySubSet(array, index) {
    var subset = []
    var L = index.length
    for( var i=0; i < L; ++i) {
        subset.push(array[index[i]] ) 
    }
    return subset
    
}