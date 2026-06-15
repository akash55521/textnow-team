document.getElementById('digitalOrderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    
    // HTML ফর্ম থেকে লাইভ ডেটা নেওয়া
    const teamMemberId = document.getElementById('name').value.trim(); 
    const productName = document.getElementById('product').value;
    const quantity = parseInt(document.getElementById('quantity').value);

    // 🔒 অনুমোদিত ৮ ডিজিটের টিম মেম্বার আইডি-র তালিকা
    const allowedMemberIds = ["20260101", "20260412", "99887766", "11223344"]; 

    // আইডি চেক করা হচ্ছে
    if (teamMemberId.length !== 8 || !allowedMemberIds.includes(teamMemberId)) {
        alert("❌ ভুল মেম্বার আইডি! দয়া করে আপনার সঠিক ৮ ডিজিটের আইডি দিয়ে আবার চেষ্টা করুন।");
        return; 
    }

    // আইডি সঠিক হলে অর্ডারিং প্রসেস শুরু হবে
    submitBtn.innerText = "অর্ডারিং হচ্ছে...";
    submitBtn.disabled = true;

    // ইউনিক রিকোয়েস্ট আইডি (UUID) জেনারেট করা
    const uniqueRequestId = 'req-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    let apiUrl = "";
    let fetchOptions = {};

    // ------------------------------------------------------------------
    // ১. চোভান্ত্রি এপিআই সেটআপ (যদি Hot mail সিলেক্ট করা হয়)
    // ------------------------------------------------------------------
    if (productName === "Hot mail") {
        apiUrl = "https://corsproxy.io/?" + encodeURIComponent("https://chovantry.com/api/create-order.php");
        
        const formData = new URLSearchParams();
        formData.append('api_key', 'bg1or2226i24kxmdc8ooeuz405bgasdw'); 
        formData.append('request_id', uniqueRequestId);
        formData.append('shop_id', 31); 
        formData.append('quantity', quantity);

        fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString()
        };
    } 
    // ------------------------------------------------------------------
    // ২. বাজমাস্টার v2 এপিআই সেটআপ (যদি play store সিলেক্ট করা হয়) - [100% FIXED]
    // ------------------------------------------------------------------
    else if (productName === "play store") {
        const apiKey = 'bzh_c7bb0f9679147df8a43da6e95f2018b05d6b8cb932473fcc2741080468dc0cdb';
        const productId = 'prd_52830b037f3d';

        // বাজমাস্টারের অফিসিয়াল এন্ডপয়েন্ট ও প্যারামিটার সাজানো হলো
        const targetUrl = `https://buzzmaster.market/api/v2/buy.php?api_key=${apiKey}&product_id=${productId}&quantity=${quantity}&request_id=${uniqueRequestId}`;
        
        // অল-অরিজিন্স বাদ দিয়ে ফাস্ট ও ওপেন cors-anywhere গেটওয়ে ব্যবহার করা হলো
        apiUrl = `https://cors-anywhere.herokuapp.com/${targetUrl}`;

        // কোনো কোনো ক্ষেত্রে প্রক্সি যদি ব্লক করে, তার ব্যাকআপ হিসেবে আরেকটি হাই-স্পিড গেটওয়ে (বিকল্প):
        // apiUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}&_=${Date.now()}`;

        fetchOptions = {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        };
    } else {
        alert("দয়া করে একটি সঠিক প্রোডাক্ট সিলেক্ট করুন।");
        resetButton();
        return;
    }

    // ------------------------------------------------------------------
    // রিকোয়েস্ট পাঠানো এবং রেসপন্স হ্যান্ডেল করা
    // ------------------------------------------------------------------
    try {
        const response = await fetch(apiUrl, fetchOptions);
        const responseText = await response.text();
        
        let result;
        try {
            result = JSON.parse(responseText);
        } catch(e) {
            throw new Error("সার্ভার রেসপন্স রিড করতে পারেনি। অনুগ্রহ করে পেজটি রিফ্রেশ করে আবার চেষ্টা করুন।");
        }

        // অর্ডার সফল হলে রেসপন্স কন্ডিশন চেক
        if (response.ok && (result.success === true || result.status === "COMPLETED" || result.order_id || !result.error)) {
            
            // ফর্ম লুকিয়ে কাস্টম সাকসেস বক্স শো করা
            document.getElementById('orderFormContainer').style.display = 'none';
            document.getElementById('successContainer').style.display = 'block';

            document.getElementById('successProductType').innerText = productName.toUpperCase() + " | PURCHASE SUCCESSFUL";
            document.getElementById('displayOrderId').innerText = "#" + (result.order_id || result.id || "N/A");
            
            // আপনার নিজস্ব ড্যাশবোর্ডে প্রাইস সবসময় ০ ডলার ফিক্সড দেখাবে যেন মেম্বাররা মেইন প্রাইস না দেখে
            document.getElementById('displayPrice').innerText = "$0.00";
            
            // বাজমাস্টারের ডাটা অবজেক্ট রিড করা (username/password/credentials এর জন্য)
            const mainData = result.account_data || result.credentials || result.data || result.accounts || result.accounts_data;
            
            if (mainData) {
                if (Array.isArray(mainData)) {
                    document.getElementById('credentialsText').value = mainData.join("\n");
                } else {
                    document.getElementById('credentialsText').value = mainData;
                }
            } else if (result.text || result.content) {
                document.getElementById('credentialsText').value = result.text || result.content;
            } else {
                // কোনো নির্দিষ্ট ফিল্ড না মিললে পুরো রেসপন্স অবজেক্ট সুন্দর করে টেক্সটবক্সে দেখাবে
                document.getElementById('credentialsText').value = JSON.stringify(result, null, 2);
            }

        } else {
            alert("অর্ডার ব্যর্থ হয়েছে: " + (result.message || result.error || "স্টক বা ব্যালেন্স চেক করুন।"));
            resetButton();
        }
    } catch (error) {
        console.error("API Connection Error:", error);
        alert(error.message || "সার্ভারের সাথে কানেক্ট করা যাচ্ছে না। দয়া করে পেজটি রিফ্রেশ করে আবার চেষ্টা করুন।");
        resetButton();
    }
});

// কপি বাটনের কাজ
document.getElementById('copyBtn').addEventListener('click', function() {
    const credentialsText = document.getElementById('credentialsText');
    credentialsText.select();
    document.execCommand('copy');
    
    const originalText = this.innerText;
    this.innerText = "✓ Copied!";
    setTimeout(() => { this.innerText = originalText; }, 2000);
});

// Buy More বাটন প্রেস করে আবার ফর্মে ফিরে যাওয়া
document.getElementById('newOrderBtn').addEventListener('click', function() {
    document.getElementById('successContainer').style.display = 'none';
    document.getElementById('orderFormContainer').style.display = 'block';
    document.getElementById('digitalOrderForm').reset();
    resetButton();
});

function resetButton() {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = "অর্ডার সাবমিট করুন";
    submitBtn.disabled = false;
}