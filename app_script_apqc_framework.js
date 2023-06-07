// Establish goals
// Take titles, ids from the columns 
function getRangeValues(myRange){
  if(!myRange){
    return;
  }
  Logger.log("Range is " + myRange);

  // specify the range of the selection to use in the active sheet
  var range = activeSheet.getRange([myRange]);

  // get the values in the ranges
  var values = range.getValues();

  Logger.log(values);

  return values;
}

// iterate the titles and ids, use id as prefix
function iterateFolderCreation(titles, hierarchyIDs){
  
  var i = 0;
  // iterate the titles
  titles.forEach(
    // anonymous function : no name
    function (row){

      // combine index and title for new folder name
      //Logger.log(hierarchyIDs[i] + ' ' + row);
      newFolderName = hierarchyIDs[i] + ' ' + row;

      // create the folder
      createNewDriveFolder(newFolderName);
      // increment i
      i++;
    }
  );
  return;
}

// create the new drive folder using newFolderName
function createNewDriveFolder(newFolderName){
  if(!newFolderName){
    return;
  }
  // instantiate this
  var newFolder = DriveApp.createFolder(newFolderName);

  // Set root folder
  rootFolder = setRootFolder(rootFolderID);

  // Put new folder under root folder
  rootFolder.createFolder(newFolder);

  return;
}

// set the rootFolder
function setRootFolder(rootFolderID){
  if(!rootFolderID){
    return;
  }
  // Use the folder Id to set the root folder
  var rootFolder = DriveApp.getFolderById(rootFolderID);
  // return the root folder to the calling function
  return rootFolder;
}

// set activeSheet
var activeSheet = SpreadsheetApp.getActiveSheet();
// the title range
var titleColumnRange = 'C2:C110';
// the hieararchy id range
var hierarchyColumnRange = 'B2:B110';
// set the root folder id 
var rootFolderID = 'FOLDER_ID_GOES_HERE';

titles = getRangeValues(titleColumnRange);
hierarchyIDs = getRangeValues(hierarchyColumnRange);
iterateFolderCreation(titles, hierarchyIDs);