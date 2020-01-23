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

// var initialisation
function initStack() {
    unStackbutton()     // initialisation of stack button
    //window.stack = false    // initialisation of stack button
    window.stackNB = 0      // initialisation of stack number
    window.tSNEdata = []
    window.quadran = false
    window.tSNEcolors = []
    window.dotsize0 = 2
    window.dotsize1 = 4
    window.dotsizeTSNE = 2
    window.cumulGate = false
    window.freezeGate = false
}

// init window data to plot a new tNSE
function initTSNE() {
    unStackbutton()     // initialisation of stack button
    //window.stack = false    // initialisation of stack button
    window.stackNB = 0      // initialisation of stack number
    window.tSNEdata = []
    //window.quadran = false
    window.tSNEcolors = []
}

function initOverlay() {
    window.densPlotOverlayX = []    // initialisation of file overlay cells coordinates
    window.densPlotOverlayY = []
    window.overlay = false
    enableOverlayFileBut()
    enableQGate()
}

function initQuadran() {
    //window.quadran = false
    window.tSNEcolors = []
    window.xQuad = 0            // x position of quandran vertical line
    window.yQuad = 0            // y position of quandran vertical line
    window.QuadPerCentage = []  // percentage of cells in each quadran
    window.quadranX = []        // x coordinates of Q1-Q4
    window.quadranY = []        // y coordinates of Q1-Q4
}


// enable button overlay cells from file
function enableOverlayFileBut() {
    overBut = document.getElementById('overlayCells')
    overBut.disabled = false
}

function initMapXY() {
    var e = document.getElementById("Xmap");
    var xName = e.options[e.selectedIndex].value;
    var e2 = document.getElementById("Ymap");
    var yName = e2.options[e2.selectedIndex].value;
    //var e = document.getElementById("ListeP1");
    
    // return if only one coordinate is selectec
    if (xName == '-- Select X --' || yName == '-- Select Y --')  {
            return
        }
    var CellNames = window.cellNames
    var colValues = window.colValues
    var tsne1 = colValues[xName]
    var tsne2 = colValues[yName]
    // dictionnary cellNames => [tSNE1,tSNE2]
    CellstSNE = DicoCelltSNE(tsne1, tsne2, CellNames)
    window.CellstSNE = CellstSNE
    window.tsne1 = xName
    window.tsne2 = yName
    
}

function initMapCluster() {
    var e = document.getElementById("Cluster");
    var ClustName = e.options[e.selectedIndex].value;
    var e2 = document.getElementById("clusterNB");
    var clustNB = e2.value;
    //console.log(ClustName, clustNB)
    if (clustNB == ""){
        clustNB = -1    // to display all the clusters
    }
    
    plotCluster(ClustName, clustNB) // plot the map with colored clusters
    window.clusterMap = true
}
