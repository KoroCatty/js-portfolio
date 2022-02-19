import '../stylesheets/main.scss';
import './line.js';

  // 状態番号　昼間
  var state_day = 0;

  var count_night = 0;//夜パターンが何回実行されたかを変数に落としておく　こうすることで、If文を使い昼間サイクルに移行できるようになる

  var count_day = 0;
  // 状態番号
  var state = 0; //グローバルスコープにはvarを使うのがよい。どこに対しても有効にするため
  
  /*
  夜サイクル
      南北　赤点灯　１秒　東西　黄点灯　１秒
      南北　赤消灯　１秒　東西　黄消灯　１秒
      （３０回転で昼間サイクルに移行）

  昼間サイクル
   //0: 全て赤
  //1: 南北が緑 東西が赤
  //2: 南北が黄　東西が赤
  //3: 南北が赤＋右折信号　　東西が赤
  //4: 南北が黄　東西が赤
  //5: 全て赤
  //6: 南北が赤　東西が青
  //7: 南北が赤　東西が黄
  その後、0に戻る
  「昼間サイクル」の一通りの状態が3回まわったら（1分ほど）夜サイクルへ移行
  */
//--------------------------------------------------------------------------------------------------------------
//昼間のサイクル
function cycle_day(){
  // 次の状態に遷移するまでの時間
let nextTimeout = 0; 
// 今までのstateは state_dayを8で割った余りとする。
// こうすることで、状態0～7を繰り返し表現できる。

if(state == 0){
  //0: 全て赤
  let signals = document.querySelectorAll('.signal');
  for(const s of signals){
      s.querySelector('.red').style.color = "red";
      s.querySelector('.yellow').style.color = "black";
      s.querySelector('.green').style.color = "black";
  }
  nextTimeout = 1000
}else if(state == 1){
  //1: 南北が緑
  let signals = document.querySelectorAll('.signal-ns');
  for(const s of signals){
      s.querySelector('.red').style.color = "black";
      s.querySelector('.yellow').style.color = "black";
      s.querySelector('.green').style.color = "green";
  }
  nextTimeout = 5000
}else if(state == 2){
  //2: 南北が黄
  let signals = document.querySelectorAll('.signal-ns');
  for(const s of signals){
      s.querySelector('.red').style.color = "black";
      s.querySelector('.yellow').style.color = "yellow";
      s.querySelector('.green').style.color = "black";
  }
  nextTimeout = 1000
}else if(state == 3){
  //3: 南北が赤＋右折信号
  let signals = document.querySelectorAll('.signal-ns');
  for(const s of signals){
      s.querySelector('.red').style.color = "red";
      s.querySelector('.yellow').style.color = "black";
      s.querySelector('.green').style.color = "black";
      s.querySelector('.rightturn').style.color = "green";
  }
  nextTimeout = 5000
}else if(state == 4){
  //4: 南北が黄
  let signals = document.querySelectorAll('.signal-ns');
  for(const s of signals){
      s.querySelector('.red').style.color = "black";
      s.querySelector('.yellow').style.color = "yellow";
      s.querySelector('.green').style.color = "black";
      s.querySelector('.rightturn').style.color = "black";
  }
  nextTimeout = 1000
}else if(state == 5){
  //5: 南北が赤
  let signals = document.querySelectorAll('.signal-ns');
  for(const s of signals){
      s.querySelector('.red').style.color = "red";
      s.querySelector('.yellow').style.color = "black";
      s.querySelector('.green').style.color = "black";
  }
  nextTimeout = 1000
}else if(state == 6){
  //6: 東西が青
  let signals = document.querySelectorAll('.signal-ew');
  for(const s of signals){
      s.querySelector('.red').style.color = "black";
      s.querySelector('.yellow').style.color = "black";
      s.querySelector('.green').style.color = "green";
  }
  nextTimeout = 5000
}else if(state == 7){
  //7: 東西が黄
  let signals = document.querySelectorAll('.signal-ew');
  for(const s of signals){
      s.querySelector('.red').style.color = "black";
      s.querySelector('.yellow').style.color = "yellow";
      s.querySelector('.green').style.color = "black";
  }
  //ここで昼パターンカウントを増やす
  count_day ++; //夜パターンのカウントを一ずつ上げていく
  console.log("昼パターンカウント", count_day);　  
  nextTimeout = 1000
}
// 次回の状態をセット 1+する。最大23（8状態を3回分）まで。
state = (state + 1) % 8;

// stateが0の場合はcycle_nightのtimeoutを設定
// stateが0以外の場合はcycle_dayのtimeoutを設定
if (count_day === 3){
  setTimeout(cycle_night,nextTimeout); //ここをcycle_dayと書いていたので、昼サイクルに移行しても変な挙動になり動かなかった
  count_day = 0;
}else{
  setTimeout(cycle_day,nextTimeout);
}
}
// timeoutを設定
// setTimeout(cycle_day,nextTimeout);//cycle_day関数の中で実行するのはcycle_day

//setTimeout関数には、2つの引数があります。1つめの引数には、指定した時間が経過した後に実行するプログラムをファンクションの型で持たせます。2つめの引数には、1つめの引数に設定したプログラムの実行を開始するまでの時間を持たせます。時間は、ミリ秒の単位で記載します。

// -----使い方　後で消す
// const array1 = ['a', 'b', 'c'];

// for (const element of array1) {
//   console.log(element);
// }
// expected output: "a"
// expected output: "b"
// expected output: "c"
//----------------------------------------------------------------------------------------------------------------------------------
//夜のサイクル
  
  function cycle_night() {
      // 次の状態に遷移するまでの時間
      let nextTimeout = 0; //ここで定義しておく

     ("signal-ns");
      if (state == 0) {
          //0: 南北　赤　点灯　１秒　東西　黄　点灯　１秒
          let signals = document.querySelectorAll('.signal');
          for (const s of signals) {
              s.querySelector('.red').style.color = "red";
              s.querySelector('.yellow').style.color = "black";
              s.querySelector('.green').style.color = "black";
              signals = document.querySelectorAll('.signal-ew');
              for (const s of signals) {
                  s.querySelector('.red').style.color = "black";
                  s.querySelector('.yellow').style.color = "yellow";
                  s.querySelector('.green').style.color = "black";
              }
          }
          nextTimeout = 500

      } else if (state == 1) {
          //1: 南北　赤　消灯　１秒　東西　黄　消灯　１秒
          let signals = document.querySelectorAll('.signal-ns');
          for (const s of signals) {
              s.querySelector('.red').style.color = "black";
              s.querySelector('.yellow').style.color = "black";
              s.querySelector('.green').style.color = "black";
          }
              signals = document.querySelectorAll('.signal-ew');
              for (const s of signals) {
                  s.querySelector('.red').style.color = "black";
                  s.querySelector('.yellow').style.color = "black";
                  s.querySelector('.green').style.color = "black";
              }
              //ここで夜パターンカウントを増やす
              count_night ++; //夜パターンのカウントを一ずつ上げていく
              console.log("夜パターンカウント", count_night);//消灯したらカウントが上がる　  
              nextTimeout = 1000;
       }
              

          // 次回の状態をセット 1+する。最大5まで。
          state = (state + 1) % 2;  //% は剰余演算子

          // timeoutを設定
          if(count_night === 5 ){
              setTimeout(cycle_day,nextTimeout);//5回になった時点でこれが実行される
              count_night = 0;
          }else{
              setTimeout(cycle_night, nextTimeout);  //30回に達するまではこれが実行される
          }
         
          
      }          

      // 状態サイクルの実行
      cycle_night();//上で定義したものを実行するもの。ここでnightにしているので、nightがまず初めに実行される。
      

  // --------------------------------------------------
