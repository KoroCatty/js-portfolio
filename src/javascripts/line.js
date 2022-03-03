let scrolldown = document.getElementById("chatarea");
scrolldown.scrollTop = scrolldown.scrollHeight;


//チャット1行につきdivタグ1つとなっていたが、divタグの中にもう一つdivタグを入れて「フレックスコンテナー」と「フレックスアイテム」の関係にした

//HTMLのcontainer2を取得し、messageという変数に設定。(既存のcontainer2にdivを追加していく)
var message = document.querySelector(".container2");//messageという親の誕生
var message2 = document.querySelector(".container2");


//inputであるMeを取得し、Meという変数に設定 themも取得
var Me = document.getElementById("Me");
var Them = document.getElementById("Them");


//keypressイベントリスナーの登録
document.getElementById("Me").addEventListener("keypress", keyEvent);
document.getElementById("Them").addEventListener("keypress", keyEvent2);


//inputの中でキーが押されたときに実行される
// eventが発生したら、keyEventの関数が呼ばれる
//そしてその中にeventという引数を持っていて、eventのkeyという属性がEnterを検知し、次の処理を実行
//イベントの状態を表す引数event。この中に何のキーが押されたかという情報が入っている
function keyEvent(event){

//入力されたkeyがEnterだったら、次の処理をする(keyの属性)
if(event.key == "Enter"){

//新たなdivを生成するnewMessageという変数名を設定
let newMessage = document.createElement("div");//新しいDIVを作る

// テキスト表示用のdivを作成
let textDiv = document.createElement("div");

//Meの中の値をtextDivという変数に格納
textDiv.innerHTML = Me.value;


// newMessage.innerHTML = Me.value;
newMessage.appendChild(textDiv);

//container2に追加していくmessage（親）にnewMessage（子）を追加する
message.appendChild(newMessage);



//Enter後、Meの中の値は空文字にする
Me.value = "";

//createしたdivにスタイル付けする
textDiv.style.cssText = `
background-color: rgb(53, 207, 53);
border-radius: 20px;
padding: 1.5vw;
`;

newMessage.style.cssText = 
`display: flex; 
justify-content: flex-end;
margin-top: 5px;
margin-bottom: 5px;
`; 
}
}




function keyEvent2(event2){

//入力されたkeyがEnterだったら、次の処理をする(keyの属性)
if(event.key == "Enter"){

//新たなdivを生成するnewMessage2という変数名を設定
let newMessage2 = document.createElement("div");//newMessageという子の誕生


// テキスト表示用のdivを作成
let textDiv2 = document.createElement("div");
//Themの中の値をtextDiv2という変数に格納
textDiv2.innerHTML = Them.value;


//container2に追加していくmessage（親）にnewMessage（子）を追加する

message.appendChild(newMessage2);

newMessage2.appendChild(textDiv2);

//Enter後、Themの中の値は空文字にする
Them.value ="";


//新しく生成されるdiv(親)にスタイル付けする
textDiv2.style.cssText = `
background-color: rgb(230, 213, 213);
border-radius: 20px;
padding: 1.5vw;
`;

//新しく生成されるdiv(子)にスタイル付けする
newMessage2.style.cssText = 
`display: flex; 
justify-content: flex-start;
margin-top: 5 px; //borderの枠から外のマージン
margin-bottom: 5px;
`;
}
}

// ---------------------------------------
//  チャット入力欄を下側にする (js)
// ・単純に表示位置を入れ替えても良い
// ・flex-directionを使って・・・？

// チャット欄のスクロール
// 予めチャット欄の高さを決めておき、内容がはみ出しそうになったらスクロールするよう
// にしたい。
// height: 500px; /* 予め高さを指定しておく */
// overflow:
// hidden; はみ出す領域は表示しない
// scroll; はみ出す場合はスクロールバーを表示する
// overflowは、横方向（x）と縦方向（y）別々に指定できる。
// overflow-y: scroll; 縦方向のみはみ出す場合はスクロールバー表示


// 最後に追加したチャットへスクロールする
// ただ追加しただけでは自動的にスクロールはしない
// chatArea.scrollTop = chatArea.scrollHeight;javascriptでスクロールの位置を指定
// できる 
// scrollTop: その要素全体のうち、表示領域の左上の 座標。
// この数値を変更するとスクロール位置も変わる。

// scrollHeight: その要素全体の（スクロールが可能な高さ

// scrollTopにscrollHeightを代入すると、必ずその領域
// の一番下までスクロールさせることができる。



