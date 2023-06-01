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
outlets = 1;

// the list contains: 
// activation information between index 0 and 24
// midi-note information between index 25 and 49
// velocity information between index 50 and 74

function list() {
    n = arguments[0];
    midiOut = [];
    var a = arguments;
    for (var i = 0; i < n; i++) {
        if (a[i] == 1) {
            outlet(0, a[i+n], a[i+(n*2)]);
        } 
        else if (a[i] == 0) {
            outlet(0, a[i+n], 0);
        }
    }
}