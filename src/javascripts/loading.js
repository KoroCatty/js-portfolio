//Loading animation
window.onload = setTimeout(function () {
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
}, 3000);

// setTimeout(function(){console.log("10秒経過しました")},10000);

// Canvas JS
(() => {
  //クラスの記載
  class Icon {
    constructor(canvas) {
      this.ctx = canvas.getContext('2d');
      // --------------------------------------------------------------
      this.width = canvas.width;
      this.height = canvas.height;
      this.r = 15; // 円の大きさ

      this.angle = 0;//座標空間を何度回転させるかかく
    }
    // drawメソッド　（描画の為）
    draw() {

      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      this.ctx.fillRect(0, 0, this.width, this.height); 

      // save
      this.ctx.save(); 

      this.ctx.translate(this.width / 2, this.height / 2);
      this.ctx.rotate(Math.PI / 180 * this.angle); 

      // particles
      this.ctx.beginPath();
      this.ctx.moveTo(0, -this.r - 5);
      this.ctx.lineTo(0, -this.r + 4);
      this.ctx.strokeStyle = 'lightblue';
      this.ctx.lineWidth = 1.5;

      this.ctx.stroke();

      this.ctx.restore(); // saveした原点をここで元に戻す
    }

    //更新系の処理はこれにまとめる
    update() {
      this.angle += 12; // 12度ずつ増やす
    }

    // runメソッド
    run() {
      this.update();// this has to be Before draw method
      this.draw();

      // run() を繰り返し実行したいので、 setTimeout() を使用
      setTimeout(() => {
        this.run();
      }, 100); //回転する速さ
    }
  }

// When a browser is not compatible 
  const canvas = document.querySelector('canvas');
  if (typeof canvas.getContext === 'undefined') {
    return; 
  }
  //インスタンス作成
  const icon = new Icon(canvas);
  icon.run();
})();

