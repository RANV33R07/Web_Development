
async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
    });
    return response.json(); 
  }

document.addEventListener("DOMContentLoaded", function() {
    // File submission checking
    var fileInput = document.querySelector("#uploadBtn");
    var fileListContainer = document.querySelector("#file-list");
    var submitBtn = document.querySelector("#submit-button");
    var inputs = document.querySelectorAll(".text");

    fileInput.addEventListener('change', function() {
        // Clear previous file list
        fileListContainer.innerHTML = '';

        // Check if file is CSV
        if (fileInput.files.length && !fileInput.files[0].name.includes(".csv")) {
            alert("Only CSV files are accepted!");
            fileInput.value = "";
        }

        // Only allow one file to be uploaded
        if (fileInput.files.length > 1) {
            alert("Only one file can be uploaded at a time.");
            fileInput.value = "";
        }

        // Display the selected file
        var file = fileInput.files[0];
        var fileItem = document.createElement('div');
        fileItem.className = 'files';
        var fileName = document.createTextNode(file.name);
        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-button';

        removeButton.addEventListener('click', function() {
            fileInput.value = ''; // Clear the file input
            fileListContainer.innerHTML = ''; // Clear the file list container
        });

        fileItem.appendChild(fileName);
        fileItem.style.color = "black";
        fileItem.style.backgroundColor  = "#D4D9E7";
        fileItem.appendChild(removeButton);
        fileListContainer.appendChild(fileItem);
    });

    // Submit button click handler for form validation
    submitBtn.addEventListener('click',function(event) {
        var alertShown = false; // Variable to track if alert has been shown

        inputs.forEach(function(input) {
            if (input.value.trim() === "") {
                if (!alertShown) { // Only show alert if not already shown
                    alert("Please enter all the details.");
                    alertShown = true; // Set alertShown to true
                }
                event.preventDefault(); // Prevent form submission
            }
        });
    });

    // Submit form handler
    var form = document.getElementById("uploadForm");

    form.addEventListener('submit', async function(event) {
        const question = document.querySelector('.question1').value.trim();
        const fileUpload = document.getElementById('uploadBtn').files.length;
        const urlLink = document.querySelector('textarea[name="url_link"]').value.trim();

        if (!question || (fileUpload === 0 && !urlLink)) {
            event.preventDefault(); // Prevent form submission if expectations are not provided or neither file nor URL link is given
            alert('Either upload a file or provide a URL link.');
        } else {
            event.preventDefault(); 



            document.querySelector(".right1").style.display = "none";
            document.querySelector(".right2").style.display = "flex";
            answer = document.querySelector(".answer");
            question1 = document.querySelector(".question1");
            question2 = document.querySelector(".question2");
            question1.innerHTML = question;
            question2.innerHTML = question;


            let result = await postData("/api",{"question" : question})

            answer.innerHTML = result.result;
            // Send form data to server using fetch API
        }
    });
});
