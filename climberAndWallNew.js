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
	const Query = Matter.Query;

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
	    setMass: 10,
	    render: {
	        strokeStyle: blueColor,
	        fillStyle: 'transparent',
	        lineWidth: 1,
	    },
	    collisionFilter: {
	        category: blueCategory
	    },
	});
	var hip = Bodies.circle(600, 500, 30, {
	    setMass: 10,
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
	var shoulderl = Bodies.circle(580, 400, 10, {
	    setMass: 1,
       render: {
           strokeStyle: blueColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
       collisionFilter: {
           category: blueCategory},
   });
	var shoulderr = Bodies.circle(620, 400, 10, {
	    setMass: 1,
       render: {
           strokeStyle: blueColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
       collisionFilter: {
           category: blueCategory },
   });


   let elbowl = Bodies.circle(560, 450, 10, {
       setMass: 0.001,
       restitution: 0.0001,
       render: {
           strokeStyle: blueColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
		collisionFilter: {
				category: blueCategory
				}
				});
   let elbowr = Bodies.circle(640, 450, 10, {
       setMass: 0.001,
       restitution: 0.0001,
       render: {
           strokeStyle: blueColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
				collisionFilter: {
						category: blueCategory
				}
   });
   let handl = Bodies.circle(540, 500, 10, {
       setMass: 0.001,
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
       setMass: 0.001,
       render: {
           strokeStyle: redColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
       collisionFilter: {
           category: redCategory
       }
   });
   let footl = Bodies.circle(580, 600, 10, {
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
   let footr = Bodies.circle(620, 600, 10, {
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

World.add(world, torso);
World.add(world, hip);
World.add(world, shoulderl);
World.add(world, shoulderr);
World.add(world, elbowl);
World.add(world, handl);
World.add(world, elbowr);
World.add(world, handr);
World.add(world, footl);
World.add(world, footr);

let arml = Constraint.create({
    bodyA: shoulderl,
    bodyB: elbowl
});
let armr = Constraint.create({
    bodyA: shoulderr,
    bodyB: elbowr
});
let forearml = Constraint.create({
    bodyB: elbowl,
    bodyA: handl
});
let forearmr = Constraint.create({
    bodyB: elbowr,
    bodyA: handr
});
let spine = Constraint.create({
    bodyA: torso,
    bodyB: hip
});
let trapl = Constraint.create({
    bodyA: torso,
    bodyB: shoulderl
});
let trapr = Constraint.create({
    bodyA: torso,
    bodyB: shoulderr
});
let abl = Constraint.create({
    bodyA: hip,
    bodyB: shoulderl
});
let abr = Constraint.create({
    bodyA: hip,
    bodyB: shoulderr
});
let leg1l = Constraint.create({
    bodyA: shoulderl,
    bodyB: footl,
    stiffness: 1
});
let leg2l = Constraint.create({
    bodyA: hip,
    bodyB: footl,
    stiffness: 1
});
let leg1r = Constraint.create({
    bodyA: shoulderr,
    bodyB: footr,
    stiffness: 1
});
let leg2r = Constraint.create({
    bodyA: hip,
    bodyB: footr,
    stiffness: 1
});
World.add(world, arml);
World.add(world, armr);
World.add(world, forearml);
World.add(world, forearmr);
World.add(world, leg1l);
World.add(world, leg1r);
World.add(world, leg2l);
World.add(world, leg2r);
World.add(world, spine);
World.add(world, trapl);
World.add(world, trapr);
World.add(world, abl);
World.add(world, abr);

    //change lengths of leg1l/r with keypress to move legs

    //render vector of force on holds
    //render center of gravity
    //x coordinate = x1.m1 + x2.m2 ... / m1 + m2 ...
    //y coordinate = y1.m1 + y2.m2 ... / m1 + m2 ...
    //torso, hip, shoulders, elbows , hands, feet
    // each are 10, 10, 1, 1, 0.001, 0.001, 5
    //x coordinate

//to put x and y data into a single variable:
    //{ x: cogpositionx, y: cogpositiony }
//tocalculate COG (excluding elbows and hands)??? not sure wy it wont update like hip coordinates do:
    //var cogpositionx = (torso.position.x*10 + hip.position.x*10 + shoulderr.position.x*1 + shoulderl.position.x*1 + footl.position.x*5 + footr.position.x*5)/(10+10+1+1+5+5);
    //var cogpositiony = (torso.position.y * 10 + hip.position.y * 10 + shoulderr.position.y * 1 + shoulderl.position.y * 1 + footl.position.y * 5 + footr.position.y * 5) / (10 + 10 + 1 + 1 + 5 + 5);

//here cog is substituted for hip position
var cog = Bodies.circle(hip.position.x, hip.position.y, 5, { isStatic: true , collisionFilter: {mask: redCategory|greenCategory} });
World.add(world, cog);

var counter = 0,
    scaleFactor = 1.01;

Events.on(engine, 'beforeUpdate', function (event) {
    counter += 1;

    if (counter === 10)
        Body.setPosition(cog, hip.position);
    // reset counter
    // every 1.5 sec
    if (counter >= 20 * 1.5) { counter = 0; scaleFactor = 1 }
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





	// event to make object no longer static while mouse is clicked
	// add static = false with click
    Events.on(engine, 'beforeUpdate', function(event) {
        if (mouseConstraint.mouse.button !== -1) {
          if(mouseConstraint.body && mouseConstraint.body.isStatic === true) {
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

		Events.on(render, 'afterRender', function() {
				var mouse = mouseConstraint.mouse,
						context = render.context,
						bodies = Composite.allBodies(engine.world),
						startPoint = { x: 400, y: 100 },
						endPoint = mouse.position;

				var collisions = Query.ray(bodies, startPoint, endPoint);

				context.beginPath();
				context.moveTo(startPoint.x, startPoint.y);
				context.lineTo(endPoint.x, endPoint.y);
				if (collisions.length > 0) {
						context.strokeStyle = '#fff';
				} else {
						context.strokeStyle = '#555';
				}
				context.lineWidth = 0.5;
				context.stroke();

				for (var i = 0; i < collisions.length; i++) {
						var collision = collisions[i];
						context.rect(collision.bodyA.position.x - 4.5, collision.bodyA.position.y - 4.5, 8, 8);
				}

				context.fillStyle = 'rgba(255,165,0,0.7)';
				context.fill();
		})

})();
