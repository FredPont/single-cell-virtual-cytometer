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

// set the freeze gate button to off
function unClickFreezeGate() {
    currentvalue = document.getElementById('fzgate').value;
    if (currentvalue == "Freeze Gate On"){
        document.getElementById("fzgate").value="Freeze Gate Off";
        document.getElementById("fzgate").innerText="Freeze Gate Off";
        document.getElementById("fzgate").classList.remove('is-primary')
        window.quadran = false
    }
}

// enable button Gate Only Off 
function enableGateOnBut() {
    onoffBut = document.getElementById('onoff')
    onoffBut.disabled = false
}

// disable button Gate Only Off 
function disableGateOnBut() {
    onoffBut = document.getElementById('onoff')
    onoffBut.disabled = true
    disableFRZG()
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
    // disable cluster map
    window.clusterMap == false
    
}

// get cluster + clusters number or gene name to plot the cluster or the gene map
// independantly of density plot
function initMapCluster(markerType) {
    var dataLayout = [] // array containing the data and layout of the plot
    var e = document.getElementById("Cluster");
    var ClustName = e.options[e.selectedIndex].value;
    var e2 = document.getElementById("clusterNB");
    var clustNB = e2.value;

    // if no cluster or parameter is selected, window.clusterMap = false
    
    if (ClustName == "-- Select cluster --"){
        window.clusterMap = false
        return
    }

    disableFRZG()       // disable button Freeze Gate
    disableGateOnBut()  // disable button Gate Only Off 

    //console.log(ClustName, clustNB)
    if (clustNB == ""){
        clustNB = -1    // to display all the clusters
    }
    var colValues = window.colValues
    var clusterVal = colValues[ClustName]
    //console.log(clusterVal)
    var type = checkType(clusterVal)
    if (type == "int"){
        dataLayout = plotCluster(ClustName, clustNB, markerType) // plot the map with colored clusters
        window.clusterMap = true
    } else {
        dataLayout = plotGene(ClustName, markerType)    // plot the map with genes/other columns values
    }
    initMapXY()
    return dataLayout
}

// test if array type is float or integer
function checkType(array) {
    const L = array.length
    const regex = /^[0-9]+$/;
    const streg = /[a-zA-Z]/;
    for (var i = 0; i < L; i++){
        // test if array is integer
        if (regex.test(array[i]) == false) {
            if (streg.test(array[i]) == true){
                alert("Strings such as", array[i], " cannot be plotted !")
                throw new FatalError("execution aborted !");
            } else {
                return "float"
            } 
        }
    }
    return "int"
}
