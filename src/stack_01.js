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

function stackTrace(){
   
    currentvalue = document.getElementById('stackButton').value;
   
    if (currentvalue == "Stack Off"){
        document.getElementById("stackButton").value="Stack On";
        document.getElementById("stackButton").innerText="Stack On";
        document.getElementById("stackButton").classList.add('is-primary')
        window.stack = true
        window.stackNB++
      } else {
        document.getElementById("stackButton").value="Stack Off";
        document.getElementById("stackButton").innerText="Stack Off";
        document.getElementById("stackButton").classList.remove('is-primary')
        window.stack = false
        window.stackNB = 0
      }
}


function unStackbutton(){
   
  currentvalue = document.getElementById('stackButton').value;
 
  document.getElementById("stackButton").value="Stack Off";
  document.getElementById("stackButton").innerText="Stack Off";
  document.getElementById("stackButton").classList.remove('is-primary')
  window.stack = false
  window.stackNB = 0
    
}
