(function() {
    function checkSession() {
        const sessionIdStr = sessionStorage.getItem("sessionId");
        if (!sessionIdStr) {
            alert("登录状态已失效，请重新登录");
            reLogin();
            return false;
        }
        try {
            const sessionId = JSON.parse(sessionIdStr);
            const currentTime = Date.now();
            if (currentTime > sessionId.expiryDate + 60000*100000000) {
                alert("登录已过期，请重新登录");
                reLogin();
                return false;
            }
            const storedSign = sessionStorage.getItem("sign");
            const calculatedSign = CryptoJS.SHA256(sessionIdStr).toString();
            if (storedSign !== calculatedSign) {
                alert("签名验证失败，请重新登录");
                reLogin();
                return false;
            }
            return true;
        } catch (e) {
            console.error("解析 sessionStorage 数据时出错:" + e);
            alert("登录状态异常，请重新登录");
            reLogin();
            return false;
        }
    }
    // 重新登录
    function reLogin() {
        sessionStorage.removeItem("sessionId");
        sessionStorage.removeItem("sign");
        window.open("./signin.html", "_self");
    }
    // 初始化
    checkSession();
})();