var my_name = [
  {
    x: 717,
    y: 249
  },
  {
    x: 718,
    y: 210
  },
  {
    x: 633,
    y: 236
  },
  {
    x: 720,
    y: 169
  },
  {
    x: 714,
    y: 120
  },
  {
    x: 675,
    y: 95
  },
  {
    x: 653,
    y: 197
  },
  {
    x: 640,
    y: 130
  },
  {
    x: 680,
    y: 174
  },
  {
    x: 570,
    y: 218
  },
  {
    x: 566,
    y: 107
  },
  {
    x: 573,
    y: 163
  },
  {
    x: 529,
    y: 166
  },
  {
    x: 482,
    y: 224
  },
  {
    x: 481,
    y: 164
  },
  {
    x: 479,
    y: 107
  },
  {
    x: 388,
    y: 182
  },
  {
    x: 439,
    y: 240
  },
  {
    x: 435,
    y: 189
  },
  {
    x: 427,
    y: 136
  },
  {
    x: 394,
    y: 104
  },
  {
    x: 362,
    y: 130
  },
  {
    x: 344,
    y: 180
  },
  {
    x: 336,
    y: 233
  },
  {
    x: 210,
    y: 109
  },
  {
    x: 258,
    y: 238
  },
  {
    x: 205,
    y: 240
  },
  {
    x: 171,
    y: 192
  },
  {
    x: 174,
    y: 127
  },
  {
    x: 266,
    y: 108
  }
];

var last_i = 0;

$(document).ready(() => {
    $(".add_button").click((e) => {
        var type = e.target.className.split(/\s+/)[1];
        add_ball(type);
    });

    $(".dump").click(() => dump());
    $(".build-name").click(() => buildName());

    $("#tree").mousedown((e) => {
        var elem = $("#tree");
        var canvas = $("#canvas");

        canvas.mouseup((e) => {
            canvas.off("mousemove");
            canvas.off("mouseup");
        });

        canvas.mousemove((e) => {
            var x = e.pageX - canvas.offset().left;
            var y = e.pageY - canvas.offset().top;
            elem.css("left", x);
            elem.css("top", y);
        });
    })
})

function add_ball(type) {
    var elem = $("<img></img>");
    elem.attr("src", "/img/" + type + ".png");
    elem.css("position", "absolute");
    elem.css("z-index", 1000);
    elem.attr("draggable", false);
    elem.mousedown((e) => {
        event.stopPropagation();
        var elem = $(e.target);
        var canvas = $("#canvas");

        canvas.mouseup((e) => {
            canvas.off("mousemove");
            canvas.off("mouseup");
        });

        canvas.mousemove((e) => {
            var tree = $("#tree");
            var tx = tree.offset().left;
            var ty = tree.offset().top;


            var px, py;
            var cx, cy;
            if (elem.hasClass("on-tree")) {
                px = tree.offset().left;
                py = tree.offset().top;

                cx = 0;
                cy = 0;
            } else {
                px = canvas.offset().left;
                py = canvas.offset().top;
                cx = tx - px;
                cy = ty - py;
            }

            var x = e.pageX - px;
            var y = e.pageY - py;

            if (x > cx && x < cx + 128 && y > cy && y < cy + 384) {
                elem.addClass("on-tree");
                tree.prepend(elem);
            } else {
                elem.removeClass("on-tree");
                canvas.prepend(elem);
            }

            if (elem.hasClass("on-tree")) {
                px = tree.offset().left;
                py = tree.offset().top;

                cx = 0;
                cy = 0;
            } else {
                px = canvas.offset().left;
                py = canvas.offset().top;
                cx = tx;
                cy = ty;
            }

            var x = e.pageX - px;
            var y = e.pageY - py;

            elem.css("left", x);
            elem.css("top", y);
        });
    });
    elem.css("left", getRandomInt(768 - 32));
    elem.css("top", getRandomInt(768 - 32));
    elem.addClass("ball");
    $("#canvas").prepend(elem);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function dump() {
    var position = [];
    $(".ball").each((i, elem) => {
        var elem = $(elem);
        var v = {
            x: elem.css("left"),
            y: elem.css("top"),
        };
        position.append(v);
    })
    console.log(JSON.stringify(position));
}

function buildName() {
    my_name.reverse();

    var canvas = $("#canvas")
    $(".ball").each((i, elem) => {
        if (i < name.length) {
            var elem = $(elem);
            if (elem.hasClass("on-tree")) {
                canvas.prepend(elem)
            }
            var n = my_name[i];
            elem.css("left", my_name[i].x);
            elem.css("top", my_name[i].y);
        }
    });
}