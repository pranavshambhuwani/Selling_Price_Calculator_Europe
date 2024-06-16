function calculateSellingPrice() {
    // Get input values
    const cost = parseFloat(document.getElementById('cost').value);
    const shipping = parseFloat(document.getElementById('shipping').value);
    const vatRate = parseFloat(document.getElementById('vatRate').value) / 100;
    const commissionRate = parseFloat(document.getElementById('commissionRate').value) / 100;
    const desiredMargin = parseFloat(document.getElementById('desiredMargin').value) / 100;

    // Function to perform goal seek
    function goalSeek(fn, target, guess = 1, epsilon = 0.0001, maxIter = 100) {
        let x = guess;
        let iteration = 0;
        while (Math.abs(fn(x) - target) > epsilon && iteration < maxIter) {
            x = x - (fn(x) - target) / (fn(x + epsilon) - fn(x));
            iteration++;
        }
        return x;
    }

    // Function to calculate the margin
    function calculateMargin(sellingPrice) {
        const totalVAT = (sellingPrice + shipping) - ((sellingPrice + shipping) / (1 + vatRate));
        const totalCommission = commissionRate * (sellingPrice + shipping);
        const effectiveCost = cost + totalVAT + totalCommission;
        const profit = sellingPrice - effectiveCost;
        return profit / sellingPrice;
    }

    // Perform goal seek to find the correct selling price
    const sellingPrice = goalSeek(calculateMargin, desiredMargin);

    // Calculate final values based on the found selling price
    const totalVAT = (sellingPrice + shipping) - ((sellingPrice + shipping) / (1 + vatRate));
    const totalCommission = commissionRate * (sellingPrice + shipping);
    const effectiveCost = cost + totalVAT + totalCommission;
    const profit = sellingPrice - effectiveCost;
    const calculatedMargin = profit / sellingPrice;

    // Update the results in the HTML
    document.getElementById('sellingPrice').innerText = sellingPrice.toFixed(2);
    document.getElementById('totalVAT').innerText = totalVAT.toFixed(2);
    document.getElementById('totalCommission').innerText = totalCommission.toFixed(2);
    document.getElementById('effectiveCost').innerText = effectiveCost.toFixed(2);
    document.getElementById('profit').innerText = profit.toFixed(2);
    document.getElementById('calculatedMargin').innerText = (calculatedMargin * 100).toFixed(2) + '%';
}
