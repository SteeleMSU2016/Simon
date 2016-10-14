
/**
 * Created by Jason Steele on 4/9/2016.
 */
function Simon(sel) {

    this.state = "initial";
    this.sequence = [0, 2, 1];
    this.current = 0;

    // Get a reference to the form object
    this.form = $(sel);
    this.configureButton(0, "red");
    this.configureButton(1, "green");
    this.configureButton(2, "blue");
    this.configureButton(3, "yellow");

    this.play();

    //document.getElementById("yellow").currentTime = 0;
    //document.getElementById("yellow").play();
}

Simon.prototype.play = function() {
    //console.log("play");
    this.state = "play";    // State is now playing
    this.current = 0;// Starting with the first one
    this.playCurrent();
};

Simon.prototype.playCurrent = function() {
    //console.log("playCurrent");
    var that = this;
    //this.buttonOff();
    if(this.current < this.sequence.length) {
        // We have one to play
        var colors = ['red', 'green', 'blue', 'yellow'];
        document.getElementById(colors[this.sequence[this.current]]).play();
        this.buttonOn(this.sequence[this.current]);
        this.current++;

        window.setTimeout(function() {
            that.playCurrent();
        }, 1000);


    } else {
        this.state = "enter";
    }
};


Simon.prototype.buttonOn = function(button) {
    //console.log("buttonOn");
    var buttonOn = $(this.form.find("input").get(button));
    if(button == 0){buttonOn.css("background-color",  "red");}
    if(button == 1){buttonOn.css("background-color", "green");}
    if(button == 2){buttonOn.css("background-color", "blue");}
    if(button == 3){buttonOn.css("background-color", "yellow");}

    window.setTimeout(function() {
        if(button == 0){buttonOn.css("background-color",  "lightgrey");}
        if(button == 1){buttonOn.css("background-color", "lightgrey");}
        if(button == 2){buttonOn.css("background-color", "lightgrey");}
        if(button == 3){buttonOn.css("background-color", "lightgrey");}
    }, 500);


};


Simon.prototype.buttonPress = function(button, color) {

    console.log(this.current-this.sequence.length);
    var that = this;
    if ((this.current-this.sequence.length) < (this.sequence.length - 1)){
        // We have one to play

        if(this.sequence[this.current-this.sequence.length] == button) {
            this.current++;
        }
        else {
            document.getElementById("buzzer").play();
            window.setTimeout(function() {
                that.sequence = [0, 2, 1];
                that.play();
            }, 2000);
        }
    }
    else {
        if (this.sequence[this.current - this.sequence.length] == button) {
            this.sequence.push(Math.floor(Math.random() * 4));
            window.setTimeout(function() {
                that.play();
            }, 1000);
        }
        else{
            document.getElementById("buzzer").play();
            window.setTimeout(function() {
                that.sequence = [0, 2, 1];
                that.play();
            }, 2000);

        }
    }

};

Simon.prototype.configureButton = function(ndx, color) {
    var button = $(this.form.find("input").get(ndx));
    var that = this;

    button.click(function(event) {
        document.getElementById(color).currentTime = 0;
        document.getElementById(color).play();
        that.buttonPress(ndx, color);
    });

    button.mousedown(function(event) {
        button.css("background-color", color);
    });

    button.mouseup(function(event) {
        button.css("background-color", "lightgrey");
    });
};

