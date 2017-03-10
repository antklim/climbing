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

    //add platform
	var platform = Bodies.rectangle(600, 510, 200, 10);
	

	//add climber
	var partA = Bodies.rectangle(600, 400, 10, 200, {
	    render: {
	        strokeStyle: blueColor,
	        fillStyle: 'transparent',
	        lineWidth: 1,
	    },
	});
   var partB = Bodies.rectangle(560, 360, 80, 10, {
       render: {
           strokeStyle: blueColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
   });
   var partC = Bodies.rectangle(640, 360, 80, 10, {
       render: {
           strokeStyle: blueColor,
           fillStyle: 'transparent',
           lineWidth: 1,
       },
   });
   var     torso = Body.create({
	parts: [partA, partB, partC, platform],
	    restitution: 0.8,
	    frictionAir: 0.08,
	   			collisionFilter: {
			    category: blueCategory,
			    mask: defaultCategory| blueCategory
        }});


   let hand1 = Bodies.circle(540, 340, 10, {
       setMass: 0.0001,
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
   let hand2 = Bodies.circle(660, 340, 10, {
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
	let tether1 = Constraint.create({
					bodyA: torso,
					bodyB: hand1
					});
	let tether2 = Constraint.create({
					bodyA: torso,
					bodyB: hand2
	});
	let tether3 = Constraint.create({
	    bodyA: hand1,
	    bodyB: hand2
	});

	let elbow1 = Bodies.circle(540, 400, 10, {
	    setMass: 0.001,
	    render: {
	        strokeStyle: greenColor,
	        fillStyle: 'transparent',
	        lineWidth: 1,
	    },
		collisionFilter: {
		category: greenCategory
		}
		});
	let elbow2 = Bodies.circle(660, 400, 10, {
	    setMass: 0.001,
	    render: {
	        strokeStyle: greenColor,
	        fillStyle: 'transparent',
	        lineWidth: 1,
	    },
		collisionFilter: {
	category: greenCategory
	}
	});
let forearm1 = Constraint.create({
		bodyA: hand1,
		bodyB: elbow1
});
	let forearm2 = Constraint.create({
		bodyB: hand2,
		bodyA: elbow2
		});
	let hand3 = Bodies.circle(540, 450, 10, {
	    setMass: 0.001,
	    render: {
	        strokeStyle: redColor,
	        fillStyle: 'transparent',
	        lineWidth: 1,},
	    collisionFilter: {
	        category: redCategory
	    }
	});
	let hand4 = Bodies.circle(660, 450, 10, {
	    setMass: 0.001,
	    render: {
	        strokeStyle: redColor,
	        fillStyle: 'transparent',
	        lineWidth: 1,},
	    collisionFilter: {
	        category: redCategory
	    }
	});
	let forearm3 = Constraint.create({
	    bodyA: hand3,
	    bodyB: elbow1
	});
	let forearm4 = Constraint.create({
	    bodyB: hand4,
	    bodyA: elbow2
	});
World.add(world, torso);

World.add(world, hand1);
	World.add(world, hand2);
    World.add(world, tether1);
    World.add(world, tether2);

    World.add(world, elbow1);
	World.add(world, elbow2);
    World.add(world, forearm1);
    World.add(world, forearm2);
    World.add(world, tether3);
    World.add(world, forearm3);
    World.add(world, forearm4);
    World.add(world, hand3);
    World.add(world, hand4);
  





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
})();
