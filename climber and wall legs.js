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
            showAxes: false,
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
        isModified: true,
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
        isModified: true,
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

  

    var climber = [torso, thoracic, lumbar, hip, hipl, hipr,
        shoulderr, shoulderl, elbowl, elbowr, handl, handr,
        footl, footr, kneel, kneer, footblockl];


    //arms
    
    let arml =          Constraint.create({bodyA: shoulderl, bodyB: elbowl});
    let armr =          Constraint.create({bodyA: shoulderr, bodyB: elbowr});
    let forearml =      Constraint.create({bodyB: elbowl, bodyA: handl});
    let forearmr =      Constraint.create({bodyB: elbowr, bodyA: handr});
    var arms = [arml, armr, forearml, forearmr];

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
    var core = [trapl, trapr, lowertrapl, lowertrapr, trapmid, latl, latr, upperabl, upperabr,
                lowerabl, lowerabr, obliquel, obliquer, spineup, spinemid, spinelow];

    //legs
    let leg1l =         Constraint.create({bodyA: hipl, bodyB: footl, stiffness: 1});
    let leg2l =         Constraint.create({bodyA: hip, bodyB: kneel, stiffness: 1});
    let leg3l =         Constraint.create({bodyA: hip, bodyB: footl, stiffness: 1});
    let femurl =        Constraint.create({bodyA: hipl, bodyB: kneel, stiffness: 1});
    let tibial =        Constraint.create({bodyA: kneel, bodyB: footl, stiffness: 1});
    let leg1r =         Constraint.create({bodyA: hipr, bodyB: footr, stiffness: 1});
    let leg2r =         Constraint.create({bodyA: hip, bodyB: kneer, stiffness: 1});
    let leg3r =         Constraint.create({bodyA: hip, bodyB: footr, stiffness: 1});
    let femurr =        Constraint.create({bodyA: hipr, bodyB: kneer, stiffness: 1});
    let tibiar =        Constraint.create({bodyA: kneer, bodyB: footr, stiffness: 1});
    let block1l = Constraint.create({ bodyA: footblockl, bodyB: kneeblockl, stiffness: 1.5, render: { strokeStyle: '#C44D58', lineWidth: 1 } });
    let block2l = Constraint.create({ bodyA: footblockl, bodyB: kneel, stiffness: 1.5, render: { strokeStyle: '#C44D58', lineWidth: 1 } });
    let block3l = Constraint.create({ bodyA: hipl, bodyB: kneeblockl, stiffness: 1.5, render: { strokeStyle: '#C44D58', lineWidth: 1 } });
    let block4l = Constraint.create({bodyA: kneel, bodyB: kneeblockl, stiffness: 1.5, render: { strokeStyle: '#C44D58' }});
    var legs = [leg1l, leg1r, leg2l, leg2r, leg3l, leg3r,
                femurl, femurr, tibial, tibiar,
                block1l, block2l, block3l, block4l];
    var legmusclesl = [leg1l, leg2l, leg3l];

    //hips
    let pubisl = Constraint.create({bodyA: hip, bodyB: hipl, stiffness: 1});
    let pubisr = Constraint.create({bodyA: hipr, bodyB: hip, stiffness: 1});
    let illiuml = Constraint.create({bodyA: hipl, bodyB: lumbar, stiffness: 1});
    let illiumr = Constraint.create({ bodyA: hipr, bodyB: lumbar, stiffness: 1});
    var hips = [pubisl, pubisr, illiuml, illiumr];

    var Constraintrender = function (arrayOfConstraints) {
        for (let i = 0; i < arrayOfConstraints.length; i++) {
            arrayOfConstraints[i].render.lineWidth = 1,
            arrayOfConstraints[i].render.strokeStyle = '#4ECDC4'
        }
    };

    Constraintrender(arms);
    Constraintrender(core);
    Constraintrender(legs);
    Constraintrender(hips);

    World.add(world, arms);
    World.add(world, core);
    World.add(world, legs);
    World.add(world, hips);

    
    var addclimber = function (arrayOfBodies) {

        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            World.add(world, list)
        }
    };

    addclimber(climber);

    

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
    };

    var cogCoordinates = calculatecog([torso, hip, shoulderr, shoulderl, footl, footr, elbowl, elbowr, handr, handl]);

    var cog = Bodies.circle(cogCoordinates.x, cogCoordinates.y, 5, { isStatic: true, collisionFilter: { mask: redCategory | greenCategory } });
    World.add(world, cog);

    Events.on(engine, 'beforeUpdate', function (event) {  
        var cogCoordinates = calculatecog([torso, hip, shoulderr, shoulderl, footl, footr, elbowl, elbowr, handr, handl]);   
        Body.setPosition(cog, { x: cogCoordinates.x, y: cogCoordinates.y });
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


    // events to adjust legs

    //functions to add or remove leg constraints (except for femur and tibia)

    var addleg = function (arrayOfBodies) {

        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            World.add(world, list)
        }
    };
    var removeleg = function (arrayOfBodies) {

        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            Composite.remove(engine.world, list)
        }
    };

    // event to adjust legs on foot click
    //if mouse clicks on FOOT, then constraints dissapear, on mouse up, constrainst sare added back in
    Events.on(engine, 'beforeUpdate', function (event) {
         if (mouseConstraint.mouse.button !== -1) {
            if (mouseConstraint.body && mouseConstraint.body == footl) {
                var legmusclesl = [leg1l, leg2l, leg3l];
                removeleg(legmusclesl)}
        }
    });

    //event to adjust legs on hip click
    //if mouse clicks down on HIP, then constraints dissapear, 
    Events.on(engine, 'beforeUpdate', function (event) {
        if (mouseConstraint.mouse.button !== -1) {
            if (mouseConstraint.body && mouseConstraint.body == hip) {

                var legmusclesl = [leg1l, leg2l, leg3l];
                removeleg(legmusclesl);}
        }
    });
 
    //on mouse up, constrainsts are added back in
    //length of constraints s recalcualted via pythagoras equation
    Events.on(engine, 'beforeUpdate', function (event) {

        if (mouseConstraint.mouse.button !== 0) {
            if (mouseConstraint.body && mouseConstraint.body == hip) {
                leg1l.length = Math.sqrt(Math.pow((footl.position.x - hipl.position.x), 2) + Math.pow((footl.position.y - hipl.position.y), 2));
                leg2l.length = Math.sqrt(Math.pow((hip.position.x - kneel.position.x), 2) + Math.pow((hip.position.y - kneel.position.y), 2));
                leg3l.length = Math.sqrt(Math.pow((footl.position.x - hip.position.x), 2) + Math.pow((footl.position.y - hip.position.y), 2));
                var legmusclesl = [leg1l, leg2l, leg3l];
                addleg(legmusclesl)
             
        }}
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
