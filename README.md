## Overview

Using both the Hexpbot and Unsplash API, this page generates a number of random images and changes their appearence based on the values obtained from the hexbot.

* [Find out more about Hexbot](https://noopschallenge.com/challenges/hexbot)

* [Find out more about Unsplash API](https://unsplash.com/developers)

## How to use

Once the page is loaded you can generate 1 to 30 images which will have a randomised effect applied to them.

You can click these images to get a close-up and compare the original image to the filtered one.

## Developer notes

To use the Unsplash API you will need an authorisation key which is very easy to obtain.

If the access key provided no longer works then you can switch out the variable **UNSPLASH_ACCESS_KEY** found at the top of the "scripts.js" file with your own, leaving the __&client_id=__ where it is.

```Javascript
const UNSPLASH_ACCESS_KEY = '&client_id=4d4c6425e3cb8b6ae37625af6eb8938c1b574f4a719ad0992d55ee64c9b1cc58'
```
