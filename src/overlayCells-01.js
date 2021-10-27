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



// open a file on the disk and extract data and colnames in dictionnary "colValues"
        
function overlayFile() {
    
    var input = document.getElementById("overlayCells").files[0]
    
    progBar() // progress bar

    
    var reader = new FileReader();
    window.overlay = true
    // fill colValues with data from file
    reader.onload = function(){
        var text = reader.result                // read all file in one string
        var fileLines = text.split("\n")        // array of all lines
        window.overlayCellNames = fileLines
        
        overlayXY()
                 
    };

    setTimeout(function(){ 
       reader.readAsText(input); 
       document.getElementById("overlayCells").value = null // reset openfile button
    },1000)
    
    
    return
};

function overlayXY() {
    overlayCellNames = window.overlayCellNames
    userPar1 = window.userPar1
    userPar2 = window.userPar2
    
    allCellNames = window.cellNames 
    
    cellsExist = isIn(allCellNames, overlayCellNames) // veryfy that cell names from file exist in the density plot
    if (cellsExist == false ) {
        inter = intersect(allCellNames, overlayCellNames) // intersection of cell names between file and density plot
        if (inter.length == 0) {
            alert("Cells in uploaded file do not exist in density plot !")
            return
        } else {
            maxCells = Math.max(allCellNames.length, overlayCellNames.length)
            alert("Only " + inter.length + "/" + maxCells + " cells can be displayed in density plot !")
            cellsIndex = cellNameIndex(inter) // index of cells to overlay
        }   
    } else {
        cellsIndex = cellNameIndex(overlayCellNames) // index of cells to overlay
    }
    
    x = coordinate(cellsIndex,userPar1,userPar2)[0]
    y = coordinate(cellsIndex,userPar1,userPar2)[1]
    window.densPlotOverlayX = x
    window.densPlotOverlayY = y

    overlayPlotDensity(x,y) // overlay cells from file on plot density
    x_tSNE = tSNEoverlyXY(cellsIndex)[0]
    y_tSNE = tSNEoverlyXY(cellsIndex)[1]
    // overlay on t-SNE
    var colValues = window.colValues
    var color2 = '#bcb2b2';
    plotTSNE(colValues, color2 , userPar1, userPar2, x_tSNE, y_tSNE)
    
}

// keep stack button on
function stackTraceOn(){
   
    currentvalue = document.getElementById('stackButton').value;
   
    if (currentvalue == "Stack Off"){
        document.getElementById("stackButton").value="Stack On";
        document.getElementById("stackButton").innerText="Stack On";
        document.getElementById("stackButton").classList.add('is-primary')
        window.stack = true
        window.stackNB++
      } else {
        window.stackNB++
      }
}

// test if array b is included in a
function isIn(a, b) {
   test = b.every(v => a.includes(v)) // true if b is a subset of a and false otherwice
   return test
}

// intersection of 2 arrays
function intersect(array1, array2){
    inter = array1.filter(value => array2.includes(value))
    return inter
}

// computes coordinates of uploaded cell names from their index
function coordinate(cellsIndex,userPar1,userPar2) {
    x = []
    y = []
    colValues = window.colValues

    var L = cellsIndex.length
    for (let i = 0; i < L; i++) {
       x.push(colValues[userPar1][cellsIndex[i]]) 
       y.push(colValues[userPar2][cellsIndex[i]])
    }
    return [x, y]
}

// overlay cells from file on plot density
function overlayPlotDensity(x,y) {
    
    setDotSize0() // set dot size of graphe 0
    dotsize0 = window.dotsize0

    var trace1 = {
    x: x,
    y: y,
    mode: 'markers',
    name: 'points',
    marker: {
        //color: 'rgb(0,255,148)',
        color: 'red',
        size: dotsize0,
        opacity: 1
    },
    type: 'scattergl'
    };

    var layout = {
        showlegend: false,
        autosize: false,
        width: 550,
        height: 550,
        margin: {t: 50},
        hovermode: 'closest',
        bargap: 0,
        dragmode: 'lasso',
        xaxis: {
            domain: [0, 0.85],
            showgrid: false,
            zeroline: true,
            title: {
                text: userPar1,
                font: {
                  family: 'Courier New, monospace',
                  size: 18,
                  color: '#000000'
                }
              }
        },
        yaxis: {
            domain: [0, 0.85],
            showgrid: false,
            zeroline: true,
            title: {
                text: userPar2,
                font: {
                  family: 'Courier New, monospace',
                  size: 18,
                  color: '#000000'
                }
              }
        },
        xaxis2: {
            domain: [0.85, 1],
            showgrid: false,
            zeroline: false
        },
        yaxis2: {
            domain: [0.85, 1],
            showgrid: false,
            zeroline: false
        }
        };


    densplot = document.getElementById('densplot');
    // Plotly.purge(densplot); // clear plot density . purge done already in densityPlot()
    // coordinate of active plot density
    x1 = window.densityPlot.activeX
    y1 = window.densityPlot.activeY
    userPar1 = window.userPar1
    userPar2 = window.userPar2

    densityPlot(x1,y1,userPar1,userPar2, 'rgb(182, 177, 188)', 'densplot')
    //Plotly.plot(densplot, [trace1], layout)
    //Plotly.react(densplot, [trace1], layout, {responsive: true})
    Plotly.addTraces(densplot, [trace1])
}

// calculate t-SNE coordinates of overlay cells
function tSNEoverlyXY(cellsIndex) {
    x = []
    y = []
    colValues = window.colValues
    var xName = window.tsne1
    var yName = window.tsne2
    var tsne1 = colValues[xName]
    var tsne2 = colValues[yName]

    var L = cellsIndex.length
    for (let i = 0; i < L; i++) {
        x.push(tsne1[cellsIndex[i]]) 
        y.push(tsne2[cellsIndex[i]])
    }
    return [x, y]
}
    
