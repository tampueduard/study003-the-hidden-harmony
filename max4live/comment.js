autowatch = 1; 

outlets = 2; 

var frequency_in, note_in;


function generate(n1, n2){

    frequency_in = n1;
    note_in = n2;
    
    var octave;  

    var notes = "C C#D D#E F F#G G#A A#B";

	var do0 = 440 * ( Math.pow(2, ( -57 / 12)));

	var do1 = do0 * 2;
	var do2 = do1 * 2;
	var do3 = do2 * 2;
	var do4 = do3 * 2;
	var do5 = do4 * 2;
	var do6 = do5 * 2;
	var do7 = do6 * 2;
	var do8 = do7 * 2;
	var do9 = do8 * 2;
	var do10 = do9 * 2;


	if(frequency_in >= do0 & frequency_in < do1) {
		var octave = 0;
	}
	if(frequency_in >= do1 & frequency_in < do2) {
		var octave = 1;
	}
	if(frequency_in >= do2 & frequency_in < do3) {
		var octave = 2;
	}
	if(frequency_in >= do3 & frequency_in < do4) {
		var octave = 3;
	}
	if(frequency_in >= do4 & frequency_in < do5) {
		var octave = 4;
	}
	if(frequency_in >= do5 & frequency_in < do6) {
		var octave = 5;
	}
	if(frequency_in >= do6 & frequency_in < do7) {
		var octave = 6;
	}
	if(frequency_in >= do7 & frequency_in < do8) {
		var octave = 7;
	}
	if(frequency_in >= do8 & frequency_in < do9) {
		var octave = 8;
	}
	if(frequency_in >= do9 & frequency_in < do10) {
		var octave = 9;
	}

	if(frequency_in < do0) {

		var octave = 0;
	}
    
    //octave = note_in / 12 - 1;
    note = notes.substring((note_in % 12) * 2, (note_in % 12) * 2 + 2);
          


    outlet(0, note)
    outlet(1, octave.toFixed(0))
}
