## Overview

Using both the Hexpbot and Unsplash API, the webpage generates a number of random images and changes their appearence based on the values obtained from the hexbot.

* [Find out more about Hexbot](https://noopschallenge.com/challenges/hexbot)

* [Find out more about Unsplash API](https://unsplash.com/developers)

## How to use

Once the page is loaded you can generate 1 to 30 images which will have a randomised effect applied to them.

You can click these images to get a close-up and compare the original image to the filtered one.

### Screenshots

Below are screenshots of the webpage, the first you will see upon loading the webpage and the second will appear once you click any of the images.

![Homepage](https://github.com/ChrisLewisX/Hexbot-Challenge/blob/master/Homepage.PNG "The Homepage")

![Clicked On Image](https://github.com/ChrisLewisX/Hexbot-Challenge/blob/master/ClickedImage.PNG "Clicked on Image")

## Developer notes

To use the Unsplash API you will need an authorisation key which is very easy to obtain. To find out more follow the link at the top of this README.

If the access key i've provided no longer works then you can modify the variable **UNSPLASH_ACCESS_KEY** found at the top of the "scripts.js" file with your own, leaving the __&client_id=__ where it is.

```Javascript
const UNSPLASH_ACCESS_KEY = '&client_id=4d4c6425e3cb8b6ae37625af6eb8938c1b574f4a719ad0992d55ee64c9b1cc58'
```
