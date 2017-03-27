//interesting link http://codepen.io/lilgreenland/pen/jrMvaB?editors=1010 has vectors for gravity and velcoity

//To DO:
// twist shoulders - left and right arrows
//lock biceps - up and down arrows
//add force vectors


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
    const greyColor = '#708090'

    let bottomBorder = Bodies.rectangle(400, 625, 800, 50, {
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


    //add climber
    var torso = Bodies.circle(600, 400, 10, {
        setMass: 1,
        render: {
            strokeStyle: greenColor,
            fillStyle: 'transparent',
            lineWidth: 1},
        collisionFilter: {
            category: blueCategory},
    });
    var thoracic = Bodies.circle(600, 440, 10, {
        setMass: 1,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,},
        collisionFilter: {
            category: blueCategory,
            mask: blueCategory},
    });
    var lumbar = Bodies.circle(600, 460, 10, {
        setMass: 1,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1 },
        collisionFilter: {
            category: blueCategory,
            mask: blueCategory },
    });
    var hip = Bodies.circle(600, 500, 20, {
        setMass: 10,
        render: {
            strokeStyle: greenColor,
            fillStyle: 'transparent',
            lineWidth: 1,},
        collisionFilter: {
            category: blueCategory,},
    });
    var hipl = Bodies.circle(570, 490, 5, {
        setMass: 1,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,},
        collisionFilter: {
            category: blueCategory,
            mask: redCategory  },
    });
    var hipr = Bodies.circle(630, 490, 5, {
        setMass: 1,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,},
        collisionFilter: {
            category: blueCategory,
            mask: redCategory },
    });
    var shoulderl = Bodies.circle(570, 410, 10, {
        setMass: 1,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1, },
        collisionFilter: {
            category: blueCategory,
            mask: blueCategory},
    });
    var shoulderr = Bodies.circle(630, 410, 10, {
        setMass: 1,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,},
        collisionFilter: {
            category: blueCategory,
            mask: blueCategory },
    });


    let elbowl = Bodies.circle(565, 450, 10, {
        setMass: 2,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,},
        collisionFilter: {
            category: blueCategory,
            mask: redCategory}
    });
    let elbowr = Bodies.circle(635, 450, 10, {
        setMass: 2,
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
    let handl = Bodies.circle(540, 490, 10, {
        setMass: 1,
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,},
        collisionFilter: {
            category: redCategory}
    });
    let handr = Bodies.circle(660, 490, 10, {
        setMass: 1,
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,},
        collisionFilter: {
            category: redCategory,}
    });
    let footl = Bodies.rectangle(575, 610, 15,15, {
        setMass: 5,
        restitution: 0.00000001,
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1, },
        collisionFilter: {
            category: redCategory }
    });
    let footblockl = Bodies.rectangle(570, 610, 10, 10, {
        setMass: 0.001,
        restitution: 0.0000001,
        render: {
            strokeStyle: greyColor,
            fillStyle: 'transparent',
            lineWidth: 1,},
        collisionFilter: {
            category: blueCategory}
    });
    let footblockr = Bodies.rectangle(635, 610, 10, 10, {
        setMass: 0.001,
        restitution: 0.00000001,
        render: {
            strokeStyle: greyColor,
            fillStyle: 'transparent',
            lineWidth: 1,},
        collisionFilter: {
            category: blueCategory}
    });
    let kneeblockl = Bodies.circle(585, 550, 1, {
        setMass: 0.01,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,},
        collisionFilter: {
            category: blueCategory}
    });
    let kneeblockr = Bodies.circle(615, 550, 1, {
        setMass: 0.01,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,},
        collisionFilter: {
            category: blueCategory}
    });
    let footr = Bodies.rectangle(625, 610, 15, 15, {
        setMass: 5,
        restitution: 0.00000001,
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,},
        collisionFilter: {
            category: redCategory}
    });
    let kneel = Bodies.circle(565, 550, 10, {
        setMass: 5,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,},
        collisionFilter: {
            category: greenCategory}
    });
    let kneer = Bodies.circle(635, 550, 10, {
        setMass: 5,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,},
        collisionFilter: {
            category: greenCategory }
    });

  

    var climber = [torso, thoracic, lumbar, hip, hipl, hipr,
        shoulderr, shoulderl, elbowl, elbowr, handl, handr,
        footl, footr, kneel, kneer, footblockl, footblockr, kneeblockl, kneeblockr];

    //constraints

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
    let spineup = Constraint.create({ bodyA: torso, bodyB: thoracic, stiffness: 1.5 });
    let spinemid = Constraint.create({ bodyA: thoracic, bodyB: lumbar, stiffness: 1.5 });
    let spinelow = Constraint.create({ bodyA: lumbar, bodyB: hip, stiffness: 1.5 });
    let trapmid =       Constraint.create({bodyA: shoulderl, bodyB: shoulderr});
    let trapl =         Constraint.create({bodyA: torso, bodyB: shoulderl, stiffness: 1});
    let trapr =         Constraint.create({bodyA: torso, bodyB: shoulderr, stiffness: 1});
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
    let block1l = Constraint.create({ bodyA: footblockl, bodyB: kneeblockl, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block2l = Constraint.create({ bodyA: footblockl, bodyB: kneel, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block3l = Constraint.create({ bodyA: hipl, bodyB: kneeblockl, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block4l = Constraint.create({ bodyA: kneel, bodyB: kneeblockl, stiffness: 1.5, render: { strokeStyle: '#708090' } });
    let block1r = Constraint.create({ bodyA: footblockr, bodyB: kneeblockr, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block2r = Constraint.create({ bodyA: footblockr, bodyB: kneer, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block3r = Constraint.create({ bodyA: hipr, bodyB: kneeblockr, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block4r = Constraint.create({ bodyA: kneer, bodyB: kneeblockr, stiffness: 1.5, render: { strokeStyle: '#708090' } });
   
    var blockers = [block1l, block1r, block2l, block2r, block3l, block3r, block4l, block4r];

    var legs = [femurl, femurr, tibial, tibiar];
    var legmuscles = [leg1l, leg2l, leg3l, leg1r, leg2r, leg3r];

    //hips
    let pubisl = Constraint.create({bodyA: hip, bodyB: hipl, stiffness: 1});
    let pubisr = Constraint.create({bodyA: hipr, bodyB: hip, stiffness: 1});
    let illiuml = Constraint.create({bodyA: hipl, bodyB: lumbar, stiffness: 1});
    let illiumr = Constraint.create({ bodyA: hipr, bodyB: lumbar, stiffness: 1});
    var hips = [pubisl, pubisr, illiuml, illiumr];

    var ConstraintrenderBlue = function (arrayOfConstraints) {
        for (let i = 0; i < arrayOfConstraints.length; i++) {
            arrayOfConstraints[i].render.lineWidth = 3,
            arrayOfConstraints[i].render.strokeStyle = blueColor
        }
    };
    var ConstraintrenderGrey = function (arrayOfConstraints) {
        for (let i = 0; i < arrayOfConstraints.length; i++) {
            arrayOfConstraints[i].render.lineWidth = 0.5,
            arrayOfConstraints[i].render.strokeStyle = greyColor
        }
    };
    var ConstraintrenderRed = function (arrayOfConstraints) {
        for (let i = 0; i < arrayOfConstraints.length; i++) {
            arrayOfConstraints[i].render.lineWidth = 1,
            arrayOfConstraints[i].render.strokeStyle = redColor
        }
    };


    ConstraintrenderBlue(arms);
    ConstraintrenderBlue(core);
    ConstraintrenderBlue(legs);
    ConstraintrenderRed(legmuscles);
    ConstraintrenderBlue(hips);
    ConstraintrenderGrey(blockers);
    

    World.add(world, arms);
    World.add(world, core);
    World.add(world, legs);
    World.add(world, legmuscles);
    World.add(world, hips);
    World.add(world, blockers);

    
    var addclimber = function (arrayOfBodies) {
        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            World.add(world, list)}
    };

    addclimber(climber);

    var setairfriction = function (arrayOfBodies) {
        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            list.frictionAir = 0.01;
        }
    };
    setairfriction(climber);

 //make arm muscles
    let bicepl = Constraint.create({ bodyA: shoulderl, bodyB: handl, stiffness: 0.1 });
    let bicepr = Constraint.create({ bodyA: shoulderr, bodyB: handr, stiffness: 0.1 });
 
    let biceps = [bicepl, bicepr];
    addclimber(biceps);
    ConstraintrenderRed(biceps);
   
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



//Holds that arms and legs stick to

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


    // events to adjust legs

    //functions to add or remove leg constraints (except for femur and tibia)

    var addmuscles = function (arrayOfBodies) {

        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            World.add(world, list)
        }
    };
    var removemuscles = function (arrayOfBodies) {

        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            Composite.remove(engine.world, list)
        }
    };

    // event to adjust legs on foot click
    //if mouse clicks on FOOTL, then left leg constraints dissapear, on mouse up, constrainst sare added back in
    Events.on(engine, 'beforeUpdate', function (event) {
         if (mouseConstraint.mouse.button !== -1) {
             if (mouseConstraint.body && mouseConstraint.body == footl) {
                 var legmusclesl = [leg1l, leg2l, leg3l];
                 removemuscles(legmusclesl)
             };
         }
         if (mouseConstraint.mouse.button !== 0) {
             if (mouseConstraint.body && mouseConstraint.body == footl) {
                 leg1l.length = Math.sqrt(Math.pow((footl.position.x - hipl.position.x), 2) + Math.pow((footl.position.y - hipl.position.y), 2));
                 leg2l.length = Math.sqrt(Math.pow((hip.position.x - kneel.position.x), 2) + Math.pow((hip.position.y - kneel.position.y), 2));
                 leg3l.length = Math.sqrt(Math.pow((footl.position.x - hip.position.x), 2) + Math.pow((footl.position.y - hip.position.y), 2));
                 var legmusclesl = [leg1l, leg2l, leg3l];
                 addmuscles(legmusclesl)

             }
         }
    });
    //if mouse clicks on FOOTR, then right leg constraints dissapear, on mouse up, constrainst sare added back in
    Events.on(engine, 'beforeUpdate', function (event) {
        if (mouseConstraint.mouse.button !== -1) {
            if (mouseConstraint.body && mouseConstraint.body == footr) {
                var legmusclesr = [leg1r, leg2r, leg3r];
                removemuscles(legmusclesr)
            }
        }
        if (mouseConstraint.mouse.button !== 0) {
            if (mouseConstraint.body && mouseConstraint.body == footr) {
                leg1r.length = Math.sqrt(Math.pow((footr.position.x - hipr.position.x), 2) + Math.pow((footr.position.y - hipr.position.y), 2));
                leg2r.length = Math.sqrt(Math.pow((hip.position.x - kneer.position.x), 2) + Math.pow((hip.position.y - kneer.position.y), 2));
                leg3r.length = Math.sqrt(Math.pow((footr.position.x - hip.position.x), 2) + Math.pow((footr.position.y - hip.position.y), 2));
                var legmusclesr = [leg1r, leg2r, leg3r];
                addmuscles(legmusclesr)

            }
        }
    });
    //if mouse clicks on KNEER, then right leg constraints dissapear, on mouse up, constrainst sare added back in
    Events.on(engine, 'beforeUpdate', function (event) {
        if (mouseConstraint.mouse.button !== -1) {
            if (mouseConstraint.body && mouseConstraint.body == kneer) {
                var legmusclesr = [leg1r, leg2r, leg3r];
                removemuscles(legmusclesr)
            }
        }
        if (mouseConstraint.mouse.button !== 0) {
            if (mouseConstraint.body && mouseConstraint.body == kneer) {
                leg1r.length = Math.sqrt(Math.pow((footr.position.x - hipr.position.x), 2) + Math.pow((footr.position.y - hipr.position.y), 2));
                leg2r.length = Math.sqrt(Math.pow((hip.position.x - kneer.position.x), 2) + Math.pow((hip.position.y - kneer.position.y), 2));
                leg3r.length = Math.sqrt(Math.pow((footr.position.x - hip.position.x), 2) + Math.pow((footr.position.y - hip.position.y), 2));
                var legmusclesr = [leg1r, leg2r, leg3r];
                addmuscles(legmusclesr)

            }
        }
    });
    //if mouse clicks on KNEEL, then right leg constraints dissapear, on mouse up, constrainst sare added back in
    Events.on(engine, 'beforeUpdate', function (event) {
        if (mouseConstraint.mouse.button !== -1) {
            if (mouseConstraint.body && mouseConstraint.body == kneel) {
                var legmusclesl = [leg1l, leg2l, leg3l];
                removemuscles(legmusclesl)
            }
        }
        if (mouseConstraint.mouse.button !== 0) {
            if (mouseConstraint.body && mouseConstraint.body == kneel) {
                leg1l.length = Math.sqrt(Math.pow((footl.position.x - hipl.position.x), 2) + Math.pow((footl.position.y - hipl.position.y), 2));
                leg2l.length = Math.sqrt(Math.pow((hip.position.x - kneel.position.x), 2) + Math.pow((hip.position.y - kneel.position.y), 2));
                leg3l.length = Math.sqrt(Math.pow((footl.position.x - hip.position.x), 2) + Math.pow((footl.position.y - hip.position.y), 2));
                var legmusclesl = [leg1l, leg2l, leg3l];
                addmuscles(legmusclesl)

            }
        }
    });

    //event to adjust legs on hip click
    //if mouse clicks down on HIP, then constraints dissapear, 
    Events.on(engine, 'beforeUpdate', function (event) {
        if (mouseConstraint.mouse.button !== -1) {
            if (mouseConstraint.body && mouseConstraint.body == hip) {

                var legmuscles = [leg1l, leg2l, leg3l, leg1r, leg2r, leg3r];
                removemuscles(legmuscles);
                var biceps = [bicepl, bicepr];
                removemuscles(biceps);
            }
        }
    });
 
    //on mouse up, constrainsts are added back in (HIPS)
    //length of constraints recalcualted via pythagoras equation
    Events.on(engine, 'beforeUpdate', function (event) {

        if (mouseConstraint.mouse.button !== 0) {
            if (mouseConstraint.body && mouseConstraint.body == hip) {
                leg1l.length = Math.sqrt(Math.pow((footl.position.x - hipl.position.x), 2) + Math.pow((footl.position.y - hipl.position.y), 2));
                leg2l.length = Math.sqrt(Math.pow((hip.position.x - kneel.position.x), 2) + Math.pow((hip.position.y - kneel.position.y), 2));
                leg3l.length = Math.sqrt(Math.pow((footl.position.x - hip.position.x), 2) + Math.pow((footl.position.y - hip.position.y), 2));
                leg1r.length = Math.sqrt(Math.pow((footr.position.x - hipr.position.x), 2) + Math.pow((footr.position.y - hipr.position.y), 2));
                leg2r.length = Math.sqrt(Math.pow((hip.position.x - kneer.position.x), 2) + Math.pow((hip.position.y - kneer.position.y), 2));
                leg3r.length = Math.sqrt(Math.pow((footr.position.x - hip.position.x), 2) + Math.pow((footr.position.y - hip.position.y), 2));

                var legmuscles = [leg1l, leg2l, leg3l, leg1r, leg2r, leg3r];
                addmuscles(legmuscles);

                bicepl.length = Math.sqrt(Math.pow((shoulderl.position.x - handl.position.x), 2) + Math.pow((shoulderl.position.y - handl.position.y), 2));
                var biceps = [bicepl, bicepr];
                addmuscles(biceps)
        }}
     
    });



    
    //if mouse clicks on HANDL, then left bicep constraints dissapear, on mouse up, constrainsts are added back in
    Events.on(engine, 'beforeUpdate', function (event) {
        if (mouseConstraint.mouse.button !== -1) {
            if (mouseConstraint.body && mouseConstraint.body == handl) {
                var biceps = [bicepl];
                removemuscles(biceps)
            }
        }
        if (mouseConstraint.mouse.button !== 0) {
            if (mouseConstraint.body && mouseConstraint.body == handl) {
                bicepl.length = Math.sqrt(Math.pow((shoulderl.position.x - handl.position.x), 2) + Math.pow((shoulderl.position.y - handl.position.y), 2));
                var biceps = [bicepl];
                addmuscles(biceps)

            }
        }
    });
    //if mouse clicks on HANDR, then left bicep constraints dissapear, on mouse up, constrainsts are added back in
    Events.on(engine, 'beforeUpdate', function (event) {
        if (mouseConstraint.mouse.button !== -1) {
            if (mouseConstraint.body && mouseConstraint.body == handr) {
                var biceps = [bicepr];
                removemuscles(biceps)
            }
        }
        if (mouseConstraint.mouse.button !== 0) {
            if (mouseConstraint.body && mouseConstraint.body == handr) {
                bicepr.length = Math.sqrt(Math.pow((shoulderr.position.x - handr.position.x), 2) + Math.pow((shoulderr.position.y - handr.position.y), 2));
                var biceps = [bicepr];
                addmuscles(biceps)

            }
        }
    });

    //if mouse clicks on TORSO, then both bicep constraints dissapear, on mouse up, constrainsts are added back in
    Events.on(engine, 'beforeUpdate', function (event) {
        if (mouseConstraint.mouse.button !== -1) {
            if (mouseConstraint.body && mouseConstraint.body == torso) {
                var biceps = [bicepl,bicepr];
                removemuscles(biceps);
                //remove constraints limiting hip rotation
                var hips = [leg1l, leg1r, lowerabl, lowerabr];
                removemuscles(hips);
            }
        }
        if (mouseConstraint.mouse.button !== 0) {
            if (mouseConstraint.body && mouseConstraint.body == torso) {
                bicepl.length = Math.sqrt(Math.pow((shoulderl.position.x - handl.position.x), 2) + Math.pow((shoulderl.position.y - handl.position.y), 2));
                bicepr.length = Math.sqrt(Math.pow((shoulderr.position.x - handr.position.x), 2) + Math.pow((shoulderr.position.y - handr.position.y), 2));
                var biceps = [bicepl, bicepr];
                addmuscles(biceps);
                //add constraints limiting hip rotation
                lowerabl.length = Math.sqrt(Math.pow((hipl.position.x - thoracic.position.x), 2) + Math.pow((hipl.position.y - thoracic.position.y), 2));
                lowerabr.length = Math.sqrt(Math.pow((hipr.position.x - thoracic.position.x), 2) + Math.pow((hipr.position.y - thoracic.position.y), 2));
                var hips = [leg1l, leg1r, lowerabl, lowerabr];
                addmuscles(hips);
             }
        }
        
    });

    //key press to move shoulder width
    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 37) {
            trapmid.length = trapmid.length - 5;
            traps = [trapmid, trapl, trapr];
            removemuscles(traps);
            addmuscles(traps);
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 39) {
            trapmid.length = trapmid.length + 5;
            traps = [trapmid];
            removemuscles(traps);
            addmuscles(traps);
        }
    });

    // arm muscles shorten on up press, lengthen on down press
    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 40) {
            bicepl.length = bicepl.length + 5;
            bicepr.length = bicepr.length + 5;
            biceps = [bicepl, bicepr];
            removemuscles(biceps);
            addmuscles(biceps);
        }
    });
    // arm muscles shorten on up press, lengthen on down press
    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 38) {
            bicepl.length = bicepl.length - 5;
            bicepr.length = bicepr.length - 5;
            biceps = [bicepl, bicepr];
            removemuscles(biceps);
            addmuscles(biceps);
        }
    });



    //Hands stick to holds
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
		if (pair.bodyA === collider4) {
		    pair.bodyB.isStatic = true;
		} else if (pair.bodyB === collider4) {
		    pair.bodyA.isStatic = true;
		}
		if (pair.bodyA === collider5) {
		    pair.bodyB.isStatic = true;
		} else if (pair.bodyB === collider5) {
		    pair.bodyA.isStatic = true;
		}
      if (pair.bodyA === collider6) {
          pair.bodyB.isStatic = true;
      } else if (pair.bodyB === collider6) {
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
					angle: 0
					});
				World.add(world, collider1);

//collider- collider2
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

    //collider- collider4
				let collider4 = Bodies.rectangle(300, 400, 20, 20, {
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
				World.add(world, collider4);
				
				let collider5 = Bodies.rectangle(700, 400, 20, 20, {
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
				World.add(world, collider5);
				let collider6 = Bodies.rectangle(200, 500, 20, 20, {
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
				World.add(world, collider6);

    //
    //calculate forces through arms

document.addEventListener('keydown', function (event) {
    //on up arrow
    if (event.keyCode == 38) {

        // length = "target resting length of constraint"
        // compare this to actual length - distance between bodyA and bodyB.
        //this will give the stretch - the elasticity/stiffness will help convert this to force
        //so we can measure force throught the bones (forearm, arm) and through the biceps. 
        //If hanging from one arm, the forces should always add up to the same? 

        // armstretch = armstretchedlength  - armtargetlength 
        var armstretchedlength = (Math.sqrt(Math.pow((elbowl.position.x - handl.position.x), 2) + Math.pow((elbowl.position.y - handl.position.y), 2)));
        var armstretch = armstretchedlength - forearml.length;
        // console.log(armstretch);
        //forearm.stiffness =default = 1
        //maximum onearm lock (flexing bicep) = -4
        //one arm hang- starting ar 90degrees bent, falls to straight arm = 1.0
        //onearm deadhang = 2.34
        //weight of elbow = 0.1
        //hand on shoulder with no weight = 0

        //bicepstretch
        //var bicepstretchedlength = (Math.sqrt(Math.pow((handl.position.x - shoulderl.position.x), 2) + Math.pow((handl.position.y - shoulderl.position.y), 2)));
        var bicepstretch = armstretchedlength - bicepl.length;
        console.log(bicepstretch);
        //bicepl.stiffness = 0.1
        //maximum onearm lock = 200
        //full lock with no bicep tension, falls to 90degrees = 32
        //deadhang, limp straight arm, hand on shoulder(no weight)= -46 (constraint is being compressed?)
        //one arm hang- starting ar 90degrees, falls to straight arm = -14

        //if torso is stretched down and arm is stretched, on mouse up = -61
        //2 arm hang- starting ar 90degrees, falls to 30 degrees off of straight = -9

    }});

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
