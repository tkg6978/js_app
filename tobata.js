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

/** EventListener による click 制御 */

var progressVal;
var interval;

var intervalLoading;

window.addEventListener('load', function(){

    /** button-demo 押下時 */ 
    document.getElementById("button-demo").addEventListener('click', function(){
        progressVal = 0
        document.getElementById("button-demo").disabled = true;
        interval = setInterval("startDemo()", 10);
    });

    /** button-start 押下時 */
    document.getElementById("button-start").addEventListener('click', function(){
        // ボタン制御
        document.getElementById("button-start").disabled = true;
        document.getElementById("button-stop").disabled = false;
        document.getElementById("button-reset").disabled = true;
        
        // しきい値に達する場合、0からスタート
        if (parseInt(document.getElementById("progress-loading").value) >= tgt) {
            document.getElementById("progress-loading").value = 0
            document.getElementById("button-start").innerText = "start"
        }

        // インターバル処理 開始
        intervalLoading = setInterval("startLoadingDemo()", 100);
    });

    /** button-stop 押下時 */
    document.getElementById("button-stop").addEventListener('click', function(){

        // ボタン制御
        document.getElementById("button-stop").disabled = true;
        document.getElementById("button-start").disabled = false;

        // インターバル処理 停止
        clearInterval(intervalLoading);

        // 途中停止の場合、表示制御
        if (parseInt(document.getElementById("progress-loading").value) > 0) {
            document.getElementById("button-reset").disabled = false;
            document.getElementById("title-loading").innerText = "Progress... " + document.getElementById("progress-loading").value + "%";
        }
    });
    
    /** button-reset 押下時 */
    document.getElementById("button-reset").addEventListener('click', function(){

        // ボタン制御
        document.getElementById("button-reset").disabled = true;
        
        // しきい値に達する場合、ボタン表示制御
        if (parseInt(document.getElementById("progress-loading").value) >= tgt) {
            document.getElementById("button-start").innerText = "start"
        }

        // 進捗値のリセット
        document.getElementById("progress-loading").value = 0
        document.getElementById("title-loading").innerText = "Try push start and stop button !";
    });
});


/** EventListener Demo */
function startDemo() {

    // プログレスバーの進捗値を更新し、プログレスバーに反映させる
    progressVal += 1;
    document.getElementById("progress-status").value = progressVal;

    // ログ出力
    console.log("progress-status:", progressVal, "%");

    // pタグの文字列もカウントアップする
    document.getElementById("title-demo").innerText = progressVal;

    // 終了設定値に到達したら終了
    if (progressVal == tgt) {
        clearInterval(interval);
        document.getElementById("button-demo").disabled = false;
    }
}

/** Loading Demo */
function startLoadingDemo() {

    // プログレスバーの進捗値を取得
    loadingProgress = parseInt(document.getElementById("progress-loading").value)
    loadingProgress += 1
    
    // 進捗値の更新
    document.getElementById("progress-loading").value = loadingProgress;

    // ログ出力
    console.log("progress-loading:", loadingProgress, "%");

    // しきい値に到達したら終了
    if (loadingProgress == tgt) {
        
        // 停止
        clearInterval(intervalLoading);
        
        // ボタンの有効/無効
        document.getElementById("button-start").disabled = false;
        document.getElementById("button-stop").disabled = true;
        document.getElementById("button-reset").disabled = false;
        // 表示制御
        document.getElementById("title-loading").innerText = "Complete! " + loadingProgress + "%"
        document.getElementById("button-start").innerText = "restart"
    } else {
        document.getElementById("title-loading").innerText = "Now Loading... " + loadingProgress + "%";
    }
}

