let startBtn=document.querySelector('.btn');
let squares=document.querySelectorAll('.grid div');
let score=document.querySelector('.score-num');
let currentIndex=3;
let blocks=[];
let width=8;
let colorArr=['red','yellow','green','blue'];
let shapeArr=['horline','vertline'];
let currentShape;
let currentColor;
let counter;
let containsBlock=false;
let lost=false;
let blocksPlaced=0;

startBtn.addEventListener('click',function(){
    if(lost===false){
        window.addEventListener('keyup',moveBlocks);
        renderBlocks();
        setInterval(autoMove,1000);
    }
});

function renderBlocks(){
    //debugger;
    if(lost===false){
    blocks=[];
    currentIndex=3;
    containsBlock=false;
    currentColor=randomColor();
    currentShape=randomShape();
    
    switch(shapeArr[currentShape]){
        case 'horline':
            for(i=0;i<3;i++){
                //store the squares which contain the block/[3,4,5]
                makeBlockArray(currentIndex);
                currentIndex++;
            }
        break;
        case 'vertline':
            for(i=0;i<3;i++){
                //store the squares which contain the block/[3,11,19]
                makeBlockArray(currentIndex);
                currentIndex+=width;
            }
        break;
    }
    }
}

function makeBlockArray(currentIndex){
    if(lost===false){
        if(BlockNotPresent(currentIndex)){
            addColor(colorArr[currentColor],currentIndex);
            blocks.push(currentIndex);
        }
        else{
            if(currentIndex>=0 && currentIndex<=7){
                lost=true;           
            }
        }
    }
}

function autoMove(){
    //debugger;
    if(lost===false){
        switch(shapeArr[currentShape]){
            case 'horline':
                if(containsBlock===false){
                    for(i=0;i<3;i++){
                        if(blocks[2]<64){
                            counter=blocks[i];
                            moveSingleBlock(blocks[i]);
                            //if next square doesn't contain a block
                            if(blocks[i]+width<64 && containsBlock===false ){
                                squares[blocks[i]].classList.remove(colorArr[currentColor]);
                                
                            }
                            else if(containsBlock===true){
                                blocks[i]=counter+width;  
                                break;
                            }
                            blocks[i]=counter+width;  
                        }
                        else{
                            blocksPlaced++;
                            updateScore();
                            renderBlocks();
                        }
                    }
                }
                else{
                    blocksPlaced++;
                    updateScore();
                    renderBlocks();
                }
            break;
            case 'vertline':
                if(containsBlock===false){
                    for(i=0;i<3;i++){
                        //if we haven't reached the end of the grid
                        if(!(blocks[2]>=56 && blocks[2]<=63)){
                            counter=blocks[i];
                            if(i===0 ){                               
                                squares[blocks[i]].classList.remove(colorArr[currentColor]);  
                            }
                            //only move the last block
                            if(i===2){
                                moveSingleBlock(blocks[i]);
                                if(blocks[2]+width>=56 && blocks[2]+width<=63 || !BlockNotPresent(blocks[2]+(width*2))){
                                    addColor(colorArr[currentColor],blocks[0]);
                                    containsBlock=true;
                                }
                            }                   
                            blocks[i]=counter+width;
                        }
                        else{
                            blocksPlaced++;
                            updateScore();
                            renderBlocks();
                        }
                    }
                break;
            }
            else{
                blocksPlaced++;
                updateScore();
                renderBlocks();
            }
        }
    }
}

function moveSingleBlock(index){
    if(lost===false){
        index+=width;//19
        if(index<64){
            if(BlockNotPresent(index)){
                addColor(colorArr[currentColor],index);
            }
        }
    }
}

function BlockNotPresent(index){
    if(lost===false){
        if(!(squares[index].classList.contains('red'))&& 
        !(squares[index].classList.contains('yellow')) && 
        !(squares[index].classList.contains('green')) && 
        !(squares[index].classList.contains('blue'))){
            return true;
        }
        else{
            containsBlock=true;
            return false;
        }
    }
}


function addColor(color,currentIndex){
    if(lost===false){
        switch(color){
            case 'red':
                squares[currentIndex].classList.add('red'); 
            break;
            case 'yellow':
                squares[currentIndex].classList.add('yellow');
            break;
            case 'green':
                squares[currentIndex].classList.add('green');
            break; 
            case 'blue':
                squares[currentIndex].classList.add('blue');
            break;       
        }
    }
}

function randomColor(){
    if(lost===false){
        let randColor=Math.floor(Math.random() * colorArr.length) + 0;  
        return randColor;
    }
}

function randomShape(){
    if(lost===false){
        let randShape=Math.floor(Math.random() * shapeArr.length) + 0;  
        return randShape;
    }
}

function updateScore(){
    score.textContent=blocksPlaced;
}

function checkIfBlockNotOnRightEdge(i){
    if(!((blocks[i])%8===7)){
        return true;
    }
    else{
        return false;
    }
}

function checkIfBlockNotOnLeftEdge(i){
    if(!((blocks[i])%8===0)){
        return true;
    }
    else{
        return false;
    }
}

function moveBlocks(e){
    if(lost===false){
        switch(e.keyCode){
            case(37):
                moveBlocksLeft();
                break;
            case(39):
                moveBlocksRight();
                break;
        }
    }
}

function moveBlocksLeft(){
    for(let i=0;i<blocks.length;i++){
        if(BlockNotPresent(blocks[i]-1)){
            if(checkIfBlockNotOnLeftEdge(i)){
                squares[blocks[i]].classList.remove(colorArr[currentColor]);
                blocks[i]=blocks[i]-1;
                addColor(colorArr[currentColor],blocks[i]);
            }
        }
    }
}

function moveBlocksRight(){
    switch(shapeArr[currentShape]){
        case 'horline':
            for(let i=0;i<blocks.length;i++){
                    if(BlockNotPresent(blocks[2]+1)){
                        if(checkIfBlockNotOnRightEdge(2)){
                            if(i===blocks.length-1){
                                squares[blocks[i]+1].classList.remove(colorArr[currentColor]);
                                blocks[i]=blocks[i]+1;
                                addColor(colorArr[currentColor],blocks[i]);
                            }
                            else{
                                if(i===0){
                                    squares[blocks[i]].classList.remove(colorArr[currentColor]);
                                }
                                blocks[i]=blocks[i]+1;
                            }
                        }
                    }
            }
            break;
            case 'vertline':
                for(let i=0;i<blocks.length;i++){
                    if(BlockNotPresent(blocks[i]+1)){
                        if(checkIfBlockNotOnRightEdge(i)){
                            squares[blocks[i]].classList.remove(colorArr[currentColor]);
                            blocks[i]=blocks[i]+1;
                            addColor(colorArr[currentColor],blocks[i]);
                        }
                    }
                }
                break;
    }
}

