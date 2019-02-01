// 这是我们的玩家要躲避的敌人
/**
* @description 甲虫类
*/ 
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.initalPositionX = -101;
    this.initalPositionY = parseInt(Math.random() * 3 + 1) * 83 - 20;
    this.moveSpeed = Math.random()*200+200;
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    //你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.initalPositionX += this.moveSpeed * dt; 
    if (this.initalPositionX >= 505 || (this.initalPositionX >= rock.initalPositionX - 101 && this.initalPositionY + 20 == rock.initalPositionY + 45)) {
        this.initalPositionX = -101;
        this.initalPositionY = parseInt(Math.random() * 3 + 1) * 83 - 20;
        this.moveSpeed = Math.random()*200+200;
        this.initalPositionX += this.moveSpeed * dt;
    }
    if (rectangleCol(this.initalPositionX, this.initalPositionY + 20, 101, 83, player.initalPositionX, player.initalPositionY + 41.5, 101, 83)) {
        player.initalPositionX = 202;
        player.initalPositionY = 373.5;
    }
    
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.initalPositionX, this.initalPositionY);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
/**
* @description 玩家类
*/

var Player = function() {
    this.initalPositionX = 202;
    this.initalPositionY = 373.5;
    this.sprite = 'images/char-boy.png';
}
/**
* @description 更新玩家坐标
* param {int} dt - 刷新时间
*/
Player.prototype.update = function(dt) {
    if (this.initalPositionY < 41.5) {
        this.initalPositionX = 202;
        this.initalPositionY = 373.5;
    }
};
/**
* @description 根据玩家坐标绘制玩家
*/
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.initalPositionX, this.initalPositionY);
};
/**
* @description 根据键盘事件更新玩家坐标
** @param {string} key - 键盘监听器返回值
*/
Player.prototype.handleInput = function(key) {
    if (key == "left" && this.initalPositionX >= 101) {
        this.initalPositionX -=  101;
    } 
    if (key == "right" && this.initalPositionX <= 303) {
        this.initalPositionX +=  101;
    }
    if (key == "up" && this.initalPositionY > -41.5) {
        this.initalPositionY -=  83;
    } 
    if (key == "down" && this.initalPositionY < 332) {
        this.initalPositionY +=  83;
    }
};

/**
* @description 石块类
*/
var Rock = function() {
    this.initalPositionX = 3 * 101;
    this.initalPositionY = parseInt(Math.random() * 3 + 1) * 83 - 45;
    this.sprite = 'images/Rock.png';
}
/**
* @description 根据石块坐标绘制甲虫
*/
Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.initalPositionX, this.initalPositionY);
};
/**
* @description 更新石块位置
*/
Rock.prototype.update = function() {
    if (player.initalPositionY < 41.5) {
        this.initalPositionX = 3 * 101;
        this.initalPositionY = parseInt(Math.random() * 3 + 1) * 83 - 45;
    }
};

// From https://blog.csdn.net/xiaohxx/article/details/80657979
/**
* @description 碰撞监测函数
* @param {int} x - 左上角x值
* @param {int} y - 左上角y值
* @param {int} w - 矩形宽
* @param {int} x - 矩形高
*/
function rectangleCol(x1,y1,w1,h1,x2,y2,w2,h2){
            var maxX,maxY,minX,minY;


            maxX = x1+w1 >= x2+w2 ? x1+w1 : x2+w2;
            maxY = y1+h1 >= y2+h2 ? y1+h1 : y2+h2;
            minX = x1 <= x2 ? x1 : x2;
            minY = y1 <= y2 ? y1 : y2;


            if(maxX - minX < w1+w2 && maxY - minY < h1+h2){
              return true;
            }else{
              return false;
            }
}
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var enemy1 = new Enemy;
var enemy2 = new Enemy;
var enemy3 = new Enemy;
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player();
var rock = new Rock();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
