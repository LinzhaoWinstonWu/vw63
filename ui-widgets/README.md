# ui-widgets
A collection of latest UI widget designs used in mobile apps from Google Play Store.

## Prerequisites
* [MySQL](https://dev.mysql.com/downloads/)
* [Node.js 6.11.2+](http://nodejs.org)

## Getting Started
1. Clone the repository
```bash
# Get the latest snapshot
git clone https://github.com/bernardcwj/ui-widgets.git

# Change directory
cd ui-widgets/client

# Install NPM dependencies
npm install

# Change directory
cd ../middleware

# Install NPM dependencies
npm install
```
2. Update `knexfile.js` with your MySQL configurations
```bash
vim knexfile.js
```
3. Run the migration on your local MYSQL
```bash
knex migrate:latest
```

## Dataset
The dataset in `data/top_10000_google_play_20170510_cleaned_outputs_verbose_xml` is collected using a UIAutomator tool and it comprises of various screenshots and XML dump.

**Note:** For demonstration purposes, only the data of a single mobile app is made available.

### Preprocess
Extract image clippings of widgets and their respective metadata
```bash
python tools/process-clipping.py --input_dir data
```

### Output
The output will have the following directory structure:
```
widget_clippings
|-- Button
	|-- clipping-*.png (Image files)
|-- CheckBox
|-- EditText
|-- ImageButton
|-- ProgressBar
|-- Spinner
|-- ToggleButton
|-- View
|-- meta_dump.txt
|-- statistics.txt
```
The `meta_dump.txt` contains information about all the widget clippings:
```
{
	clipping-*:
	{
		clickable:
		color:
		content-desc:
		coordinates:
		{
			from: [],
			to: []
		}
		dimensions:
		focusable:
		leaf:
		src:
		text:
		widget_class: 
	},
	...
}
```

## Deployment
```bash
# Start the app
node app.js
```
Enter `http://localhost:3000` under Site URL

### Import data to MySQL
Click on ![alt text](https://www.materialui.co/materialIcons/file/file_upload_black_24x24.png "File upload") and upload the folder `widget_clippings`