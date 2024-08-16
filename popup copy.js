document.getElementById('fetchData').addEventListener('click', ({ tabId }) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const tabId = tabs[0].id;

            // You can now use the tabId for further actions
            console.log('Current Tab ID:', tabId);

            // Example: Execute a script in the active tab
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                function: fetchData1
            });
        } else {
            //   document.getElementById('tabId').textContent = 'No active tab found.';
        }
    });
});

function fetchData() {
    fetch('https://www.valueresearchonline.com/funds/selector-data/primary-category/2/equity/?start-date=04-Jul-2023&end-date=14-Aug-2024&plan-type=direct&tab=snapshot&output=html-data', {
        method: 'GET',
        credentials: 'include'
    })
   
        .then(response => response.json())
        .then(data => {
            console.log('res', JSON.stringify(data.html_data));
            document.querySelector('.fund-page-section').innerHTML = data.html_data;
            Promise.resolve(true)
        })
        .then(() => {
            // document.getElementById('exportBtn').addEventListener('click', () => {
            // Get the table element
            const table = document.getElementById('funds_screener_table');

            // Initialize a CSV string
            let csvContent = "";

            // Iterate through rows and cells of the table to construct CSV data
            for (let row of table.rows) {
                let rowData = [];
                for (let cell of row.cells) {
                    rowData.push(cell.textContent.replace(/,/g, '')); // Remove commas to prevent CSV issues
                }
                csvContent += rowData.join(',') + '\n';
            }

            // Create a Blob from the CSV string
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'table_data.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            //   });

        })
        .catch(error => {
            console.log('err', JSON.stringify(error));
            //   document.getElementById('response').innerHTML = 'Error: ' + error;
        });
}
function fetchData1() {
    fetch('https://www.valueresearchonline.com/downloads/fund-selector-xls/?source_url=%2Ffunds%2Fselector-data%2Fprimary-category%2F1%2Fequity%2F%3Fstart-date%3D01-Aug-2023%26end-date%3D14-Aug-2024%26plan-type%3Ddirect%26tab%3Dsnapshot%26output%3Dhtml-data', {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.blob())
        // .then(data => {
        //     console.log('res', JSON.stringify(data.html_data));
        //     document.querySelector('.fund-page-section').innerHTML = data.html_data;
        //     Promise.resolve(true)
        // })
        .then((data) => {
            // document.getElementById('exportBtn').addEventListener('click', () => {
            // Get the table element
            // const table = document.getElementById('funds_screener_table');

            // Initialize a CSV string
            // let csvContent = "";

            // Iterate through rows and cells of the table to construct CSV data
            // for (let row of table.rows) {
            //     let rowData = [];
            //     for (let cell of row.cells) {
            //         rowData.push(cell.textContent.replace(/,/g, '')); // Remove commas to prevent CSV issues
            //     }
            //     csvContent += rowData.join(',') + '\n';
            // }

            // Create a Blob from the CSV string
            const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'table_data.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            //   });

        })
        .catch(error => {
            console.log('err', JSON.stringify(error));
            //   document.getElementById('response').innerHTML = 'Error: ' + error;
        });
}
