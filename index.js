var arr = [];
function idGet(id) {
    return document.getElementById(id);
}
var obj = {
    ROW:4,
    CELL:4,
    win:0,
    i:0,
    j:0,
    k:0,
    score:0,
    getStart:function(){
        idGet('result').style.display = 'none';
        obj.score =0;
        obj.win=0;
        idGet("score").innerHTML = obj.score; //更新分数
        arr=[];
        for(i=0;i<obj.ROW;i++){
            arr[i] = [];
            for (j=0;j<obj.CELL;j++) {
                arr[i].push(0);
                idGet('cell'+i+j).innerHTML = "";
                idGet('cell'+i+j).className = 'box';
            }
        }
        obj.random();
        obj.random();
        document.onkeydown = function(e) { //自动获得事件对象
            switch (e.keyCode) { //判断按键号
                case 37:
                    obj.left();
                    break;
                case 38:
                    obj.top();
                    break;
                case 39:
                    obj.right();
                    break;
                case 40:
                    obj.bottom();
                    break;
            }
            idGet("score").innerHTML = obj.score; //更新分数
        }
    },
    random:function(pos){
        var cell,row;
        while(true){
            row = Math.floor(obj.ROW*Math.random());
            cell = Math.floor(obj.CELL*Math.random());
            if(arr[row][cell]==0){
                arr[row][cell] = Math.random()>0.5?2:4;
                idGet('cell'+row+cell).innerHTML = arr[row][cell];
                idGet('cell'+row+cell).className = 'box n'+arr[row][cell];
                break;
            }
        }
    },
    update:function(row,cell,num){
        arr[row][cell]=num;
        if(num==0){
            idGet('cell'+row+cell).innerHTML = "";
            idGet('cell'+row+cell).className = 'box';
        }else{
            idGet('cell'+row+cell).innerHTML = num;
            idGet('cell'+row+cell).className = 'box n'+num;
        }
        if(num==2048){
            obj.win=1;
        }
    },
    left:function(){
        var flag = 0;
        for(i=0;i<obj.ROW;i++){
            for (j=0;j<obj.CELL;j++) {
                //找到右侧第一个非空位置
                //1、当前位置为空
                //  非空元素移到当前位置
                //  在当前位置再次循环查找
                //2、当前位置不为空
                //  2.1当前位置与非空元素相等
                //      合并
                //  2.2不相等
                //      不动
                //寻找右侧第一个非空位置
                next=null;
                for(k=j+1;k<obj.CELL;k++){
                    if(arr[i][k]!=0){
                        next = k;
                        break;
                    }
                }
                if(next==null){
                    continue;
                }
                //当前位置为空
                if(arr[i][j]==0){
                    obj.update(i,j,arr[i][next]);
                    obj.update(i,next,0);
                    flag=1;
                    j--;
                }else if(arr[i][j]==arr[i][next]){
                    //当前位置不为空，且相等
                    obj.score+=arr[i][next]*2;
                    obj.update(i,j,arr[i][next]*2);
                    obj.update(i,next,0);
                    flag=1;
                }
            }
        }
        if(flag!=0){
            obj.random();
            obj.gameOver();
        }

    },
    top:function(){
        var flag=0;
        for(i=0;i<obj.CELL;i++){
            for(j=0;j<obj.ROW;j++){
                //找到下侧第一个非空位置
                //1、当前位置为空
                //  非空元素移到当前位置
                //  在当前位置再次循环查找
                //2、当前位置不为空
                //  2.1当前位置与非空元素相等
                //      合并
                //  2.2不相等
                //      不动
                //寻找下侧第一个非空位置
                next=null;
                for(k=j+1;k<obj.CELL;k++){
                    if(arr[k][i]!=0){
                        next = k;
                        break;
                    }
                }
                if(next==null){
                    continue;
                }
                //当前位置为空
                if(arr[j][i]==0){
                    obj.update(j,i,arr[next][i]);
                    obj.update(next,i,0);
                    flag=1;
                    j--;
                }else if(arr[j][i]==arr[next][i]){
                    //当前位置不为空，且相等
                    obj.score+=arr[next][i]*2;
                    obj.update(j,i,arr[next][i]*2);
                    obj.update(next,i,0);
                    flag=1;
                }

            }
        }
        if(flag!=0){
            obj.random();
            obj.gameOver();
        }
    },
    right:function(){

        var flag=0;
        for(i=0;i<obj.CELL;i++){
            for(j=obj.ROW-1;j>=0;j--){
                //找到左侧第一个非空位置
                //1、当前位置为空
                //  非空元素移到当前位置
                //  在当前位置再次循环查找
                //2、当前位置不为空
                //  2.1当前位置与非空元素相等
                //      合并
                //  2.2不相等
                //      不动
                //寻找左侧第一个非空位置
                next=null;
                for(k=j-1;k>=0;k--){
                    if(arr[i][k]!=0){
                        next = k;
                        break;
                    }
                }
                if(next==null){
                    continue;
                }
                //当前位置为空
                if(arr[i][j]==0){
                    obj.update(i,j,arr[i][next]);
                    obj.update(i,next,0);
                    flag=1;
                    j++;
                }else if(arr[i][j]==arr[i][next]){
                    //当前位置不为空，且相等
                    obj.score+=arr[i][next]*2;
                    obj.update(i,j,arr[i][next]*2);
                    obj.update(i,next,0);
                    flag=1;
                }

            }
        }
        if(flag!=0){
            obj.random();
            obj.gameOver();
        }
    },
    bottom:function(){
        var flag=0;
        for(i=0;i<obj.CELL;i++){
            for(j=obj.ROW-1;j>=0;j--){
                //找到上侧第一个非空位置
                //1、当前位置为空
                //  非空元素移到当前位置
                //  在当前位置再次循环查找
                //2、当前位置不为空
                //  2.1当前位置与非空元素相等
                //      合并
                //  2.2不相等
                //      不动
                //寻找上侧第一个非空位置
                next=null;
                for(k=j-1;k>=0;k--){
                    if(arr[k][i]!=0){
                        next = k;
                        break;
                    }
                }
                if(next==null){
                    continue;
                }
                //当前位置为空
                if(arr[j][i]==0){
                    obj.update(j,i,arr[next][i]);
                    obj.update(next,i,0);
                    flag=1;
                    j++;
                }else if(arr[j][i]==arr[next][i]){
                    //当前位置不为空，且相等
                    obj.score+=arr[next][i]*2;
                    obj.update(j,i,arr[next][i]*2);
                    obj.update(next,i,0);
                    flag=1;
                }

            }
        }
        if(flag!=0){
            obj.random();
            obj.gameOver();
        }
    },
    gameOver:function(){
        if (obj.win == 1) { //通关
            idGet('result').style.display = 'block';
            idGet('res').innerHTML = 'Congratulations！You win!'
        }
        if (obj.isFailed()) { //游戏失败
            idGet('result').style.display = 'block';
            idGet('res').innerHTML = 'gameOver!Try Again?'
        }
    },
    isFailed:function(){
        for(i=0;i<obj.ROW;i++){
            for(j=0;j<obj.CELL;j++){
                if(arr[i][j]==0){
                    return false;
                }else if(i!=obj.ROW-1&&arr[i][j]==arr[i+1][j]){
                    //下方有相同
                    return false;
                }else if(j!=obj.CELL-1&&arr[i][j]==arr[i][j+1]){
                    //右方有相同
                    return false;
                }
            }
        }
        return true;
    }
}

window.onload = function(){
    obj.getStart();
};