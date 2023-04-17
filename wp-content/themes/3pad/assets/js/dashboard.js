// Export Function
function exportFields() {
    event.preventDefault();
  
    // Get the form element containing the ACF fields
    const form = document.querySelector('#post');
  
    // Create an array to store the field data
    const fieldData = [];
  
    // Loop through each field within the form and extract the data
    form.querySelectorAll('*[id^="acf-field_"]').forEach(function(field) {
      let fieldDataItem;
  
      // Extract the data based on the type of the field
      switch (field.type) {
        case 'text':
        case 'textarea':
        case 'select-one':
        case 'checkbox':
        case 'radio':
          fieldDataItem = {
            id: field.id,
            value: field.value
          };
          break;
        case 'select-multiple':
          const options = [];
          field.querySelectorAll('option:checked').forEach(function(option) {
            options.push(option.value);
          });
          fieldDataItem = {
            id: field.id,
            value: options
          };
          break;
        case 'url':
          fieldDataItem = {
            id: field.id,
            value: field.value
          };
          break;
        case 'color':
          fieldDataItem = {
            id: field.id,
            value: field.value
          };
          break;
        case 'number':
          fieldDataItem = {
            id: field.id,
            value: parseInt(field.value)
          };
          break;
        case 'email':
          fieldDataItem = {
            id: field.id,
            value: field.value
          };
          break;
        case 'password':
          fieldDataItem = {
            id: field.id,
            value: field.value
          };
          break;
        case 'title':
          fieldDataItem = {
            id: field.id,
            value: field.value
          };
          break;
      }
  
      // Add the field data to the array
      if (fieldDataItem) {
        fieldData.push(fieldDataItem);
      }
    });
  
    // Convert the array to JSON
    const jsonData = JSON.stringify(fieldData);
  
    // Create a new download link with the JSON data as the href
    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(jsonData));
    const now = new Date();
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    downloadLink.setAttribute("download", `configuration_export_3pad_${timestamp}.txt`);
  
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  
  

////import Function
function importFields() {
    event.preventDefault(); // prevent default form submission
  
    // Get the text input element
    const textInput = document.getElementById("import-fields");
  
    // Check if a text has been inputted
    if (textInput.value.length === 0) {
      alert("Please input the exported settings.");
      return;
    } else {
      try {
        // Parse the text as JSON
        const fileData = JSON.parse(textInput.value);
  
        // Loop through each field and set the value
        fileData.forEach(function (field) {
            // Ignore field with ID "acf-field_63f6c19111d73" 'Delete My Site'
            if (field.id === "acf-field_63f6c19111d73") {
            return;
            }
        
            const inputField = document.getElementById(field.id);
            if (inputField) {
            if (inputField.classList.contains("wp-color-picker")) {
                // Use the wpColorPicker API to set the color picker value
                inputField.value = field.value;
                jQuery(inputField).wpColorPicker("color", field.value);
            } else if (inputField.type === "checkbox") {
                // Handle checkbox values
                inputField.checked = field.value;
            } else {
                inputField.value = field.value;
            }
            }
        });
  
  
        alert("Settings imported successfully. You can now update/save changes.");
      } catch (e) {
        alert("Failed to import settings. Please make sure the input is valid JSON.");
      }
    }
  }
  
  
  
  
  // Add event listeners to the buttons
  document.getElementById("export-btn").addEventListener("click", exportFields);
document.getElementById("import-btn").addEventListener("click", importFields);

///Template Import
// Get all template buttons
const templateButtons = document.querySelectorAll(".template-button");

// Add click event listener to each template button
templateButtons.forEach(function(button) {
  button.addEventListener("click", function(event) {
    // Prevent the default button behavior
    event.preventDefault();

    // Get the template ID from the data attribute
    const templateId = button.getAttribute("data-template-id");

    // Define the JSON string to import based on the template ID
    let jsonString;
    switch (templateId) {
      case "artist-template":
        jsonString = '[{"id":"acf-field_6381d69d45ace","value":"Music Template"},{"id":"acf-field_6381d68145acd","value":""},{"id":"acf-field_631ed9cdb57bb","value":"#d3480d"},{"id":"acf-field_63e7208925e64","value":""},{"id":"acf-field_63e720ba25e65","value":""},{"id":"acf-field_63e7213825e66","value":""},{"id":"acf-field_63f93c4de068e","value":"https://templatefiles.4everland.store/images/pexels-jacob-sierra-15252497.jpg"},{"id":"acf-field_63ef1ea78dfd6","value":"No"},{"id":"acf-field_63f51397b75e7","value":""},{"id":"acf-field_63f671b462884","value":""},{"id":"acf-field_63ab5e1358940","value":"No"},{"id":"acf-field_63f6c19111d73","value":""},{"id":"acf-field_6397a05a07548","value":"Yes"},{"id":"acf-field_6397a05a0754c","value":"Welcome To"},{"id":"acf-field_6397a05a0754f","value":"#ffffff"},{"id":"acf-field_6397a05a07552","value":"system-ui"},{"id":"acf-field_6397a05a07555","value":"200"},{"id":"acf-field_639966e3debad","value":""},{"id":"acf-field_6399675ddebb0","value":""},{"id":"acf-field_6397a05a07558","value":"HOLLOW SHELLS"},{"id":"acf-field_6397a05a0755b","value":"#ffffff"},{"id":"acf-field_6397a05a0755e","value":"system-ui"},{"id":"acf-field_6397a05a07561","value":"900"},{"id":"acf-field_63996716debae","value":""},{"id":"acf-field_6399672ddebaf","value":""},{"id":"acf-field_6397a1c978b2b","value":"Yes"},{"id":"acf-field_6397a1c978b32","value":"Live"},{"id":"acf-field_6397a1c978b38","value":""},{"id":"acf-field_63997cdcd0013","value":0},{"id":"acf-field_63997d0bd0014","value":""},{"id":"acf-field_6397a1c978b35","value":""},{"id":"acf-field_63998027f1990","value":""},{"id":"acf-field_6397a1c978b3c","value":"BLOG"},{"id":"acf-field_6397a1c978b43","value":""},{"id":"acf-field_63997d32d0015","value":0},{"id":"acf-field_63997d4fd0017","value":""},{"id":"acf-field_6397a1c978b3f","value":""},{"id":"acf-field_6399806bf1991","value":""},{"id":"acf-field_6397a1c978b47","value":"SHOP"},{"id":"acf-field_6397a1c978b4e","value":""},{"id":"acf-field_63997d3fd0016","value":0},{"id":"acf-field_63997d65d0018","value":""},{"id":"acf-field_6397a1c978b4b","value":""},{"id":"acf-field_6399807cf1992","value":""},{"id":"acf-field_6397a1c978b51","value":"system-ui"},{"id":"acf-field_6397a1c978b54","value":"900"},{"id":"acf-field_6397a0fa13f1d","value":"https://templatefiles.4everland.store/images/pexels-jacob-sierra-15252497.jpg"},{"id":"acf-field_63eb00509525b","value":50},{"id":"acf-field_63eb017a9525c","value":50},{"id":"acf-field_6397a0fa13f23","value":"#000000"},{"id":"acf-field_63ad2d1a0bb6a","value":""},{"id":"acf-field_6397a0fa13f29","value":""},{"id":"acf-field_6397a0fa13f2c","value":""},{"id":"acf-field_6397a0fa13f32","value":""},{"id":"acf-field_63979f92a76d4","value":"Yes"},{"id":"acf-field_63979f92a76df","value":"fas fa-newspaper"},{"id":"acf-field_63979f92a76ee","value":"#ffffff"},{"id":"acf-field_639cd21b02667","value":""},{"id":"acf-field_63979f92a76e7","value":""},{"id":"acf-field_6398dbff900f5","value":"No"},{"id":"acf-field_63979f92a76f4","value":"fas fa-fire"},{"id":"acf-field_63979f92a7705","value":"#dd3333"},{"id":"acf-field_639cd24a02668","value":""},{"id":"acf-field_63979f92a76fb","value":""},{"id":"acf-field_6398dc4f900f6","value":""},{"id":"acf-field_63979f92a770b","value":""},{"id":"acf-field_63979f92a7720","value":""},{"id":"acf-field_639cd25602669","value":""},{"id":"acf-field_63979f92a7713","value":""},{"id":"acf-field_6398dc5e900f7","value":""},{"id":"acf-field_63979f92a7725","value":""},{"id":"acf-field_63979f92a772d","value":""},{"id":"acf-field_639cd2620266a","value":""},{"id":"acf-field_63979f92a7728","value":""},{"id":"acf-field_6398dc6d900f8","value":""},{"id":"acf-field_63979f1583ed8","value":"Yes"},{"id":"acf-field_63979f1583edb","value":"youtube"},{"id":"acf-field_63979f1583ede","value":""},{"id":"acf-field_639cdba321817","value":""},{"id":"acf-field_63979f1583ee1","value":""},{"id":"acf-field_63979f1583ee4","value":"twitter"},{"id":"acf-field_63979f1583ee7","value":""},{"id":"acf-field_639cdbbc21818","value":""},{"id":"acf-field_63979f1583eea","value":""},{"id":"acf-field_63979f1583eed","value":"instagram"},{"id":"acf-field_63979f1583ef1","value":""},{"id":"acf-field_639cdbbe21819","value":""},{"id":"acf-field_63979f1583ef4","value":""},{"id":"acf-field_63979f1583ef7","value":"facebook"},{"id":"acf-field_63979f1583efa","value":""},{"id":"acf-field_639cdbc12181a","value":""},{"id":"acf-field_63979f1583efd","value":""},{"id":"acf-field_63979f1583f00","value":""},{"id":"acf-field_63979f1583f03","value":""},{"id":"acf-field_639cdbc32181b","value":""},{"id":"acf-field_63979f1583f06","value":""},{"id":"acf-field_63979f1583f09","value":""},{"id":"acf-field_63979f1583f0c","value":""},{"id":"acf-field_639cdbc42181c","value":""},{"id":"acf-field_63979f1583f0f","value":""},{"id":"acf-field_6355c49c72d25","value":"Yes"},{"id":"acf-field_6355c54b72d27","value":"fas fa-music"},{"id":"acf-field_63562fde64f11","value":""},{"id":"acf-field_63d97b01322d6","value":""},{"id":"acf-field_6355c56972d28","value":"fab fa-youtube"},{"id":"acf-field_63562fec64f12","value":""},{"id":"acf-field_63d97af2322d5","value":""},{"id":"acf-field_6355c56d72d29","value":"fas fa-comment"},{"id":"acf-field_63562ff364f13","value":""},{"id":"acf-field_63d97aa5322d4","value":""},{"id":"acf-field_6355c57872d2b","value":""},{"id":"acf-field_6355c59072d2c","value":""},{"id":"acf-field_63d580c992c2d","value":"Discord"},{"id":"acf-field_63d580c992c30","value":""},{"id":"acf-field_63d580c992c33","value":""},{"id":"acf-field_63d580c992c40","value":null},{"id":"acf-field_63d580c992c46","value":"1"},{"id":"acf-field_63d580c992c4c","value":"1061496413474783352"},{"id":"acf-field_63d580c992c51","value":"1067294783153901588"},{"id":"acf-field_63ef19eb313f0","value":"embed1-button"},{"id":"acf-field_63d580c992c5f","value":"https://template.typeform.com/to/QurPHBFr"},{"id":"acf-field_63d580c992c67","value":"Yes"},{"id":"acf-field_63ef19b6313ef","value":""},{"id":"acf-field_63d583e00ae4f","value":""},{"id":"acf-field_63d583e70ae51","value":""},{"id":"acf-field_63ef196c313ee","value":""},{"id":"acf-field_63d584140ae62","value":"https://hello.com"},{"id":"acf-field_63d583ee0ae54","value":""},{"id":"acf-field_63ef1923313ed","value":""},{"id":"acf-field_63d584190ae66","value":""},{"id":"acf-field_63d583f40ae58","value":""},{"id":"acf-field_63d9871ea201f","value":"embed2-button"},{"id":"acf-field_63d583d10ae4c","value":"https://app.huddle01.com/qjx-yqwd-bay"},{"id":"acf-field_63d583dc0ae4e","value":"Yes"},{"id":"acf-field_63ef1b0d313f5","value":"embed4-button"},{"id":"acf-field_63d584110ae60","value":"https://mirror.xyz/cryptojeter.eth"},{"id":"acf-field_63d583ea0ae52","value":"Yes"},{"id":"acf-field_63ef1ae3313f4","value":"embed5-button"},{"id":"acf-field_63d584120ae61","value":"https://www.ketnipz.com/collections/spring-2023"},{"id":"acf-field_63d583eb0ae53","value":"Yes"},{"id":"acf-field_63ef1a9d313f3","value":"embed7-button"},{"id":"acf-field_63d584150ae63","value":"https://audius.co/embed/playlist/QZ4R1vG?flavor=card"},{"id":"acf-field_63d583f00ae55","value":""},{"id":"acf-field_63ef1a67313f2","value":"embed8-button"},{"id":"acf-field_63d584160ae64","value":"https://www.youtube.com/embed/videoseries?list=PLhsz9CILh357zA1yMT-K5T9ZTNEU6Fl6n"},{"id":"acf-field_63d583f10ae56","value":""},{"id":"acf-field_63ef1a31313f1","value":"comments-button"},{"id":"acf-field_63d584170ae65","value":""},{"id":"acf-field_63d583f20ae57","value":""}]';
        break;
      case "podcast-template":
        jsonString = '[{"id":"acf-field_6381d69d45ace","value":"hello from podcast template"}]';
        break;
      case "model-template":
        jsonString = '[{"id":"acf-field_6381d69d45ace","value":"hello from model template"}]';
        break;
      case "blogger-template":
        jsonString = '[{"id":"acf-field_6381d69d45ace","value":"hello from blogger template"}]';
        break;
      case "gamer-template":
        jsonString = '[{"id":"acf-field_6381d69d45ace","value":"hello from gamer template"}]';
        break;
      case "entrepreneur-template":
        jsonString = '[{"id":"acf-field_6381d69d45ace","value":"hello from entrepreneur template"}]';
        break;
      case "restaurant-template":
        jsonString = '[{"id":"acf-field_6381d69d45ace","value":"hello from restaurant template"}]';
        break;
      default:
        jsonString = "";
        break;
    }

    // Set the input value of "import-fields" to the JSON string
    const importFieldsInput = document.getElementById("import-fields");
    importFieldsInput.value = jsonString;

    // Click the "import-btn" button
    const importBtn = document.getElementById("import-btn");
    importBtn.click();
  });
});




//Disable button Save
const templateDirect = document.getElementById("template-view");
templateDirect.addEventListener("click", function (event) {
  // Prevent the default button behavior
  event.preventDefault();

  // Define an array of link types and their corresponding redirect URLs
  const linkTypes = [
    { type: "artist-link", url: "http://3pad.icp.xyz/music-template-demo" },
    { type: "podcast-link", url: "http://3pad.icp.xyz/model-template-demo" },
      { type: "model-link", url: "hhttp://3pad.icp.xyz/podcast-template-demo" },
      { type: "blogger-link", url: "http://3pad.icp.xyz/blogger-template-demo" },
      { type: "gamer-link", url: "http://3pad.icp.xyz/gamer-template-demo" },
      { type: "entrepreneur-link", url: "http://3pad.icp.xyz/entrepreneur-template-demo" },
      { type: "restaurant-link", url: "http://3pad.icp.xyz/restaurant-template-demo" },

    // Add more link types and URLs as needed
  ];

  // Loop through each link type and add an event listener that redirects to the specified URL
  linkTypes.forEach((link) => {
    const myLinks = document.getElementsByClassName(link.type);

    for (let i = 0; i < myLinks.length; i++) {
      myLinks[i].addEventListener("click", function () {
        window.open(link.url, "_blank");
      });
    }
  });
});





  
///Help Button Js

  jQuery(document).ready(function($){
    $('.help-button').on('click', function() {
      $('.help-button-wrapper').toggleClass('expanded');
    });
    });

    jQuery(document).ready(function($){
      $(window).scroll(function(){
          if($(this).scrollTop() > 10){
              $('#wpadminbar').addClass('sticky');
          }
          else{
              $('#wpadminbar').removeClass('sticky');
          }
      });
  });

  
  ////Preview Button on home page customization
  jQuery(document).ready(function ($) {
    // Get the current URL
const currentUrl = window.location.href;

// Find the index of "/wp-admin/admin.php" in the URL
const wpAdminIndex = currentUrl.indexOf('/wp-admin/admin.php');

// Extract the part of the URL before "/wp-admin/admin.php"
const siteUrl = currentUrl.substring(0, wpAdminIndex);

// Use the siteUrl variable in your code
      
      ///Launch Button
      //$('#publishing-action').after('<div class="button button-primary button-large launch-bt" id="preview-bt" style=" background: #397939; width: 30%; ">Launch</div></a>');

      //Preview Button
      $('#publishing-action').after('<a href="' + siteUrl + '/?customize-home=' + Date.now() + '" target="_blank"><div class="button button-primary button-large" id="preview-bt" style=" width: 100%; ">Preview</div></a>');

  });
  


  jQuery(document).ready(function($){
    $(window).scroll(function(){
        if($(this).scrollTop() > 100){
            $('#major-publishing-actions').addClass('sticky');
        }
        else{
            $('#major-publishing-actions').removeClass('sticky');
        }
    });
});
