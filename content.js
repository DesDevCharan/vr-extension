// // Function to make an API request to the host website
// async function fetchData() {
//     try {
//       const response = await fetch('https://www.valueresearchonline.com/funds/selector-data/primary-category/1/equity/?start-date=04-Jul-2023&end-date=14-Aug-2024&plan-type=direct&tab=snapshot&output=html-data', {
//         method: 'GET',
//         credentials: 'include'  // This ensures cookies are sent with the request
//       });
//       const data = await response.json();
//       console.log('API Response:', data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }
  
//   // Call fetchData when the content script runs
//   fetchData();
  