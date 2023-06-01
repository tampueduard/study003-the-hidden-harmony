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

outlets = 4;

length = 12;


function generate(x, y) {
    index = [];
    position = [];
    for (var i = 1; i <= length; i ++) {
        valueX = Math.floor(Math.random() * (x - 0)) + 0;
        valueY = Math.floor(Math.random() * (y - 0)) + 0;
        outlet(0, i);
        index.push(i);
        outlet(1, valueX, valueY);
        position.push(valueX);
        position.push(valueY);
    }
    var index = index;
    outlet(2, index);
    outlet(3, position);
}