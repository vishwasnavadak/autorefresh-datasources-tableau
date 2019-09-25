# Refresh All Data Sources

A simple example of a way to auto refresh all data sources present on a Tableau dashboard at regular time intervals.

## How to use

### Using directly from my server

Download the `RefreshAll.trex` file from this repo and drag in the extension, select **My Extension** and select the downloaded .trex file.

### Self Hosted

Download the complete source repository, customize the JS and HTML if needed and host them in your web server. Update the url in the .trex file with the web server where extension is hosted.

```xml
...
<url>https://yourcompany.com/autorefresh-datasources-tableau/</url>
...

```

_Main source for refreshing the data source is forked from https://github.com/KeshiaRose/refresh-all-example_
