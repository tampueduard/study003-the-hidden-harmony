// maxmsp stuff

autowatch = 1;
inlets = 3;
outlets = 3;

// color_frequency main relations
// tuning system used A4 - 440 Hz

	tuning = 440;		// A4

	fqRed = 261.6; 		// C4
	fqGreen = 329.6; 	// E4
	fqBlue = 415.3; 	// G#4

// frequency_range value
// evaluating the frequency range between the RGB values

	regionRG = (fqGreen - 0.01) - fqRed;
	regionGB = (fqBlue - 0.01) - fqGreen;
	regionBR = ((fqRed * 2) - 0.01) - fqBlue;

	redUp = (regionBR / 2) / 255;
	redDown = (regionRG / 2) / 255;
	greenUp = (regionRG / 2) / 255;	
	greenDown = (regionGB / 2) / 255;	
	blueUp = (regionGB / 2) / 255;	
	blueDown = (regionBR / 2) / 255;

function list() {
	frequencyArray = [];
	midiArray = [];
	var arr = arguments;
	for (var i = 0; i < arr.length; i++) {
		x = i+1
		y = x % 3
		if (y == 0) {
			frequency = toFrequency(arr[i-2], arr[i-1], arr[i]);
			midi = toMidi(frequency);
			frequencyArray.push(frequency);
			midiArray.push(midi);
		}
	}

	outlet(0, frequencyArray);
	outlet(1, midiArray);
	outlet(2, activation(arr.length));

}

function toFrequency(r, g, b) {

	// scaling RGB from 0-255 to 0-1
	r = r / 255;
	g = g / 255;
	b = b / 255;

	// maximum primary color (n1)
	n1 = Math.max(r, g, b);

	// minimum primary color (n1)
	n3 = Math.min(r, g, b);

	// if two numbers are equal
	if (r == g || r == b || r == g == b) {
		n3 == r;
	} else {
		if (g == r || g == b) {
			n3 == g;
		} else {
			if (b == r || b == g) {
				n3 == b;
			}
		}
	}

	// middle primary color (n2)
	// red = n2
	if (r <= g & r >= b) {
		n2 = r;
	} else if (r >= g & r <= b) {
		n2 = r;
	} else {
		"ERROR ";
	}
	// green = n2 
	if (g <= r & g >= b) {
		n2 = g;
	} else if (g >= r & g <= b) {
		n2 = g;
	} else {
		"ERROR ";
	}
	// blue = n2
	if (b <= g & b >= r) {
		n2 = b;
	} else if (b >= g & b <= r) {
		n2 = b;
	} else {
		"ERROR ";
	}

	/* 	the following allows to scale the colors to 
		a set of values of Saturation = 1 and Luminosity = 0.5 */

	// no_white color (subtraction of n3 from the colors)

	whitePart = n3;
	n1_noWhite = n1 - whitePart;
	n2_noWhite = n2 - whitePart;

	// to_apply value (1 - n1)

	toApply = 1 - n1_noWhite;
	n2_topSaturation = toApply + n2_noWhite;


	if (n2_topSaturation == (r - whitePart + toApply)) {
		if (n1 == g) {
			frequency = ((fqGreen) - (n2_topSaturation * 255) * redDown);
		} else {
			if (n1 == b) {
				frequency = ((n2_topSaturation * 255) * redUp) + fqBlue;
			} else { "ERROR " }
		}
	}

	if (n2_topSaturation == (g - whitePart + toApply)) {
		if (n1 == b) {
			frequency = ((fqBlue) - ((n2_topSaturation * 255) * greenDown));
		} else {
			if (n1 == r) {
				frequency = (((n2_topSaturation * 255) * greenUp) + fqRed);
			} else { "ERROR " }
		}
	}

	if (n2_topSaturation == (b - whitePart + toApply)) {
		if (n1 == r) {
			frequency = ((fqRed) - ((n2_topSaturation * 255) * blueDown));
		} else {
			if (n1 == g) {
				frequency = (((n2_topSaturation * 255) * blueUp) + fqGreen);
			} else { "ERROR " }
		}
	}


	// the luminosity is related to the octave 
	// number of octaves that our hearing system can handle (16.35 Hz -> C0 to 16744.04 Hz -> C10)

	luminosity = ((r + g + b) / 3);

	// evaluation of the octave 

	if (luminosity >= (1 / 3) & luminosity <= (2 / 3)) {
		octave = 4 + ((luminosity - (1 / 3)) * (3 / 1));
	} else {
		if (luminosity < (1 / 3)) {
			octave = (4 / (1 / 3) * luminosity);
		} else {
			if (luminosity > (2 / 3)) {
				octave = ((5 / (1 / 3) * (luminosity - 1)) + 10);
			}
		}
	}

	// evaluating the frequency based on the octave

	if (octave < 4) {
		frequency = frequency / Math.pow(2, (4 - octave));
	} else {
		if (octave > 4) {
			frequency = frequency * Math.pow(2, (octave - 4));
		}
	}

	// if (r == g & g == b) {
	// 	frequency = 19 + (Math.pow(19981, luminosity));
	// }

	frequency = Math.round(frequency * 100) / 100;

	// return result
	return frequency;
}

function toMidi(frequency) {
	return Math.round(69 + 12 * (Math.log(frequency / tuning) / Math.log(2)));
};

function activation(length) {
	on_off = [];
	for (var i = 0; i < length; i++) {
		on_off.push(1)
	}
	remaining_length = 50 - length;
	for (var i = 0; i < remaining_length; i++) {
		on_off.push(0)
	}
	return on_off;
}
