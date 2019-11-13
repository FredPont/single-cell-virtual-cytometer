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

//quadgate Quadrant Gate 
function quadranGate(){
    currentvalue = document.getElementById('quadgate').value;
    initQuadran()
    if (currentvalue == "Quadrants Off"){
      document.getElementById("quadgate").value="Quadrants On";
      document.getElementById("quadgate").innerText="Quadrants On";
      document.getElementById("quadgate").classList.add('is-primary')
      window.quadran = true
      showData()
    } else {
      document.getElementById("quadgate").value="Quadrants Off";
      document.getElementById("quadgate").innerText="Quadrants Off";
      document.getElementById("quadgate").classList.remove('is-primary')
      window.quadran = false
      showData()
    }
}

function enableQGate() {
    initQuadran()
    QdeGBut = document.getElementById('quadgate')
    QdeGBut.disabled = false
}

function disableQGate() {
    initQuadran()
    QdeGBut = document.getElementById('quadgate')
    QdeGBut.disabled = true
}

// split dense plot cells with quandrants and x,y click position
function quadSplit(xClic,yClic) {
    document.title = "updating..."
    progBar() // progress bar

    // x, y coordinates of cells in density plot
    x = window.densityPlot.activeX
    y = window.densityPlot.activeY
    Qx = []
    Qy = []
    Qnames = []

    // one array / quadrant initialization
    for (let i = 1; i < 5; i++) {
        Qx[i] = []
        Qy[i] = []
    }
    var L = x.length
    for (let i = 0; i < L; i++) {
        if (x[i] <= xClic & y[i] >= yClic) {
            Qx[1].push(x[i])
            Qy[1].push(y[i])
        } else if (x[i] >= xClic & y[i] >= yClic) {
            Qx[2].push(x[i])
            Qy[2].push(y[i])
        } else if (x[i] >= xClic & y[i] <= yClic) {
            Qx[3].push(x[i])
            Qy[3].push(y[i])
        } else if (x[i] <= xClic & y[i] <= yClic) {
            Qx[4].push(x[i])
            Qy[4].push(y[i])
        }
    }

    var totCellNB = 0
    for (let i = 1; i < 5; i++) {
        Qnames[i] = selectedCellNames(Qx[i], Qy[i], x, y)
        totCellNB = totCellNB + Qnames[i].length
    }

    // calculate percentages Q1, Q2, Q3, Q4
    Qprop = []
    for (let i = 1; i < 5; i++) {
        Qprop[i] = parseFloat(Qnames[i].length/totCellNB*100).toFixed(2);
        //console.log("Q" + i + "=" + Qprop[i] )
    }
   
    
    var color1 = '#7b3294';
    window.xQuad = xClic            // x position of quandran vertical line
    window.yQuad = yClic            // y position of quandran vertical line
    window.QuadPerCentage = Qprop   // percentage of cells in each quadran
    window.quadranX = Qx            // x coordinates of Q1-Q4
    window.quadranY = Qy            // y coordinates of Q1-Q4
    window.quadranNames = Qnames    // cell names of quadrant Q1-Q4

    tSNEquandran(Qnames)

    densityPlotQuadran(x,y,window.userPar1,window.userPar2,color1, 'densplot', xClic, yClic, Qprop, Qx, Qy)
    document.title = "Single Cell Virtual Cytometer"

    return
}

function tSNEquandran(Qnames) {

    CellstSNE = window.CellstSNE
    var x2 = [];
    var y2 = [];
    var legend = "";

    initTSNE() // purge tSNE plot
    Plotly.purge('graph2')
    // enable stack button when it is off
    if (window.stack == false) {
        stackTrace()
    }
    
    
    for (let j = 1; j <= 4; j++) {
        var L = Qnames[j].length
        for (var i=0; i < L; ++i) {
                x2.push(CellstSNE[Qnames[j][i]][0])
                y2.push(CellstSNE[Qnames[j][i]][1])
                
        }
        legend = "Q" + j + " (" + window.userPar1 + " + " + window.userPar2 + ")"
        plotTSNE(colValues, '#bcb2b2', window.userPar1, window.userPar2, x2, y2, legend)
        x2 = [];
        y2 = [];
    }
    
}