
function fetchData({ categoryIndex, startDate, endDate }) {
    const url = `https://www.valueresearchonline.com/downloads/fund-selector-xls/?source_url=%2Ffunds%2Fselector-data%2Fprimary-category%2F${categoryIndex}%2Fequity%2F%3Fstart-date%3D${startDate}%26end-date%3D${endDate}%26plan-type%3Ddirect%26tab%3Dsnapshot%26output%3Dhtml-data`;
    console.log('url', url);
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.blob())
        .then((data) => {
            const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'table_data.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        })
        .catch(error => {
            console.log('err', JSON.stringify(error));
        });

}
document.getElementById('fetchData').addEventListener('click', () => {
    const categoryIndex = document.getElementById('categoryIndex').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    var wholeNumberPattern = /^[0-9]*$/;
    var sd = new Date(startDate);
    var ed = new Date(endDate);

    switch (true) {
        case !wholeNumberPattern.test(categoryIndex):
            document.getElementById('error').innerHTML = 'Please enter a valid whole number (no negatives or decimals).';
            break;
        case sd > ed:
            document.getElementById('error').innerHTML = 'Start date cannot be later than the end date';
            break;
        default:
            document.getElementById('error').innerHTML = '';
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs.length > 0) {
                    const tabId = tabs[0].id;

                    // You can now use the tabId for further actions
                    console.log('Current Tab ID:', tabId);

                    // Example: Execute a script in the active tab
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        function: fetchData,
                        args: [{ categoryIndex, startDate, endDate }]
                    });
                } else {
                    console.log('No active tab found.');
                }
            });
            break;
    }


});


