## Introduction

**WHAT IS *THE HIDDEN HARMONY?*** 

Essentialy, is *a digital synesthetic system*, a system of communication between the color and sound spaces that can be used to realize different installations and creative systems.

In time the relation between colours and sound has been studied with more than one theory. From Greeks with **Aristotle** (*On Colours*), to **I. Newton** (*Opticks*) and many other artists like **W. Kandinsky** (*On the Spiritual in Art*) and **A. Skrjabin** (*Prometheus: The Poem of Fire*). The relation between colours and sounds I developed is not based on a scientific description of these two realms, but more on my personal view on how these interract. The series of studies under The Hidden Harmony tries to augment our perception. What if it would be possible to listen to a painting or see colours while listening to music?

**The method** 

The method is designed to create a one-to-one relation between colours and sound frequencies: luminance to octave and hue value to the 12 notes. It is useful to go through the HSL representation of the color before reaching the sound frequency domain. Note that the reverse is also possible.

<p  align="center">
<img src="img/003_idea_and_process.png" width="800">
</p>


## Inside the conversion

For the realization of this system is used as main software [Max/MSP](https://cycling74.com/products/max), inside of which a JavaScript code operates the conversion from colour to frequency. 

To begin with, the function needs as input from Max/MSP an RGB value, usually being between 0 and 255, it is better to scale those values between 0 and 1:
```JavaScript
function colorSet(in_r, in_g, in_b) {
	
	// Scaling the RGB values between 0 and 1

	r = in_r / 255.0;
	g = in_g / 255.0;
	b = in_b / 255.0;
  
}
```

After having scaled the input values, two are the main blocks needed for the purpose of this conversion: (1) from the Luminosity evaluates the Octave and (2) from the Hue sets a Central Frequency.

##### Luminosity to Octave

<p  align="center">
<img src="img/003_pseudo_[1].png" width="800">
</p>

Starting by considering the extension of the two sensorial events, we can create a relation between them. If we calculate the intensity of the input colour, than is possible to transpose this value inside the octave domain. To find the Luminosity value from an RGB value, it is required to evaluate the maximum and minimum between the RGB values: 
```JavaScript 
max = Math.max(r,g,b);	
min = Math.min(r,g,b);

// Luminosity = (min + max) / 2 
  l = (min + max) / 2;
```
Therefore, the obtained value is interpolated to the ten octaves in which the human hearing is enclosed. Note that, the luminosity value of 0.5 identify those colours named *Pure Saturated Colours*, or *Hues*. This is used to relize a fix point in the convertion, not only for this step, but also in the consideration of the relation between Hue and the 12 semitones that will be analized in the following:
```JavaScript 
if (l < 0.5) {
	o = (4 / 0.5) * l;
}
if (l == 0.5) {
	o = 4;
}
if (l > 0.5) {
	o = ((5 / 0.5) * (l - 0.5) + 5);
}
	
o = Math.floor(o); 
```


##### Hue to Central Frequency

The RGB sequence can be seen like an actual ‘musical scale’ or rather, this RGB pattern can be linearly interpolate within one octave. In other terms, this  pattern is directly related to the consideration of Hue value, evaluated in 360 degrees. For doing this, it’s also needed to set a starting point for the relationship. I decided to set a stable relationship between the Red-Colour and C4 (261.6Hz). This relation it’s set-up with a rational thinking, not for a specific natural meaning. It’s used a note of the fourth octave because, in combination with the previous passage ‘luminosity to octave’, the final result it will be transposed to the corresponding octave of the colour intensity. 	

