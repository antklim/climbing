//interesting link http://codepen.io/lilgreenland/pen/jrMvaB?editors=1010 has vectors for gravity and velcoity

(function () {
	// module aliases
	const Engine = Matter.Engine;
	const Render = Matter.Render;
	const World = Matter.World;
	const Events = Matter.Events;
	const Composites = Matter.Composites;
	const Composite = Matter.Composite;
	const Common = Matter.Common;
	const Constraint = Matter.Constraint;
	const Body = Matter.Body;
	const Bodies = Matter.Bodies;
	const MouseConstraint = Matter.MouseConstraint;
	const Vertices = Matter.Vertices;
	const Query = Matter.Query;
	const Vector = Matter.Vector;


	// create an engine
	const engine = Engine.create();
	const world = engine.world;

	// create a renderer
	const render = Render.create({
	element: document.getElementById('canvas-container'),
			engine: engine,
			options: {
			showAxes: true,
		showDebug: true,
		showCollisions: true,
			showPositions: true,
			showConvexHulls: true,
			wireframes: false,
			background: '#111'
			}
			});

const defaultCategory = 0x0001;
const redCategory = 0x0002;
const greenCategory = 0x0004;
	const blueCategory = 0x0008;

	const redColor = '#C44D58';
	const greenColor = '#C7F464';
	const blueColor = '#4ECDC4';

    
	

	//add climber
	var torso = Bodies.circle(600, 400, 10, {
	    setMass: 1,
	    render: {
	        strokeStyle: greenColor,
	        fillStyle: 'transparent',
	        lineWidth: 1,
	    },
	    collisionFilter: {
	        category: blueCategory
	    },
	});
	var thoracic = Bodies.circle(600, 440, 10, {
	    setMass: 1,
	    render: {
	        strokeStyle: blueColor,
	        fillStyle: 'transparent',
	        lineWidth: 1,
	    },
	    collisionFilter: {
	        category: blueCategory,
	        mask: blueCategory
	    },
	});
	var lumbar = Bodies.circle(600, 460, 10, {
	    setMass: 1,
	    render: {
	        strokeStyle: blueColor,
	        fillStyle: 'transparent',
	        lineWidth: 1,
	    },
	    collisionFilter: {
	        category: blueCategory,
	        mask: blueCategory
	    },
	});
	var hip = Bodies.circle(600, 500, 20, {
	    setMass: 10,
       render: {
           strokeStyle: greenColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
       collisionFilter: {
           category: blueCategory,
           
       },
	});
	var hipl = Bodies.circle(570, 500, 5, {
	    setMass: 1,
	    render: {
	        strokeStyle: blueColor,
	        fillStyle: 'transparent',
	        lineWidth: 1,
	    },
	    collisionFilter: {
	        category: blueCategory,
	        mask: blueCategory 
	    },
	});
	var hipr = Bodies.circle(630, 500, 5, {
	    setMass: 1,
	    render: {
	        strokeStyle: blueColor,
	        fillStyle: 'transparent',
	        lineWidth: 1,
	    },
	    collisionFilter: {
	        category: blueCategory,
	        mask: blueCategory 
	    },
	});
	var shoulderl = Bodies.circle(570, 400, 10, {
	    setMass: 1,
       render: {
           strokeStyle: blueColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
       collisionFilter: {
           category: blueCategory,
           mask: blueCategory
       },
   });
	var shoulderr = Bodies.circle(630, 400, 10, {
	    setMass: 1,
       render: {
           strokeStyle: blueColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
       collisionFilter: {
           category: blueCategory,
           mask: blueCategory 
       },
   });


   let elbowl = Bodies.circle(560, 450, 10, {
       setMass: 1,
       restitution: 0.0001,
       render: {
           strokeStyle: blueColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
		collisionFilter: {
		    category: blueCategory,
		    mask: redCategory
				}
				});
   let elbowr = Bodies.circle(640, 450, 10, {
       setMass: 1,
       restitution: 0.0001,
       render: {
           strokeStyle: blueColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
				collisionFilter: {
				    category: blueCategory,
				    mask: redCategory
				}
   });
   let handl = Bodies.circle(540, 500, 10, {
       setMass: 1,
       render: {
           strokeStyle: redColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
       collisionFilter: {
           category: redCategory
       }
   });
   let handr = Bodies.circle(660, 500, 10, {
       setMass: 1,
       render: {
           strokeStyle: redColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
       collisionFilter: {
           category: redCategory,
       }
   });
   let footl = Bodies.circle(575, 600, 10, {
       setMass: 5,
       render: {
           strokeStyle: redColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
       collisionFilter: {
           category: redCategory
       }
   });
   let footblockl = Bodies.circle(560, 600, 10, {
       setMass: 0.1,
       render: {
           strokeStyle: blueColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
       collisionFilter: {
           category: blueCategory
       }
   });
   let kneeblockl = Bodies.circle(550, 560, 1, {
       setMass: 0.11,
       render: {
           strokeStyle: blueColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
       collisionFilter: {
           category: blueCategory
       }
   });
   let footr = Bodies.circle(625, 600, 10, {
       setMass: 5,
       render: {
           strokeStyle: redColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
       collisionFilter: {
           category: redCategory
       }
   });
   let kneel = Bodies.circle(565, 550, 10, {
       setMass: 5,
       render: {
           strokeStyle: redColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
       collisionFilter: {
           category: greenCategory
       }
   });
   let kneer = Bodies.circle(635, 550, 10, {
       setMass: 5,
       render: {
           strokeStyle: redColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
       collisionFilter: {
           category: greenCategory
       }
   });

    //create core


World.add(world, torso);
World.add(world, thoracic);
World.add(world, lumbar);
World.add(world, hip);
World.add(world, hipl);
World.add(world, hipr);
World.add(world, shoulderl);
World.add(world, shoulderr);
World.add(world, elbowl);
World.add(world, handl);
World.add(world, elbowr);
World.add(world, handr);
World.add(world, footl);
World.add(world, footr);
World.add(world, kneel);
World.add(world, kneer);
World.add(world, footblockl);
World.add(world, kneeblockl);

let arml =          Constraint.create({bodyA: shoulderl, bodyB: elbowl});
let armr =          Constraint.create({bodyA: shoulderr, bodyB: elbowr});
let forearml =      Constraint.create({bodyB: elbowl, bodyA: handl});
let forearmr =      Constraint.create({bodyB: elbowr, bodyA: handr});
    //core
let lowertrapl =    Constraint.create({bodyA: shoulderl, bodyB: thoracic});
let latl =          Constraint.create({bodyA: shoulderl, bodyB: lumbar});
let upperabl =      Constraint.create({bodyA: shoulderl, bodyB: hip, stiffness: 0.2});
let lowerabl =      Constraint.create({bodyA: hipl, bodyB: thoracic, stiffness: 0.2});
let obliquel =      Constraint.create({bodyA: hipl, bodyB: lumbar});
let lowertrapr =    Constraint.create({bodyA: shoulderr, bodyB: thoracic});
let latr =          Constraint.create({bodyA: shoulderr, bodyB: lumbar});
let upperabr =      Constraint.create({bodyA: shoulderr, bodyB: hip, stiffness:0.2});
let lowerabr =      Constraint.create({bodyA: hipr, bodyB: thoracic, stiffness: 0.2});
let obliquer =      Constraint.create({bodyA: hipr, bodyB: lumbar});
let spineup =       Constraint.create({bodyA: torso, bodyB: thoracic});
let spinemid =      Constraint.create({bodyA: thoracic, bodyB: lumbar});
let spinelow =      Constraint.create({bodyA: lumbar, bodyB: hip});
let trapmid =       Constraint.create({bodyA: shoulderl, bodyB: shoulderr});
let trapl =         Constraint.create({bodyA: torso, bodyB: shoulderl, stiffness: 2});
let trapr =         Constraint.create({bodyA: torso, bodyB: shoulderr, stiffness: 2});
let abl =           Constraint.create({bodyB: hipl, bodyA: shoulderl});
let abr =           Constraint.create({bodyB: hipr, bodyA: shoulderr});
    //legs
var leg1l =         Constraint.create({bodyA: hipl, bodyB: footl, stiffness: 1});
var leg2l =         Constraint.create({bodyA: hip, bodyB: kneel, stiffness: 1});
var leg3l =         Constraint.create({bodyA: hip, bodyB: footl, stiffness: 1});
let femurl =        Constraint.create({bodyA: hipl, bodyB: kneel, stiffness: 1});
let tibial =        Constraint.create({bodyA: kneel, bodyB: footl, stiffness: 1});
let leg1r =         Constraint.create({bodyA: hipr, bodyB: footr, stiffness: 1});
let leg2r =         Constraint.create({bodyA: hip, bodyB: kneer, stiffness: 1});
let leg3r =         Constraint.create({bodyA: hip, bodyB: footr, stiffness: 1});
let femurr =        Constraint.create({bodyA: hipr, bodyB: kneer, stiffness: 1});
let tibiar =        Constraint.create({bodyA: kneer, bodyB: footr, stiffness: 1});
let block1l =       Constraint.create({bodyA: footblockl, bodyB: kneeblockl, stiffness: 1.5});
let block2l =       Constraint.create({bodyA: footblockl, bodyB: kneel, stiffness: 1.5});
let block3l =       Constraint.create({bodyA: hipl, bodyB: kneeblockl, stiffness: 1.5});
let block4l =       Constraint.create({bodyA: kneel, bodyB: kneeblockl, stiffness: 1.5});

    //hips
let pubisl = Constraint.create({
    bodyA: hip,
    bodyB: hipl,
    stiffness: 1
});
let pubisr = Constraint.create({
    bodyA: hipr,
    bodyB: hip,
    stiffness: 1
});
let illiuml = Constraint.create({
    bodyA: hipl,
    bodyB: lumbar,
    stiffness: 1
});
let illiumr = Constraint.create({
    bodyA: hipr,
    bodyB: lumbar,
    stiffness: 1
});
World.add(world, arml);
World.add(world, armr);
World.add(world, forearml);
World.add(world, forearmr);
//legs
World.add(world, leg1l);
World.add(world, leg1r);
World.add(world, leg2l);
World.add(world, leg2r);
World.add(world, leg3l);
World.add(world, leg3r);
World.add(world, femurl);
World.add(world, femurr);
World.add(world, tibial);
World.add(world, tibiar);
World.add(world, block1l);
World.add(world, block2l);
World.add(world, block3l);
World.add(world, block4l);



//core
World.add(world, spineup);
World.add(world, spinemid);
World.add(world, spinelow);
World.add(world, trapmid);
World.add(world, trapl);
World.add(world, trapr);
//World.add(world, abl);
//World.add(world, abr);
World.add(world, lowertrapl);
World.add(world, latl);
World.add(world, upperabl);
World.add(world, lowerabl);
World.add(world, obliquel);
World.add(world, lowertrapr);
World.add(world, latr);
World.add(world, upperabr);
World.add(world, lowerabr);
World.add(world, obliquer);


//hips
World.add(world, pubisr);
World.add(world, pubisl);
World.add(world, illiuml);
World.add(world, illiumr);


    //change lengths of leg1l/r with keypress to move legs

    //render vector of force on holds
    //render center of gravity
    //x coordinate = x1.m1 + x2.m2 ... / m1 + m2 ...
    //y coordinate = y1.m1 + y2.m2 ... / m1 + m2 ...
    //torso, hip, shoulders, elbows , hands, feet
    // each are 10, 10, 1, 1, 0.001, 0.001, 5
    //x coordinate

//to put x and y data into a single variable:
    //var cogposition = { x: cogpositionx, y: cogpositiony };

//tocalculate COG:
var cogpositionx = (
                    (torso.position.x *  torso.mass) + (hip.position.x * 10) +
                    (shoulderr.position.x * 1) + (shoulderl.position.x * 1) +
                    (footl.position.x * 5) + (footr.position.x * 5) +
                    (elbowl.position.x * 1) + (elbowr.position.x * 1) +
                    (handl.position.x * 1) + (handr.position.x * 1)
                    )
                    / (torso.mass + 10 + 1 + 1 + 5 + 5 + 1 + 1 + 1 + 1);
var cogpositiony = (
                    (torso.position.y * 10) + (hip.position.y * 10) +
                    (shoulderr.position.y * 1) + (shoulderl.position.y * 1) +
                    (footl.position.y * 5) + (footr.position.y * 5) +
                    (elbowl.position.y * 1) + (elbowr.position.y * 1) +
                    (handl.position.y * 1) + (handr.position.y * 1)
                    )
                    / (10 + 10 + 1 + 1 + 5 + 5 + 1 + 1 + 1 + 1);

var calculatecog = function (arrayOfBodies) {
    var cogpositionx = 0;
    var cogpositiony = 0;
    var allBodiesMass = 0;

    for (let i = 0; i < arrayOfBodies.length; i++) {
        let body = arrayOfBodies[i];
        cogpositionx += body.position.x * body.mass;
        cogpositiony += body.position.y * body.mass;
        allBodiesMass += body.mass;
    }

    if (allBodiesMass === 0) {
        // error here
    }

    var cog = {
        x: cogpositionx / allBodiesMass,
        y: cogpositiony / allBodiesMass
    }

    return cog;
}

var cogCoordinates = calculatecog([torso, hip, shoulderr, shoulderl, footl, footr, elbowl, elbowr, handr, handl]);

    //
var cog = Bodies.circle(cogCoordinates.x, cogCoordinates.y, 5, { isStatic: true, collisionFilter: { mask: redCategory | greenCategory } });
World.add(world, cog);

var counter = 0,
    scaleFactor = 1.01;

Events.on(engine, 'beforeUpdate', function (event) {
 //   counter += 1;
   
  var cogCoordinates = calculatecog([torso, hip, shoulderr, shoulderl, footl, footr, elbowl, elbowr, handr, handl]);
    
 //   if (counter % 10 === 0)
        Body.setPosition(cog, { x: cogCoordinates.x, y: cogCoordinates.y });

    // reset counter
    // every 0.5 sec
  //  if (counter >= 1) {
  //      counter = 0; scaleFactor = 1;
  //  }
});





    	// collider is the red box in the middle
let collider = Bodies.rectangle(300, 300, 50, 50, {
	isSensor: true,
	isStatic: true,
	collisionFilter: {
	mask: redCategory
	},
		render: {
			strokeStyle: redColor,
				fillStyle: 'transparent',
				lineWidth : 1,
				},
					angle: 10
					});
				World.add(world, collider);

let bottomBorder = Bodies.rectangle(400, 620, 800, 50, {
    collisionFilter: {
        category: defaultCategory
    },
    isStatic: true,
						render: {
			fillStyle: 'transparent',
		lineWidth: 1
        }
        });
World.add(world, bottomBorder);






    //if right arrow is pressed, leg constraints change elasticity
document.addEventListener('keydown', function (event) {
    var leg1l = Constraint.create({ bodyA: hipl, bodyB: footl, stiffness: 1 });
    var leg2l = Constraint.create({ bodyA: hip, bodyB: kneel, stiffness: 1 });
    var leg3l = Constraint.create({ bodyA: hip, bodyB: footl, stiffness: 1 });

    if (event.keyCode == 37) {    
        World.add(world, leg1l);
        World.add(world, leg2l);
        World.add(world, leg3l)}

    else if (event.keyCode == 39) { 
        Composite.remove(engine.world, leg1l);
    Composite.remove(engine.world, leg2l);
        Composite.remove(engine.world, leg3l)}
    ;
});





var _triggerEvents = function (mouseConstraint1) {
    var mouse = mouseConstraint.mouse,
        mouseEvents = mouse.sourceEvents;

    if (mouseEvents.mousemove)
        Events.trigger(mouseConstraint, 'mousemove', { mouse: mouse });

    if (mouseEvents.mousedown)
        Events.trigger(mouseConstraint, 'mousedown', { mouse: mouse });

    if (mouseEvents.mouseup)
        Events.trigger(mouseConstraint1, 'mouseup', { mouse: mouse });

    // reset the mouse state ready for the next step
    Mouse.clearSourceEvents(mouse);
};

    // event to adjust feet
    //if mouse button is released on foot, then constraints reappear?? how to do mouse up??
Events.on(engine, 'mouseup', function (event) {
    var leg1l = Constraint.create({ bodyA: hipl, bodyB: footl, stiffness: 1 });
    var leg2l = Constraint.create({ bodyA: hip, bodyB: kneel, stiffness: 1 });
    var leg3l = Constraint.create({ bodyA: hip, bodyB: footl, stiffness: 1 });
    
        if (mouseConstraint.body && mouseConstraint.body == footl) {
            World.add(world, leg1l),
            World.add(world, leg2l),
            World.add(world, leg3l)
        }    
});

    //event to tension core
 
    //if Right arrow is pressed, circle appears
document.addEventListener('keydown', function (event) {
  var blob = Bodies.circle (400,400, 30)
    if (event.keyCode == 37) {World.add(world, blob) } 
});



    // event to adjust legs on foot click
    //if mouse clicks on foot, then constraints dissapear, on mouse up, constrainst sare added back in
Events.on(engine, 'beforeUpdate', function (event) {
        if (mouseConstraint.mouse.button !== -1) {
            if (mouseConstraint.body && mouseConstraint.body == footl) {
                Composite.remove(engine.world, leg1l),
                Composite.remove(engine.world, leg2l),
                Composite.remove(engine.world, leg3l)
            }
        }
});
    // event to adjust legs on hip click
    //if mouse clicks on HIP, then constraints dissapear, on mouse up, constrainst sare added back in
Events.on(engine, 'beforeUpdate', function (event) {
    if (mouseConstraint.mouse.button !== -1) {
        if (mouseConstraint.body && mouseConstraint.body == hip) {
            Composite.remove(engine.world, leg1l),
            Composite.remove(engine.world, leg2l),
            Composite.remove(engine.world, leg3l)
        }
    }
});
    // event to adjust legs
    //if mouse clicks up on foot or hip, then constraints dissapear, on mouse up, constrainst sare added back in
Events.on(engine, 'beforeUpdate', function (event) {
    if (mouseConstraint.mouse.button !== 0) {
        var leg1l = Constraint.create({ bodyA: hipl, bodyB: footl, stiffness: 1 });
        var leg2l = Constraint.create({ bodyA: hip, bodyB: kneel, stiffness: 1 });
        var leg3l = Constraint.create({ bodyA: hip, bodyB: footl, stiffness: 1 });

       
        if (mouseConstraint.body && mouseConstraint.body == hip) {
            World.add(world, leg1l),
            World.add(world, leg2l),
            World.add(world, leg3l)
        }
    }
});





    // event to make object no longer static while mouse is clicked
    // add static = false with click
    Events.on(engine, 'beforeUpdate', function (event) {
        if (mouseConstraint.mouse.button !== -1) {
            if (mouseConstraint.body && mouseConstraint.body.isStatic === true) {
                mouseConstraint.body.isStatic = false;
            }
        }
    });



Events.on(engine, 'collisionStart', function(event) {
      const pairs = event.pairs;

      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];

        if (pair.bodyA === collider) {
          pair.bodyB.isStatic = true;
        } else if (pair.bodyB === collider) {
          pair.bodyA.isStatic = true;
        }
		if (pair.bodyA === collider1) {
          pair.bodyB.isStatic = true;
	} else if (pair.bodyB === collider1) {
	  pair.bodyA.isStatic = true;
	  }
		if(pair.bodyA === collider2) {
          pair.bodyB.isStatic = true;
          } else if (pair.bodyB === collider2) {
			pair.bodyA.isStatic = true;
          }
		if (pair.bodyA === collider3) {
		    pair.bodyB.isStatic = true;
		} else if (pair.bodyB === collider3) {
		    pair.bodyA.isStatic = true;
		}
      }
    });


//second collider- collider1
    	// collider is the red box in the middle
let collider1 = Bodies.rectangle(450, 300, 50, 50, {
	isSensor: true,
	isStatic: true,
	collisionFilter: {
	mask: redCategory
	},
		render: {
			strokeStyle: redColor,
				fillStyle: 'transparent',
				lineWidth : 1,
				},
					angle: 10
					});
				World.add(world, collider1);

//collider- collider2
    	// collider is the red box in the middle
let collider2 = Bodies.rectangle(500, 200, 50, 50, {
	isSensor: true,
	isStatic: true,
	collisionFilter: {
	mask: redCategory
	},
		render: {
			strokeStyle: redColor,
				fillStyle: 'transparent',
				lineWidth : 1,
				},
					angle: 10
					});
				World.add(world, collider2);

    //collider- collider3
    // collider is the red box in the middle
				let collider3 = Bodies.rectangle(600, 200, 50, 50, {
				    isSensor: true,
				    isStatic: true,
				    collisionFilter: {
				        mask: redCategory
				    },
				    render: {
				        strokeStyle: redColor,
				        fillStyle: 'transparent',
				        lineWidth : 1,
				    },
				    angle: 15
				});
				World.add(world, collider3);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);

    // add a mouse controlled constraint
    const mouseConstraint = MouseConstraint.create(engine, {stiffness: 0.1,
      element: render.canvas
    });

    World.add(world, mouseConstraint);

    // pass mouse to renderer to enable showMousePosition
    render.mouse = mouseConstraint.mouse;

    console.log(Render)



    Events.on(render, 'afterRender', function () {
        var cogCoordinates = calculatecog([torso, hip, shoulderr, shoulderl, footl, footr, elbowl, elbowr, handr, handl]);
        var mouse = mouseConstraint.mouse,
            context = render.context,
            bodies = Composite.allBodies(engine.world),
            startPoint = { x: cogCoordinates.x, y: 0},
            endPoint = { x: cogCoordinates.x, y: 600 };

        var collisions = Query.ray(bodies, startPoint, endPoint);

        //   Render.startViewTransform(render);

        context.beginPath();
        context.moveTo(startPoint.x, startPoint.y);
        context.lineTo(endPoint.x, endPoint.y);  
        context.lineWidth = 0.5;
        context.stroke();

 //       Render.endViewTransform(render);
    });

})();
