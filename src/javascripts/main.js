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
// -----------------------------------------
// 各種信号　点灯の関数化
function flashRed(redArg) {
  redArg.style.color = "rgba(255, 0, 0, 0.8)";
  // redArg.style.textShadow = "5px 5px 5px blue"; //開発用
  redArg.style.textShadow = "-5px -5px 20px red, 5px 5px 20px red";

}
// Yellowの関数化
function flashYellow(yellowArg) {
  yellowArg.style.color = "rgba(255,255,0, 0.8)";
  // yellowArg.style.textShadow = "5px 5px 5px blue";
  yellowArg.style.textShadow = "-5px -5px 20px yellow, 5px 5px 20px yellow";

}
// Greenの関数化
function flashGreen(greenArg) {
  greenArg.style.color = "rgba(0,255,0,0.8)";
  // greenArg.style.textShadow = "5px 5px 5px blue";
  greenArg.style.textShadow = "-5px -5px 15px green, -5px 15px 15px green";

}
// right turn の関数化
function flashArrow(arrowArg) {
  arrowArg.style.color =  "rgba(0,255,0,0.8)";
  // arrowArg.style.textShadow = "5px 5px 5px blue";
  arrowArg.style.textShadow = "-5px -5px 20px green, -5px 15px 20px green";

}

//--------------------------------------------------------------------------------------------------------------
//昼間のサイクル
function cycle_day() {
  // 次の状態に遷移するまでの時間
  let nextTimeout = 0;
  // 今までのstateは state_dayを8で割った余りとする。
  // こうすることで、状態0～7を繰り返し表現できる。

  if (state == 0) {
    //0: 全て赤
    let signals = document.querySelectorAll('.signal');
    for (const s of signals) {

      // flash red
      const redSignal = s.querySelector('.red');
      flashRed(redSignal);

      // yellow text-shadow off
      s.querySelector('.yellow').style.color = "black";
      s.querySelector('.yellow').style.textShadow = "none";

      s.querySelector('.green').style.color = "black";
    }
    // 現在のフェーズを表示
    function showPhaseNumber() {
      document.querySelector('.phaseNumber').textContent = 0;
    }
    showPhaseNumber();

    nextTimeout = 2000
  } else if (state == 1) {
    //1: 南北が緑
    let signals = document.querySelectorAll('.signal-ns');
    for (const s of signals) {
      // red text-shadow off
      s.querySelector('.red').style.color = "black";
      s.querySelector('.red').style.textShadow = "none";

      s.querySelector('.yellow').style.color = "black";

      // flash green
      const greenSignal = s.querySelector('.green');
      flashGreen(greenSignal);
    }
    // 現在のフェーズを表示
    function showPhaseNumber() {
      document.querySelector('.phaseNumber').textContent = 1;
    }
    showPhaseNumber();
    nextTimeout = 4000
  } else if (state == 2) {
    //2: 南北が黄
    let signals = document.querySelectorAll('.signal-ns');
    for (const s of signals) {
      // red text-shadow off
      s.querySelector('.red').style.color = "black";
      // s.querySelector('.red').style.textShadow = "none";

      // flash Yellow
      const yellowSignal = s.querySelector('.yellow');
      flashYellow(yellowSignal);

      // green text-shadow off
      s.querySelector('.green').style.color = "black";
      s.querySelector('.green').style.textShadow = "none";
    }
    // 現在のフェーズを表示
    function showPhaseNumber() {
      document.querySelector('.phaseNumber').textContent = 2;
    }
    showPhaseNumber();
    nextTimeout = 2000
  } else if (state == 3) {
    //3: 南北が赤＋右折信号
    let signals = document.querySelectorAll('.signal-ns');
    for (const s of signals) {
      // flash red
      const redSignal = s.querySelector('.red');
      flashRed(redSignal);

      // yellow text-shadow off
      s.querySelector('.yellow').style.color = "black";
      s.querySelector('.yellow').style.textShadow = "none";

      s.querySelector('.green').style.color = "black";

      // flash arrow
      const arrowSignal = s.querySelector('.rightturn');
      flashArrow(arrowSignal);
    }
    // 現在のフェーズを表示
    function showPhaseNumber() {
      document.querySelector('.phaseNumber').textContent = 3;
    }
    showPhaseNumber();
    nextTimeout = 4000
  } else if (state == 4) {
    //4: 南北が黄
    let signals = document.querySelectorAll('.signal-ns');
    for (const s of signals) {
      // red text-shadow off
      s.querySelector('.red').style.color = "black";
      s.querySelector('.red').style.textShadow = "none";


      // flash Yellow
      const yellowSignal = s.querySelector('.yellow');
      flashYellow(yellowSignal);

      s.querySelector('.green').style.color = "black";

      // red text-shadow off
      s.querySelector('.rightturn').style.color = "black";
      s.querySelector('.rightturn').style.textShadow = "none";
    }
    // 現在のフェーズを表示
    function showPhaseNumber() {
      document.querySelector('.phaseNumber').textContent = 4;
    }
    showPhaseNumber();
    nextTimeout = 2000
  } else if (state == 5) {
    //5: 南北が赤
    let signals = document.querySelectorAll('.signal-ns');
    for (const s of signals) {
      // flash red
      const redSignal = s.querySelector('.red');
      flashRed(redSignal);

      // yellow text-shadow off
      s.querySelector('.yellow').style.color = "black";
      s.querySelector('.yellow').style.textShadow = "none";

      s.querySelector('.green').style.color = "black";
    }
    // 現在のフェーズを表示
    function showPhaseNumber() {
      document.querySelector('.phaseNumber').textContent = 5;
    }
    showPhaseNumber();
    nextTimeout = 2000
  } else if (state == 6) {
    //6: 東西が青
    let signals = document.querySelectorAll('.signal-ew');
    for (const s of signals) {
      // red text-shadow off
      s.querySelector('.red').style.color = "black";
      s.querySelector('.red').style.textShadow = "none";

      s.querySelector('.yellow').style.color = "black";

      // flash green
      const greenSignal = s.querySelector('.green');
      flashGreen(greenSignal);

    }
    // 現在のフェーズを表示
    function showPhaseNumber() {
      document.querySelector('.phaseNumber').textContent = 6;
    }
    showPhaseNumber();
    nextTimeout = 4000
  } else if (state == 7) {
    //7: 東西が黄
    let signals = document.querySelectorAll('.signal-ew');
    for (const s of signals) {
      s.querySelector('.red').style.color = "black";


      // flash Yellow
      const yellowSignal = s.querySelector('.yellow');
      flashYellow(yellowSignal);

      // green text-shadow off
      s.querySelector('.green').style.color = "black";
      s.querySelector('.green').style.textShadow = "none";
    }
    //ここで昼パターンカウントを増やす
    count_day++; //夜パターンのカウントを一ずつ上げていく
    console.log("昼パターンカウント", count_day);

    // 現在のフェーズを表示
    function showPhaseNumber() {
      document.querySelector('.phaseNumber').textContent = 7;
    }
    showPhaseNumber();
    nextTimeout = 2000
  }
  // 次回の状態をセット 1+する。最大23（8状態を3回分）まで。
  state = (state + 1) % 8;

  // stateが0の場合はcycle_nightのtimeoutを設定
  // stateが0以外の場合はcycle_dayのtimeoutを設定
  if (count_day === 2) {
    setTimeout(cycle_night, nextTimeout); //ここをcycle_dayと書いていたので、昼サイクルに移行しても変な挙動になり動かなかった
    count_day = 0;
  } else {
    setTimeout(cycle_day, nextTimeout);
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

// ---------------------------------------------
//夜のサイクル
function cycle_night() {
  // 次の状態に遷移するまでの時間
  let nextTimeout = 0; //ここで定義しておく

  ("signal-ns");
  if (state == 0) {
    //0: 南北　赤　点灯　１秒　東西　黄　点灯　１秒
    let signals = document.querySelectorAll('.signal');
    for (const s of signals) {

      // flash red
      const redSignal = s.querySelector('.red');
      flashRed(redSignal);

      s.querySelector('.yellow').style.color = "black";
      s.querySelector('.green').style.color = "black";
      signals = document.querySelectorAll('.signal-ew');
      for (const s of signals) {
        // red text-shadow off
        s.querySelector('.red').style.color = "black";
        s.querySelector('.red').style.textShadow = "none";

        // flash yellow
        const yellowSignal = s.querySelector('.yellow');
        flashYellow(yellowSignal);

        s.querySelector('.green').style.color = "black";
      }
    }
    // 現在のフェーズを表示
    function showPhaseNumber() {
      document.querySelector('.phaseNumber').textContent = "Night";
      document.querySelector('.phaseNumber').classList.add('nightActive');

    }
    showPhaseNumber();
    nextTimeout = 500

    //　全ブラック
  } else if (state == 1) {
    //1: 南北　赤　消灯　１秒　東西　黄　消灯　１秒
    let signals = document.querySelectorAll('.signal-ns');
    for (const s of signals) {
      s.querySelector('.red').style.color = "black";
      s.querySelector('.red').style.textShadow = "none";

      // yellow text-shadow off
      s.querySelector('.yellow').style.color = "black";
      s.querySelector('.yellow').style.textShadow = "none";

      s.querySelector('.green').style.color = "black";
    }

    //東西
    signals = document.querySelectorAll('.signal-ew');
    for (const s of signals) {
      s.querySelector('.red').style.color = "black";

      // yellow text-shadow off
      s.querySelector('.yellow').style.color = "black";
      s.querySelector('.yellow').style.textShadow = "none";

      s.querySelector('.green').style.color = "black";
    }
    //ここで夜パターンカウントを増やす
    count_night++; //夜パターンのカウントを一ずつ上げていく
    console.log("夜パターンカウント", count_night);//消灯したらカウントが上がる　  

    // 現在のフェーズを表示 (空にして点滅)
    function showPhaseNumber() {
      let phase = document.querySelector('.phaseNumber');
      if (phase.textContent === "Night") {
        document.querySelector('.phaseNumber').textContent = "";
        document.querySelector('.phaseNumber').classList.remove('nightActive');
      }
    }
    showPhaseNumber();
    nextTimeout = 1000;
  }
  // 次回の状態をセット 1+する。最大5まで。
  state = (state + 1) % 2;  //% は剰余演算子 2で割るのは２つの状態があるため

  // timeoutを設定
  if (count_night === 5) {
    setTimeout(cycle_day, nextTimeout);//5回になった時点でこれが実行される　＝　５秒で夜サイクル終了
    count_night = 0;
  } else {
    setTimeout(cycle_night, nextTimeout);  //5回に達するまではこれが実行される
  }


}

// 状態サイクルの実行
cycle_night();//上で定義したものを実行するもの。ここでnightにしているので、nightがまず初めに実行される。


  // --------------------------------------------------
