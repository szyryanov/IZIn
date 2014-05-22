
function reportAdd(line) {
    $("#report").html($("#report").html() + line + "<br />");
}

function reportClear() {
    $("#report").html("");
}

function summaryNeutral(msg) {
    if (!msg) {
        msg = "";
    }
    //
    var $summary = $("#summary");
    $summary.html(msg);
    $summary.removeClass("summary-ok");
    $summary.removeClass("summary-error");
}

function summaryOk(msg) {
    if (msg) {
        msg = "Ok: " + msg;
    } else {
        msg = "Ok";
    }
    //
    var $summary = $("#summary");
    $summary.html(msg);
    $summary.removeClass("summary-error");
    $summary.addClass("summary-ok");
}

function summaryError(msg) {
    if (msg) {
        msg = "Error: " + msg;
    } else {
        msg = "Error";
    }
    //
    var $summary = $("#summary");
    $summary.html(msg);
    $summary.removeClass("summary-ok");
    $summary.addClass("summary-error");
}

