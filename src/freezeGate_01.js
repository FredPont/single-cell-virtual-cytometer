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

//fzgate Freeze Gate : set button on / off
function frzGate(){
    currentvalue = document.getElementById('fzgate').value;
    
    if (currentvalue == "Freeze Gate Off"){
      document.getElementById("fzgate").value="Freeze Gate On";
      document.getElementById("fzgate").innerText="Freeze Gate On";
      document.getElementById("fzgate").classList.add('is-primary')
      window.freezeGate = true
      gatePts()
    } else {
      document.getElementById("fzgate").value="Freeze Gate Off";
      document.getElementById("fzgate").innerText="Freeze Gate Off";
      document.getElementById("fzgate").classList.remove('is-primary')
      window.freezeGate = false
    }
}

function enableFRZG() {
    fzgBut = document.getElementById('fzgate')
    fzgBut.disabled = false
}

function disableFRZG() {
    fzgBut = document.getElementById('fzgate')
    fzgBut.disabled = true
    unClickFreezeGate()
}