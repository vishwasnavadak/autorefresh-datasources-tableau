$(document).ready(function() {
  tableau.extensions.initializeDialogAsync().then(() => {
    let timer;
    try {
      timer = setInterval(refreshAllDataSources, 10000);
      console.log("Refresh Started");
    } catch (err) {
      clearInterval(timer);
    }
  });
});

function refreshAllDataSources() {
  document.getElementById("refresh").innerHTML = "Refreshing Data Sources";
  let dataSourceFetchPromises = [];
  let dashboardDataSources = {};
  const dashboard = tableau.extensions.dashboardContent.dashboard;

  dashboard.worksheets.forEach(function(worksheet) {
    dataSourceFetchPromises.push(worksheet.getDataSourcesAsync());
  });

  Promise.all(dataSourceFetchPromises)
    .then(function(fetchResults) {
      fetchResults.forEach(function(dataSourcesForWorksheet) {
        dataSourcesForWorksheet.forEach(function(dataSource) {
          if (!dashboardDataSources[dataSource.id]) {
            dashboardDataSources[dataSource.id] = dataSource;
            dataSource.refreshAsync();
          }
        });
      });
    })
    .then(() => {
      document.getElementById("refresh").innerHTML = "";
    });
}
