// 終了設定値
var tgt = 100;

// プログレスバーの進捗
var val;

// 一定間隔で処理を行うintervalのIDを保持
var intervalID;

// ボタンがクリックされたら起動する関数
function coutUp(){
    val = 0;

    // ボタンを無効にする(何回も押せないように)
    document.getElementById("coutUpButton").disabled = true;

    // 10msおきにプログレスバーを更新する
    intervalID = setInterval("updatecoutUpProgress()", 10);
}

// プログレスバーを更新する
function updatecoutUpProgress() {

    // プログレスバーの進捗値を更新し、プログレスバーに反映させる
    val += 1;
    document.getElementById("coutUpProgress").value = val;
    document.getElementById("coutUpProgress").innerText = val + "%";

    // ログ出力
    console.log("coutUpProgress:", val, "%");

    // pタグの文字列もカウントアップする
    document.getElementById("coutUp").innerText = val;

    // 終了設定値に到達したら終了
    if (val == tgt) {
        clearInterval(intervalID);
        document.getElementById("coutUpButton").disabled = false;
    }
}
