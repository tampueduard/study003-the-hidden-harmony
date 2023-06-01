// MIT License

// Copyright (c) 2017 - 2023 Eduard Tampu

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


autowatch = 1;

inlets = 1;
outlets = 3;

// type -> 12 notes or 7 notes (0 or 1)

diatonic = [0, 2, 4, 5, 7, 9, 11];
activationArray = [];
velocityArray = [];
midiArray = [];

var activate;

function init(type) {
    activationArray = [];
    velocityArray = [];
    if (type == 0) {
        dimension = 12;
        for (var i = 0; i < dimension; i++) {
            activationArray.push(0);
            velocityArray.push(0);
        }

    }

    if (type == 1) {
        dimension = 7;
        for (var i = 0; i < dimension; i++) {
            activationArray.push(0);
            velocityArray.push(0);
        }

    }

}

function generate(note, velocity, type) {

    playNote = [];

    note = note % 12;
    
    if (type == 0) {
        dimension = 12;
        activate = note;
    }

    if (type == 1) {
        dimension = 7;
        for (var i = 0; i < diatonic.length; i++) {
            if (note == diatonic[i]) {
                activate = i;
            }
        }
    }

    if (velocity > 0) {
        activationArray[activate] = 1;
        velocityArray[activate] = velocity;
        playNote[0] = midiArray[activate];
        playNote[1] = velocity;
    }

    if (velocity == 0) {
        activationArray[activate] = 0;
        velocityArray[activate] = velocity;
        playNote[0] = midiArray[activate];
        playNote[1] = velocity;
    }
    outlet(0, activationArray);
    outlet(1, velocityArray);
    outlet(2, playNote);
}

function list() {
    midiArray = arguments;
}

