function calculateSellingPrice() {
    // Get input values
    const cost = parseFloat(document.getElementById('cost').value);
    const shipping = parseFloat(document.getElementById('shipping').value);
    const vatRate = parseFloat(document.getElementById('vatRate').value) / 100;
    const commissionRate = parseFloat(document.getElementById('commissionRate').value) / 100;
    const desiredMargin = parseFloat(document.getElementById('desiredMargin').value) / 100;

    // Calculate the initial selling price excluding shipping
    let sellingPrice = cost / (1 - desiredMargin);
    
    // Calculate total VAT based on selling price plus shipping
    const totalVAT = (sellingPrice + shipping) * vatRate;

    // Calculate total commission based on selling price plus shipping
    const totalCommission = (sellingPrice + shipping) * commissionRate;

    // Calculate profit
    const profit = sellingPrice - cost - totalVAT - totalCommission;

    // Calculate the actual margin
    const calculatedMargin = profit / sellingPrice;

    // Display results
    document.getElementById('sellingPrice').innerText = sellingPrice.toFixed(2);
    document.getElementById('totalVAT').innerText = totalVAT.toFixed(2);
    document.getElementById('totalCommission').innerText = totalCommission.toFixed(2);
    document.getElementById('effectiveCost').innerText = (cost + totalVAT + totalCommission).toFixed(2);
    document.getElementById('profit').innerText = profit.toFixed(2);
    document.getElementById('calculatedMargin').innerText = (calculatedMargin * 100).toFixed(2) + '%';
}
