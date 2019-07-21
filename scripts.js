const API_BASE = 'https://api.noopschallenge.com';
const UNSPLASH_API = 'https://api.unsplash.com/photos/random?count=4';
const UNSPLASH_ACCESS_KEY = '&client_id=4d4c6425e3cb8b6ae37625af6eb8938c1b574f4a719ad0992d55ee64c9b1cc58'

/* Modified function provided by the Hexbot developers to get both the Hex values and images */
function NOOPBOT_FETCH(options, onComplete) {
  if (!options.API) {
    console.error('API not set');
    return;
  }

  if (!onComplete) {
    console.warn('onComplete not set, nothing will happen.');
  }

  let params = [];
  Object.keys(options).forEach(key => params.push(`${key}=${options[key]}`))
  let url = `${API_BASE}/${options.API}?` + params.join('&');
  let unsplash_url = UNSPLASH_API + options.count + UNSPLASH_ACCESS_KEY;

  // run the API for Hexbot
  window.fetch(url)
    .then(function(response_hexbot) {
      return response_hexbot.json();
    }).then(function(responseJson_hexbot) {
      // run the API for Unsplash
      window.fetch(unsplash_url)
      .then(function(response_unsplash) {
        return response_unsplash.json();
      }).then(function(responseJson_unsplash) {
        // pass the values onward
        onComplete(responseJson_hexbot, responseJson_unsplash);
      });
    });
}

/* Close the modal via Escape */
function listener(evt) {
  var modal = document.getElementById("myModal");
  if (evt.keyCode === 27) {
    modal.style.display = "none";
  }
}

/* The main function */
function main() {
  // Allow the user to close the modal
  let closeSpan = document.getElementsByClassName("close")[0];
  let modal = document.getElementById("myModal");
  closeSpan.onclick = function() {
    modal.style.display = "none";
  };

  // Allow the user to apply changes to the model
  let beautifySpan = document.getElementsByClassName("beautify")[0];
  beautifySpan.onclick = function() {
    let image = document.getElementById("img01");
    let color = image.name;
    // Toggle between the filters
    if (image.style.filter === "") {
      beautifySpan.style.color = "#AA8CC5";
      image.style.filter = "sepia(" + hexToRgb(color).r / 255 * 100 + "%) saturate(" + hexToRgb(color).g / 255 * 100 + "%) hue-rotate(" + hexToRgb(color).b / 360 * 100 + "deg)";
    } else {
      beautifySpan.style.color = "white";
      image.style.filter = "";
    }
  };

  // Generate the images
  generateImages();
}

/* Sanitise inputs and generate images */
function generateImages() {
  let imgCount = document.getElementById('imgCount').value;

  // Delete the warning message
  let warning = document.getElementById('warning');
  warning.style.display = "none";

  // Sanitise the input is a number
  imgCount = imgCount.replace(/\D/g, '');

  // Check the input is legitimate
  if (imgCount == 0) {
    // Let the user know why they cant do this
    warning.style.display = "block";
    warning.innerHTML = "You realise you tried to generate 0 images, right?";
    return;
  } else if (imgCount > 30) {
    warning.style.display = "block";
    warning.innerHTML = "You cant generate more than 30 images at once without making multiple requests, so here's 30.";
    imgCount = 30;
  }

  // Apply any changes to the input to the front end
  document.getElementById('imgCount').value = imgCount;

  // Delete all the section elements before creating new ones
  let sections = document.getElementsByTagName('section');
  while (sections[0]) {
    sections[0].parentNode.removeChild(sections[0]);
  }

  // Grab a hex code and a random image
  NOOPBOT_FETCH({
    API: 'hexbot',
    count: imgCount,
  }, draw);
}

/* Create a container and append the related information */
function draw(hexValues, imageUrls) {
  // Store the hex colors from hexbot in array
  let { colors } = hexValues;

  colors.forEach(function(color, count) {
    // Create a container with an image
    let container = document.createElement("section");
    let image = document.createElement("img");

    // Get and Assign the image source & description
    image.src = imageUrls[count].urls.full;
    if (imageUrls[count].alt_description === null) {
      image.alt = "No description provided";
    } else {
      image.alt = imageUrls[count].alt_description.toUpperCase();
    }

    // Create all the sub-elements for the container
    let label_sepia = document.createElement("h2");
    let label_sat = document.createElement("h2");
    let label_hue = document.createElement("h2");
    let label_hex = document.createElement("h2");
    let label_sepia_text = document.createTextNode("Sepia: " + Math.round(hexToRgb(color.value).r / 255 * 100) + "%");
    let label_sat_text = document.createTextNode("Saturate: " + Math.round(hexToRgb(color.value).g / 255 * 100) + "%");
    let label_hue_text = document.createTextNode("Hue-rotate: " + Math.round(hexToRgb(color.value).b / 360 * 100) + "deg");
    let label_hex_text = document.createTextNode(color.value);
    label_hex.style.color = color.value;

    // Filter and style the image
    image.style.width = "300px";
    image.style.height = "300px";
    image.style.filter = "sepia(" + hexToRgb(color.value).r / 255 * 100 + "%) saturate(" + hexToRgb(color.value).g / 255 * 100 + "%) hue-rotate(" + hexToRgb(color.value).b / 360 * 100 + "deg)";

    // Assemble the container
    document.body.appendChild(container);
    container.appendChild(image);

    container.appendChild(label_sepia);
    container.appendChild(label_sat);
    container.appendChild(label_hue);
    container.appendChild(label_hex);

    label_sepia.appendChild(label_sepia_text);
    label_sat.appendChild(label_sat_text);
    label_hue.appendChild(label_hue_text);
    label_hex.appendChild(label_hex_text);

    // Add listeners to the container
    container.onclick = function(event) {
      // Get the image and insert it inside the modal
      var modal = document.getElementById("myModal");
      var modalImg = document.getElementById("img01");
      var captionText = document.getElementById("caption");
      // Show the modal, update the source and description
      modal.style.display = "block";
      modalImg.src = image.src;
      modalImg.name = color.value;
      captionText.innerHTML = image.alt;
    };
  });
}

/* Convert Hex values into their respective RGB values */
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
