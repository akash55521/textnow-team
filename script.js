document.getElementById('digitalOrderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const teamMemberId = document.getElementById('name').value.trim(); 
    const productName = document.getElementById('product').value;
    const quantity = parseInt(document.getElementById('quantity').value);

    // ১. মেম্বার আইডি চেক
    const allowedMemberIds = ["20260101", "20260412", "99887766", "11223344"]; 
    if (teamMemberId.length !== 8 || !allowedMemberIds.includes(teamMemberId)) {
        alert("❌ ভুল মেম্বার আইডি! দয়া করে সঠিক ৮ ডিজিটের আইডি দিন।");
        return; 
    }

    submitBtn.innerText = "অর্ডারিং হচ্ছে...";
    submitBtn.disabled = true;

    const uniqueRequestId = 'req-' + Math.random().toString(36).substring(2, 15);
    
    // আপনার নিজস্ব হোস্টিং প্রক্সি লিঙ্ক
    const proxyUrl = "https://skyandstudio.xyz/proxy.php?url=";
    let apiUrl = "";
    let fetchOptions = { method: 'POST' };

    // ২. প্রোডাক্ট অনুযায়ী এপিআই সেটআপ
    if (productName === "Hot mail") {
        const targetApi = "https://chovantry.com/api/create-order.php";
        apiUrl = proxyUrl + encodeURIComponent(targetApi);
        
        const formData = new URLSearchParams();
        formData.append('api_key', 'bg1or2226i24kxmdc8ooeuz405bgasdw'); 
        formData.append('request_id', uniqueRequestId);
        formData.append('shop_id', 31); 
        formData.append('quantity', quantity);
        fetchOptions.body = formData;
    } 
    else if (productName === "play store") {
        const apiKey = 'bzh_c7bb0f9679147df8a43da6e95f2018b05d6b8cb932473fcc2741080468dc0cdb';
        const productId = 'prd_52830b037f3d';
        const targetUrl = `https://buzzmaster.market/api/v2/buy.php?api_key=${apiKey}&product_id=${productId}&quantity=${quantity}&request_id=${uniqueRequestId}`;
        
        apiUrl = proxyUrl + encodeURIComponent(targetUrl);
    } else {
        alert("দয়া করে একটি সঠিক প্রোডাক্ট সিলেক্ট করুন।");
        resetButton();
        return;
    }

    // ৩. রিকোয়েস্ট পাঠানো
    try {
        const response = await fetch(apiUrl, fetchOptions);
        const result = await response.json();

        if (result.success === true || result.order_id || result.id) {
            document.getElementById('orderFormContainer').style.display = 'none';
            document.getElementById('successContainer').style.display = 'block';

            document.getElementById('successProductType').innerText = productName.toUpperCase() + " | PURCHASE SUCCESSFUL";
            document.getElementById('displayOrderId').innerText = "#" + (result.order_id || result.id || "N/A");
            document.getElementById('displayPrice').innerText = "$0.00";
            
            const mainData = result.account_data || result.credentials || result.data || JSON.stringify(result);
            document.getElementById('credentialsText').value = Array.isArray(mainData) ? mainData.join("\n") : mainData;
        } else {
            alert("অর্ডার ব্যর্থ: " + (result.message || "স্টক বা ব্যালেন্স চেক করুন।"));
            resetButton();
        }
    } catch (error) {
        console.error("API Error:", error);
        alert("সার্ভার কানেকশন এরর! পুনরায় চেষ্টা করুন।");
        resetButton();
    }
});

// কপি এবং রিসেট ফাংশন
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
