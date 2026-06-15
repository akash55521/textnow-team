document.getElementById('digitalOrderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const teamMemberId = document.getElementById('name').value.trim(); 
    const productName = document.getElementById('product').value;
    const quantity = parseInt(document.getElementById('quantity').value);

    // অনুমোদিত আইডি চেক
    const allowedMemberIds = ["20260101", "20260412", "99887766", "11223344"]; 
    if (teamMemberId.length !== 8 || !allowedMemberIds.includes(teamMemberId)) {
        alert("❌ ভুল মেম্বার আইডি!");
        return; 
    }

    submitBtn.innerText = "অর্ডারিং হচ্ছে...";
    submitBtn.disabled = true;

    const uniqueRequestId = 'req-' + Date.now();
    let apiUrl = "";

    // বাজমাস্টার এন্ডপয়েন্ট (CORS বাইপাসের জন্য ডিরেক্ট ইউআরএল)
    const apiKey = 'bzh_c7bb0f9679147df8a43da6e95f2018b05d6b8cb932473fcc2741080468dc0cdb';
    const productId = 'prd_52830b037f3d';
    const targetUrl = `https://buzzmaster.market/api/v2/buy.php?api_key=${apiKey}&product_id=${productId}&quantity=${quantity}&request_id=${uniqueRequestId}`;

    // প্রক্সি ফিক্স: অল-অরিজিন্স বাদ দিয়ে cors-anywhere ব্যবহার করা হয়েছে
    apiUrl = `https://cors-anywhere.herokuapp.com/${targetUrl}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        const result = await response.json();

        if (result.success === true || result.status === "COMPLETED" || result.order_id) {
            document.getElementById('orderFormContainer').style.display = 'none';
            document.getElementById('successContainer').style.display = 'block';

            document.getElementById('successProductType').innerText = "PURCHASE SUCCESSFUL";
            document.getElementById('displayOrderId').innerText = "#" + (result.order_id || "N/A");
            document.getElementById('displayPrice').innerText = "$0.00";
            
            // ডাটা কপি করার জন্য
            const mainData = result.account_data || result.credentials || result.data || JSON.stringify(result);
            document.getElementById('credentialsText').value = Array.isArray(mainData) ? mainData.join("\n") : mainData;
        } else {
            alert("অর্ডার ব্যর্থ: " + (result.message || "প্যানেল থেকে রিকোয়েস্ট রিজেক্ট হয়েছে।"));
            resetButton();
        }
    } catch (error) {
        alert("প্রক্সি কানেকশন এরর! এটি সাময়িক সমস্যা, পুনরায় চেষ্টা করুন।");
        resetButton();
    }
});

function resetButton() {
    document.getElementById('submitBtn').innerText = "অর্ডার সাবমিট করুন";
    document.getElementById('submitBtn').disabled = false;
}
