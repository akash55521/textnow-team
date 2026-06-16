// ========================================================
// 👥 ১. টিম মেম্বার ডিকশনারি (লগইন সিস্টেম)
// ========================================================
const teamMembers = {
    "20260101": { name: "Akash", img: "https://i.ibb.co/example/akash.jpg" }, 
    "20266106": { name: "Saya", img: "images/saya.png" },
    "99887766": { name: "Naim", img: "images/naim.png" },
    "12131415": { name: "Kamol", img: "images/kamol.png" },
    "77787978": { name: "Tusar", img: "images/tusar.png" },
    "66686968": { name: "Prince", img: "images/prince.png" },
    "45758595": { name: "Shoyon", img: "https://i.ibb.co/example/akash.jpg" },
    "70220464": { name: "Rabanee", img: "https://i.ibb.co/example/Rabanee.jpg" },
    "24237124": { name: "Badhon", img: "https://i.ibb.co/example/Badhon.jpg" },
    "12684856": { name: "Sadia", img: "https://i.ibb.co/example/Sadia.jpg" },
    "87654322": { name: "Rabbi", img: "https://i.ibb.co/example/Rabbi.jpg" },
    "65785954": { name: "Roman", img: "https://i.ibb.co/example/Roman.jpg" },
    "46434754": { name: "Anik", img: "https://i.ibb.co/example/Anik.jpg" },
    "45684386": { name: "Ibrahim", img: "https://i.ibb.co/example/Ibrahim.jpg" },
    "41524121": { name: "Masfiyad", img: "https://i.ibb.co/example/Masfiyad.jpg" },
    "01842741": { name: "Mehedi", img: "https://i.ibb.co/example/Mehedi.jpg" },
};

let verifiedMemberId = "";

// ========================================================
// ⚡ হ্যাকার স্টাইল সাইবার টেক্সট অ্যানিমেশন (গ্লিচ ইফেক্ট)
// ========================================================
function hackyTextAnimation(elementId, targetText) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*_+";
    let iteration = 0;
    const element = document.getElementById(elementId);
    
    clearInterval(element.interval);
    
    element.interval = setInterval(() => {
        element.innerText = targetText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                    return targetText[index];
                }
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");
        
        if(iteration >= targetText.length){ 
            clearInterval(element.interval);
        }
        
        iteration += 1 / 5;
    }, 50);
}

// ========================================================
// 🔐 ২. লগইন বাটন হ্যান্ডেলার
// ========================================================
document.getElementById('loginBtn').addEventListener('click', function() {
    const inputId = document.getElementById('loginMemberId').value.trim();

    if (teamMembers.hasOwnProperty(inputId)) {
        verifiedMemberId = inputId;
        const member = teamMembers[inputId];

        document.getElementById('loginContainer').style.display = 'none';
        
        const welcomeMsg = `ACCESS GRANTED // Welcome, ${member.name}!`;
        hackyTextAnimation('welcomeMessage', welcomeMsg);
        
        const avatarImg = document.getElementById('userAvatar');
        if (member.img) {
            avatarImg.src = member.img;
            avatarImg.style.display = 'block';
        } else {
            avatarImg.style.display = 'none';
        }

        const orderForm = document.getElementById('orderFormContainer');
        orderForm.style.display = 'block';
        orderForm.classList.add('wow-pop-in');
    } else {
        alert("❌ ভুল মেম্বার আইডি! দয়া করে সঠিক আইডি দিন।");
    }
});

// ========================================================
// 🛒 ৩. এপিআই অর্ডার প্রসেসিং হ্যান্ডেলার (Hotmail, PlayStore & Proxy)
// ========================================================
document.getElementById('digitalOrderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const productName = document.getElementById('product').value.trim().toLowerCase(); 
    const quantity = parseInt(document.getElementById('quantity').value);

    if (productName.includes("proxy")) {
        submitBtn.innerText = "প্রক্সি লোড হচ্ছে...";
        submitBtn.disabled = true;

        const myFixedProxies = "51.79.86.61:5590:textnow55522\n162.35.162.32:6401:akash55522";

        setTimeout(() => {
            document.getElementById('orderFormContainer').style.display = 'none';
            
            const successBox = document.getElementById('successContainer');
            successBox.style.display = 'block';
            successBox.classList.add('wow-pop-in');

            document.getElementById('successProductType').innerText = "LIVE PROXY | ACTIVE";
            document.getElementById('displayOrderId').innerText = "#PRX-FIXED"; 
            document.getElementById('credentialsText').value = myFixedProxies;
        }, 500); 
        return; 
    }

    submitBtn.innerText = "অর্ডারিং হচ্ছে...";
    submitBtn.disabled = true;

    const uniqueRequestId = 'req-' + Math.random().toString(36).substring(2, 15);
    const proxyUrl = "https://skyandstudio.xyz/proxy.php?url=";
    let apiUrl = "";
    let fetchOptions = {};

    if (productName.includes("hot") || productName.includes("mail")) {
        const targetApi = "https://chovantry.com/api/create-order.php";
        apiUrl = proxyUrl + encodeURIComponent(targetApi);
        
        const formData = new URLSearchParams();
        formData.append('api_key', 'bg1or2226i24kxmdc8ooeuz405bgasdw'); 
        formData.append('request_id', uniqueRequestId);
        formData.append('shop_id', '31'); 
        formData.append('quantity', quantity);
        
        fetchOptions = { method: 'POST', body: formData };
    } 
    else if (productName.includes("play") || productName.includes("store")) {
        const apiKey = 'bzh_c7bb0f9679147df8a43da6e95f2018b05d6b8cb932473fcc2741080468dc0cdb';
        const targetApi = `https://buzzmaster.market/api/v2/buy?api_key=${apiKey}`;
        apiUrl = proxyUrl + encodeURIComponent(targetApi);
        
        fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: 'prd_eeeb28bc00cf', amount: quantity })
        };
    } else {
        alert("দয়া করে একটি সঠিক প্রোডাক্ট সিলেক্ট করুন (Hotmail/PlayStore)।");
        resetButton();
        return;
    }

    try {
        const response = await fetch(apiUrl, fetchOptions);
        const responseText = await response.text(); 
        let result;
        
        try {
            result = JSON.parse(responseText); 
        } catch(e) {
            if(responseText.includes("success") || responseText.includes("order") || responseText.length > 15) {
                result = { success: true, account_data: responseText, order_id: "TXT-" + Date.now() };
            } else {
                result = { success: false, message: responseText || "সার্ভার থেকে খালি রেসপন্স এসেছে।" };
            }
        }

        if (result.success === true || result.order_id || result.id || result.status === "success" || responseText.includes("true")) {
            document.getElementById('orderFormContainer').style.display = 'none';
            
            const successBox = document.getElementById('successContainer');
            successBox.style.display = 'block';
            successBox.classList.add('wow-pop-in');

            document.getElementById('successProductType').innerText = productName.toUpperCase() + " | PURCHASE SUCCESSFUL";
            const displayId = result.order?.order_id || result.order_id || result.id || "N/A";
            document.getElementById('displayOrderId').innerText = "#" + displayId;
            
            let finalCredentials = "";
            if (result.order && result.order.credentials) {
                finalCredentials = result.order.credentials;
            } else if (result.account_data) {
                finalCredentials = result.account_data;
            } else {
                const mainData = result.credentials || result.data || result.accounts || responseText;
                finalCredentials = typeof mainData === 'object' ? JSON.stringify(mainData, null, 2) : mainData;
            }

            document.getElementById('credentialsText').value = finalCredentials;
        } else {
            alert("অর্ডার ব্যর্থ: " + (result.message || result.error || "স্টক বা ব্যালেন্স সমস্যা।"));
            resetButton();
        }
    } catch (error) {
        alert("সার্ভার রেসপন্স প্রসেস করতে পারেনি।");
        resetButton();
    }
});

// ========================================================
// 🌐 ৪. ইউনিভার্সাল অল-মেইল রিডার ও এপিআই ইঞ্জিন (CORS / UI Lag Free)
// ========================================================
async function fetchUniversalMailAndOTP(rawInput) {
    let email = "";
    let password = "";
    let apiKey = "bg1or2226i24kxmdc8ooeuz405bgasdw"; 

    if (rawInput.includes('|')) {
        const parts = rawInput.split('|');
        email = parts[0].trim();
        password = parts[1].trim();
    } else {
        return { success: false, message: "FORMAT_ERROR // Invalid Input Format." };
    }

    const targetMailApi = `https://api.dongvanfb.net/api/getMessages?email=${email}&password=${password}&apikey=${apiKey}`;
    const proxyUrl = "https://skyandstudio.xyz/proxy.php?url=";

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(proxyUrl + encodeURIComponent(targetMailApi), { signal: controller.signal });
        clearTimeout(timeoutId);
        
        const data = await response.json();

        if (data.status === true && data.data && data.data.length > 0) {
            // 📨 ইনবক্সের একদম লেটেস্ট (সর্বশেষ) যেকোনো মেইল ডিরেক্ট রিড করবে
            const latestMail = data.data[0]; 
            
            const subject = latestMail.subject || "No Subject";
            const body = latestMail.body || latestMail.bodyPreview || "";
            const fullText = `${subject} ${body}`;

            // 🔍 ১. প্রথম ট্রাই: ৪ থেকে ৮ ডিজিটের ওটিপি কোড খোঁজা
            const otpMatch = fullText.match(/\b\d{4,8}\b/);
            
            // 🔗 ২. দ্বিতীয় ট্রাই: ওটিপি না থাকলে ভেরিফিকেশন লিংক (http/https) খোঁজা
            const linkMatch = fullText.match(/https?:\/\/[^\s"'<>]+/);

            if (otpMatch) {
                return { 
                    success: true, 
                    type: "OTP",
                    displayData: otpMatch[0], 
                    info: `FROM: ${latestMail.from || 'Unknown'} // SUB: ${subject}` 
                };
            } else if (linkMatch) {
                return { 
                    success: true, 
                    type: "LINK",
                    displayData: linkMatch[0], 
                    info: `LINK FOUND // SUB: ${subject}` 
                };
            } else {
                // 📝 ৩. তৃতীয় ট্রাই: ওটিপি বা লিংক না থাকলে সাবজেক্ট বা বডির প্রথম ৩০টি ক্যারেক্টার রিড করবে
                const cleanText = body.replace(/<[^>]*>/g, '').substring(0, 30);
                return { 
                    success: true, 
                    type: "TEXT",
                    displayData: cleanText + "...", 
                    info: `MESSAGE READ // SUB: ${subject}` 
                };
            }
        }
        return { success: false, message: "EMPTY_INBOX // Waiting for any new incoming email..." };
    } catch (error) {
        return { success: false, message: "SERVER_LAG // Retrying mail gateway..." };
    }
}

// ========================================================
// 📊 ৫. সাইবার টার্মিনাল প্রোগ্রেস বার অ্যানিমেশন UI
// ========================================================
function runHackerProgressBar(callback) {
    const statusText = document.getElementById('otpStatusText');
    let progress = 0;
    statusText.style.color = "#00ff33";
    
    clearInterval(window.hackerBufferInterval);
    
    window.hackerBufferInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 4;
        if (progress > 100) progress = 100;
        
        const bars = "█".repeat(Math.floor(progress / 5)) + "░".repeat(20 - Math.floor(progress / 5));
        statusText.innerText = `[${bars}] ${progress}% // DECRYPTING_MAIL_GATEWAY`;
        
        if (progress >= 100) {
            clearInterval(window.hackerBufferInterval);
            callback();
        }
    }, 80);
}

// ========================================================
// 🔐 ৬. ওটিপি বাটন এক্সিকিউশন এবং ব্যাকগ্রাউন্ড লুপ (Non-blocking)
// ========================================================
document.getElementById('getOtpBtn').addEventListener('click', function() {
    const rawTokenInput = document.getElementById('hotmailTokenInput').value.trim();
    const statusText = document.getElementById('otpStatusText');
    const finalOtpText = document.getElementById('finalOtpText');
    const btn = this;

    if (!rawTokenInput) {
        alert("❌ অনুগ্রহ করে সম্পূর্ণ ডাটা লাইনটি পেস্ট করুন (email|password|token)।");
        return;
    }

    btn.disabled = true;
    btn.style.boxShadow = "0 0 20px #00ffcc";
    btn.innerText = "🔁 LIVE INTERCEPTING...";
    finalOtpText.style.display = "none";
    
    runHackerProgressBar(() => {
        let attempts = 0;
        statusText.innerText = "[⚡] MONITORING INBOX // Awaiting new email, OTP, or Link...";

        clearInterval(window.otpLoopInterval);
        
        // ২ সেকেন্ডের আল্ট্রা-ফাস্ট লুপ (কোনো UI ল্যাগ করবে না)
        window.otpLoopInterval = setInterval(async () => {
            attempts++;
            const result = await fetchUniversalMailAndOTP(rawTokenInput);

            if (result.success) {
                clearInterval(window.otpLoopInterval);
                
                // ডাটা টাইপ অনুযায়ী UI কালার এবং ফন্ট সাইজ অ্যাডজাস্টমেন্ট
                if (result.type === "OTP") {
                    statusText.style.color = "#555";
                    statusText.innerText = `${result.info} // OTP DECRYPTED:`;
                    finalOtpText.style.fontSize = "28px";
                    finalOtpText.style.color = "#00ff33";
                } else if (result.type === "LINK") {
                    statusText.style.color = "#00ffcc";
                    statusText.innerText = `${result.info}`;
                    finalOtpText.style.fontSize = "14px"; 
                    finalOtpText.style.color = "#00bcff";
                } else {
                    statusText.style.color = "#ffff33";
                    statusText.innerText = `${result.info}`;
                    finalOtpText.style.fontSize = "18px";
                    finalOtpText.style.color = "#ffffff";
                }
                
                finalOtpText.innerText = result.displayData;
                finalOtpText.style.display = "block";
                hackyTextAnimation('finalOtpText', result.displayData); 
                
                btn.disabled = false;
                btn.style.boxShadow = "0 0 10px rgba(0, 255, 51, 0.4)";
                btn.innerText = "⚡ EXECUTE OTP FETCH";
            } else {
                statusText.style.color = "#00ffcc";
                statusText.innerText = `[SCAN ${attempts}] -> ${result.message}`;
                
                if (attempts >= 45) { // ১.৫ মিনিট পর্যন্ত লাইভ স্ক্যান
                    clearInterval(window.otpLoopInterval);
                    statusText.style.color = "#ff3333";
                    statusText.innerText = "TIMEOUT // No new mail received in the last 90s.";
                    btn.disabled = false;
                    btn.innerText = "⚡ EXECUTE OTP FETCH";
                }
            }
        }, 2000);
    });
});

// ========================================================
// 🔄 ৭. ইউটিলিটি বাটন অ্যাকশনস (Copy & Reset)
// ========================================================
document.getElementById('copyBtn').addEventListener('click', function() {
    const text = document.getElementById('credentialsText');
    text.select();
    document.execCommand('copy');
    this.innerText = "✓ Copied!";
    setTimeout(() => { this.innerText = "Copy Credentials"; }, 2000);
});

document.getElementById('newOrderBtn').addEventListener('click', function() {
    document.getElementById('successContainer').style.display = 'none';
    document.getElementById('orderFormContainer').style.display = 'block';
    resetButton();
});

function resetButton() {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = "অর্ডার সাবমিট করুন";
    submitBtn.disabled = false;
}
