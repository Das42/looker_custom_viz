# Creating Custom Looker Visualizations 
This repository was built to explore creating custom visualizations within Looker.   
The repository contains all of the required packages and dependencies to get up and running with custom visual creation using Javascript's React, D3 and Typescript libraries.   
Additionally, the repository is configured to post completed code for new visualizations to an S3 bucket mantained by DAS42 from which the code can be accessed from any Looker repository.   

## Setup 

1) Pull project code from GitHub
2) Recommended: Install Visual Studio Code https://code.visualstudio.com/
3) Open the project folder on Visual Studio Code
4) Download Node.js https://nodejs.org/en/
5) Confirm npm is installed by running `npm -v` from your terminal
6) Download project dependencies:  
   From the root of the project folder in your terminal run: `npm install`

## How to Develop New Content 

1) Create a new branch 
2) Create a file in src/visualizations for your code (can be .ts, .js or .tsx file type) 
3) Add a new entry point to the webpack.config.js file by adding a key/value pair to the 'entry' dictionary with the relative file path to your code.
4) Start the dev server:  
   From the root of the project folder run: `npm run start:dev`
5) Build the project:  
  In a separate terminal window, navigate to the root of the project folder and run: `npm run build`
6) Register your visualization in Looker.   
   Add a new visualization to the project manifest file of your Looker project like below. 
```
visualization: {
  id: "my_new_visualization"
  label: "My New Vis"
  url: "https://localhost:8081/dist/my_new_visualization.js"
}
```

7) You can now develop your visualization. Updates to the code will render in Looker whenever your code file is saved. 

## How to Distribute Content
1) Once development is completed, update the project manifest file in Looker to point at the distribution file for your code which is stored in the following S3 Bucket: arn:aws:s3:::das42-looker-custom-visualizations
```
visualization: {
  id: "my_new_visualization_s3"
  label: "My New Vis (S3)"
  url: "https://das42-looker-custom-visualizations.s3-us-west-2.amazonaws.com/my_new_visualization.js"
}
```

#### Note: In order to allow Looker to access your localhost, you may need to manually approve the connection. To do so, navigate to https://localhost:8081/ , if an error page pops up, manually override the warning and navigate to the page.


## Useful Documentation 

### [Getting Started Guide &rarr;](https://github.com/looker/custom_visualizations_v2/blob/master/docs/getting_started.md)

### [Visualization API Reference &rarr;](https://github.com/looker/custom_visualizations_v2/blob/master/docs/api_reference.md)
