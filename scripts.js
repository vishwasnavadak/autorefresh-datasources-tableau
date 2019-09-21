tableau.extensions.initializeDialogAsync().then(() => {
  let timer;
  let interval = math.parseInt(document.getElementById("interval")) * 1000;
  console.log("TCL: interval", interval);
  try {
    timer = setInterval(refreshAllDataSources, interval);
  } catch {
    clearInterval(timer);
  }
});

function refreshAllDataSources() {
  let dataSourceFetchPromises = [];
  let dashboardDataSources = {};
  const dashboard = tableau.extensions.dashboardContent.dashboard;

  dashboard.worksheets.forEach(function(worksheet) {
    dataSourceFetchPromises.push(worksheet.getDataSourcesAsync());
  });

  Promise.all(dataSourceFetchPromises).then(function(fetchResults) {
    fetchResults.forEach(function(dataSourcesForWorksheet) {
      dataSourcesForWorksheet.forEach(function(dataSource) {
        if (!dashboardDataSources[dataSource.id]) {
          dashboardDataSources[dataSource.id] = dataSource;
          dataSource.refreshAsync();
        }
      });
    });
  });
}
