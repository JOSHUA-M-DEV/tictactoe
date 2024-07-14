const cells=document.querySelectorAll(".cell");
const statustext=document.querySelector("#statusText");
const restart=document.querySelector("#restartbtn");
const winconditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let options=["","","","","","","","",""];
let currentplayer="X";
let running=true;
initializegame();
function initializegame(){
    cells.forEach(cell=>cell.addEventListener("click",cellclicked));
    restart.addEventListener("click",restartgame);
    statustext.textContent=`${currentplayer}'s turn`;
}
function cellclicked(){
const cellIndex=this.getAttribute("cellIndex");
if(options[cellIndex]!="" || !running){
    return;
}
updatecell(this,cellIndex);

checkwinner();
}
function updatecell(cell,index){
options[index]=currentplayer;
cell.textContent=currentplayer;
}
function changeplayer(){
currentplayer=(currentplayer == "X") ? "O" : "X";
statustext.textContent=`${currentplayer}'s turn`;
}

function checkwinner(){
let roundwinner=false;
for(let i=0;i<winconditions.length;i++){
    const condition=winconditions[i];
    const cell0=options[condition[0]];
    const cell1=options[condition[1]];
    const cell2=options[condition[2]];
    if(cell0==""||cell1==""||cell2==""){
        continue;
    }
    if(cell0==cell1 && cell1==cell2){
        roundwinner=true;
        break;
    }

}
if(roundwinner){
statustext.textContent=`${currentplayer}' Wins`;
return;
}
else if(!options.includes("")){
    statustext.textContent=`Draw`;
return false;
}
else{
    changeplayer();
}
}
function restartgame(){
currentplayer="X";
options=["","","","","","","","",""];
statustext.textContent=`${currentplayer}'s turn`;
cells.forEach(cell=>cell.textContent="");
running=true;

}
