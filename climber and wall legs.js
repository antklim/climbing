//interesting link http://codepen.io/lilgreenland/en/jrMvaB?editors=1010 has vectors for gravity and velcoity

//To DO:
// twist shoulders - left and right arrows - still weird
//lock biceps - up and down arrows - prevent arms from over lengthening
//limit mouse cnstraint ability to pull whole body when clicking no limbs - there is a range of movment for arml in effect. but also cahnge mouseConstraint.constraint.stiffness?
// apply limits to legs
//left arm can lock to pose but becomes weak when touching a hold - still needs work , will be overridden by toso or hip press
//straighten or length legs with key presses?
//add force vectors - done somewhat for left hand, is it useful?
//  get numbers - force and angle - display them on screen
//make arm force vector respond to direction of pull - not always towars the shoulder??
//  make holds directional - depth of hold alludes to how good it is
//correct mention of removing constraints on mouse press - replace with "relax"
//add additional constraint to hold arm up - deltoid. seems to help
//look up mass distribution in human
//make dyno system - prevent climber from flying on multiple key hits. - shift only works if a limb is colliding with a hold? 
// - collission active? - add max force/velocity?

//leg bones are stretchy - need to be made firm
//add feet/toes
//how to make hands grab/stick to sidepull? - are they coorect orientation? are the angle markers correct?
//foot and knee blockers interact with holds - need them to block feet only.
//make foot block dissapear when movnig knee - alllow for back step
//different coloured holds mean something differnt, different shapes - pinch, sloper, crimp?
//move similar events ie collision start, nbefore update, into same event listener
// ie: lefthandchanges ();
//      righthandchanges ();

//hands can pull body around too much
//apply all changes bilaterally
//left arm relaxes on hip click

//HUD circle with hip vector Circle - static , same collision as other hud.  they dissapear on mouse click?

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
    const Mouse = Matter.Mouse;
    const Vertices = Matter.Vertices;
    const Query = Matter.Query;
    const Vector = Matter.Vector;
    const Pairs = Matter.Pairs;
    const Pair = Matter.Pair;


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
    const greyColor = '#708090';

    const blackColor = '#000000';

    let bottomBorder = Bodies.rectangle(400, 625, 800, 50, {
        collisionFilter: {
            category: defaultCategory
        },
        isStatic: true,
        friction:2,
        render: {
            fillStyle: 'transparent',
            lineWidth: 1
        }
    });
    World.add(world, bottomBorder);


    //add climber
    //weight distribution % Thigh/knee 10, lower leg / foot 6.5 , trunk/head 57 (torso 15, thoracic 13, lumbar 14, hip 15), upper arm/shoulder, forearm/hand/elbow 5, 
    var torso = Bodies.circle(600, 395, 10, {
        setMass: 15,
        render: {
            strokeStyle: greenColor,
            fillStyle: 'transparent',
            lineWidth: 1
        },
        collisionFilter: {
            category: blueCategory
        },
    });
    var thoracic = Bodies.circle(600, 425, 10, {
        setMass: 13,
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
    var lumbar = Bodies.circle(600, 450, 10, {
        setMass: 14,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1
        },
        collisionFilter: {
            category: blueCategory,
            mask: blueCategory
        },
    });
    var hip = Bodies.circle(600, 480, 20, {
        setMass: 15,
        render: {
            strokeStyle: greenColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory,
        },
    });
    var hipl = Bodies.circle(574, 500, 8, {
        setMass: 1,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory,
            mask: redCategory
        },
    });
    var hipr = Bodies.circle(626, 500, 8, {
        setMass: 1,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory,
            mask: redCategory
        },
    });
    var shoulderl = Bodies.circle(570, 405, 10, {
        setMass: 5,
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
    var shoulderr = Bodies.circle(630, 405, 10, {
        setMass: 5,
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


    let elbowl = Bodies.circle(565, 447, 10, {
        setMass: 0.1,
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
    let elbowr = Bodies.circle(635, 447, 10, {
        setMass: 0.1,
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
    let handl = Bodies.circle(540, 485, 10, {
        setMass: 0.1,
        isSensor: true,
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: redCategory
        }
    });
    let handr = Bodies.circle(660, 485, 10, {
        setMass: 0.1,
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: redCategory,
        }
    });
    let footl = Bodies.rectangle(575, 610, 15, 15, {
        setMass: 10,
        friction: 2,
        restitution: 0.00000001,
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: redCategory
        }
    });
    let footblockl = Bodies.rectangle(570, 610, 10, 10, {
        setMass: 0.00001,
        restitution: 0.0000001,
        friction: 2,
        render: {
            strokeStyle: greyColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory
        }
    });
    let footblockr = Bodies.rectangle(635, 610, 10, 10, {
        setMass: 0.00001,
        restitution: 0.00000001,
        friction: 2,
        render: {
            strokeStyle: greyColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory
        }
    });
    let kneeblockl = Bodies.circle(585, 550, 1, {
        setMass: 0.0001,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory
        }
    });
    let kneeblockr = Bodies.circle(615, 550, 1, {
        setMass: 0.00,
        render: {
            strokeStyle: blueColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: blueCategory
        }
    });
    let footr = Bodies.rectangle(625, 610, 15, 15, {
        setMass: 10,
        friction:2,
        restitution: 0.00000001,
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: redCategory
        }
    });
    let kneel = Bodies.circle(560, 547, 10, {
        setMass: 10,
        render: {
            strokeStyle: greenColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: greenCategory
        }
    });
    let kneer = Bodies.circle(640, 547, 10, {
        setMass: 10,
        render: {
            strokeStyle: greenColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        collisionFilter: {
            category: greenCategory
        }
    });



    var climber = [torso, thoracic, lumbar, hip, hipl, hipr,
        shoulderr, shoulderl, elbowl, elbowr, handl, handr,
        footl, footr, kneel, kneer, footblockl, footblockr, kneeblockl, kneeblockr];

    //make wrist (to detect arm load)
    let wrist1l = Bodies.circle(handl.position.x - 2, handl.position.y + 2, 1, { isSensor: true });
    let wrist2l = Constraint.create({ bodyA: handl, bodyB: wrist1l, stiffness: 1.5 });
    World.add(world, wrist1l);
    World.add(world, wrist2l);
    let wrist1r = Bodies.circle(handr.position.x + 2, handr.position.y + 2, 1, { isSensor: true });
    let wrist2r = Constraint.create({ bodyA: handr, bodyB: wrist1r, stiffness: 1.5 });
    World.add(world, wrist1r);
    World.add(world, wrist2r);

    //constraints

    //arms

    let arml = Constraint.create({ bodyA: shoulderl, bodyB: elbowl });
    let armr = Constraint.create({ bodyA: shoulderr, bodyB: elbowr });
    let forearml = Constraint.create({ bodyB: elbowl, bodyA: wrist1l });
    let forearmr = Constraint.create({ bodyB: elbowr, bodyA: wrist1r });
    
    var arms = [arml, armr, forearml, forearmr];

    //core
    let lowertrapl = Constraint.create({ bodyA: shoulderl, bodyB: thoracic });
    let latl = Constraint.create({ bodyA: shoulderl, bodyB: lumbar });
    let upperabl = Constraint.create({ bodyA: shoulderl, bodyB: hip, stiffness: 0.2 });
    let lowerabl = Constraint.create({ bodyA: hipl, bodyB: thoracic, stiffness: 0.2 });
    let obliquel = Constraint.create({ bodyA: hipl, bodyB: lumbar });
    let lowertrapr = Constraint.create({ bodyA: shoulderr, bodyB: thoracic });
    let latr = Constraint.create({ bodyA: shoulderr, bodyB: lumbar });
    let upperabr = Constraint.create({ bodyA: shoulderr, bodyB: hip, stiffness: 0.2 });
    let lowerabr = Constraint.create({ bodyA: hipr, bodyB: thoracic, stiffness: 0.2 });
    let obliquer = Constraint.create({ bodyA: hipr, bodyB: lumbar });
    let spineup = Constraint.create({ bodyA: torso, bodyB: thoracic, stiffness: 1.8 });
    let spinemid = Constraint.create({ bodyA: thoracic, bodyB: lumbar, stiffness: 1.8 });
    let spinelow = Constraint.create({ bodyA: lumbar, bodyB: hip, stiffness: 1.8 });
    let trapmid = Constraint.create({ bodyA: shoulderl, bodyB: shoulderr, stiffness: 1.5 });
    let trapl = Constraint.create({ bodyA: torso, bodyB: shoulderl, stiffness: 1.5 });
    let trapr = Constraint.create({ bodyA: torso, bodyB: shoulderr, stiffness: 1.5});
    let abl = Constraint.create({ bodyB: hipl, bodyA: shoulderl });
    let abr = Constraint.create({ bodyB: hipr, bodyA: shoulderr });
    var core = [trapl, trapr, lowertrapl, lowertrapr, trapmid, latl, latr, upperabl, upperabr,
                lowerabl, lowerabr, obliquel, obliquer, spineup, spinemid, spinelow];

    //legs
    let leg1l = Constraint.create({ bodyA: hipl, bodyB: footl, stiffness: 1 });
    let leg2l = Constraint.create({ bodyA: hip, bodyB: kneel, stiffness: 1 });
    let leg3l = Constraint.create({ bodyA: hip, bodyB: footl, stiffness: 1 });
    let femurl = Constraint.create({ bodyA: hipl, bodyB: kneel, stiffness: 1.5 });
    let tibial = Constraint.create({ bodyA: kneel, bodyB: footl, stiffness: 1.5 });
    let leg1r = Constraint.create({ bodyA: hipr, bodyB: footr, stiffness: 1.5 });
    let leg2r = Constraint.create({ bodyA: hip, bodyB: kneer, stiffness: 1.5 });
    let leg3r = Constraint.create({ bodyA: hip, bodyB: footr, stiffness: 1 });
    let femurr = Constraint.create({ bodyA: hipr, bodyB: kneer, stiffness: 1.5 });
    let tibiar = Constraint.create({ bodyA: kneer, bodyB: footr, stiffness: 1.5 });
    let block1l = Constraint.create({ bodyA: footblockl, bodyB: kneeblockl, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block2l = Constraint.create({ bodyA: footblockl, bodyB: kneel, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block3l = Constraint.create({ bodyA: hipl, bodyB: kneeblockl, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block4l = Constraint.create({ bodyA: kneel, bodyB: kneeblockl, stiffness: 1.5, render: { strokeStyle: '#708090' } });
    let block1r = Constraint.create({ bodyA: footblockr, bodyB: kneeblockr, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block2r = Constraint.create({ bodyA: footblockr, bodyB: kneer, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block3r = Constraint.create({ bodyA: hipr, bodyB: kneeblockr, stiffness: 1.5, render: { strokeStyle: '#708090', lineWidth: 1 } });
    let block4r = Constraint.create({ bodyA: kneer, bodyB: kneeblockr, stiffness: 1.5, render: { strokeStyle: '#708090' } });

    let psoasl = Constraint.create({ bodyA: lumbar, bodyB: kneel, stiffness: 1 });
    let psoasr = Constraint.create({ bodyA: lumbar, bodyB: kneer, stiffness: 1 });

    var blockers = [block1l, block1r, block2l, block2r, block3l, block3r, block4l, block4r];

    var legs = [femurl, femurr, tibial, tibiar];
    var legmuscles = [leg1l, leg2l, leg3l, leg1r, leg2r, leg3r, psoasl, psoasr];

    //hips
    
    let pubisl = Constraint.create({ bodyA: hip, bodyB: hipl, stiffness: 1.5 });
    let pubisr = Constraint.create({ bodyA: hipr, bodyB: hip, stiffness: 1.5 });
    let illiuml = Constraint.create({ bodyA: hipl, bodyB: lumbar, stiffness: 1.5 });
    let illiumr = Constraint.create({ bodyA: hipr, bodyB: lumbar, stiffness: 1.5 });
    let ischium = Constraint.create({ bodyA: hipl, bodyB: hipr, stiffness: 1.5 });
    var hips = [pubisl, pubisr, illiuml, illiumr, ischium];

    var ConstraintrenderColor = function (arrayOfConstraints, lineWidth, Color) {
        for (let i = 0; i < arrayOfConstraints.length; i++) {
            arrayOfConstraints[i].render.lineWidth = lineWidth;
            arrayOfConstraints[i].render.strokeStyle = Color
        }
    };



    ConstraintrenderColor(arms, 3, blueColor);
    ConstraintrenderColor(core, 3, blueColor);
    ConstraintrenderColor(legs, 3, blueColor);
    ConstraintrenderColor(legmuscles, 1, redColor);
    ConstraintrenderColor(hips, 3, blueColor);
    ConstraintrenderColor(blockers, 0.5, greyColor);



    World.add(world, arms);
    World.add(world, core);
    World.add(world, legs);
    World.add(world, legmuscles);
    World.add(world, hips);
    World.add(world, blockers);


    var addclimber = function (arrayOfBodies) {
        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            World.add(world, list)
        }
    };

    addclimber(climber);

    var setairfriction = function (arrayOfBodies, friction) {
        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            list.frictionAir = friction;
        }
    };
    setairfriction(climber, 0.1);

    //set time scale
    //slow down time?
    var settimescale = function (arrayOfBodies, time) {
        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            list.timeScale = time;
        }
    };
    settimescale(climber, 1);

    //make arm muscles
    let bicepl = Constraint.create({ bodyA: shoulderl, bodyB: wrist1l, stiffness: 0.1 });
    let bicepr = Constraint.create({ bodyA: shoulderr, bodyB: wrist1r, stiffness: 0.1 });
    let teresl   = Constraint.create({ bodyA: elbowl, bodyB: thoracic, stiffness: 0.5 });
    let teresr = Constraint.create({ bodyA: elbowr, bodyB: thoracic, stiffness: 0.5 });
    let deltoidl = Constraint.create({ bodyB: torso, bodyA: wrist1l, stiffness: 0.5 });
    let deltoidr = Constraint.create({ bodyB: torso, bodyA: wrist1r, stiffness: 0.5 });
    
    let armmuscles = [bicepl, bicepr, teresl, teresr, deltoidl, deltoidr];
    addclimber(armmuscles);
    ConstraintrenderColor(armmuscles, 1 , redColor);

 
   
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
    var cogCoordinates = calculatecog([torso, hip, shoulderr, shoulderl, footl, footr, elbowl, elbowr, handr, handl, kneel, kneer, thoracic, lumbar, hipl, hipr]);
    
    var cog = Bodies.circle(cogCoordinates.x, cogCoordinates.y, 5, { isStatic: true, collisionFilter: { mask: redCategory | greenCategory } });
    World.add(world, cog);

    Events.on(engine, 'beforeUpdate', function (event) {  
        var cogCoordinates = calculatecog([torso, hip, shoulderr, shoulderl, footl, footr, elbowl, elbowr, handr, handl, kneel, kneer, thoracic, lumbar, hipl, hipr]);   
        Body.setPosition(cog, { x: cogCoordinates.x, y: cogCoordinates.y });
    });
    


    //show hip dyno vector in hud
    var hiphud = Bodies.circle(100, 300, 100, {
        isStatic: true, collisionFilter: {
            category: redCategory
        }, render:{fillStyle:'transparent', lineWidth: 1}
    });
    World.add(world, hiphud);

    //body to represnt hip vector
    var hiphud1 = Bodies.circle(100, 300, 10, {
        isStatic: true, collisionFilter: {
            category: redCategory
        }, render: {  lineWidth: 1 }
    });
    World.add(world, hiphud1);
    //add constraint between hiphud and hiphud1
    var hiphud2 = Constraint.create({ bodyA: hiphud1, bodyB: hiphud });
    World.add(world, hiphud2);


    //Holds that arms and legs stick to

    // collider is the red box in the middle
    let collider = Bodies.rectangle(500, 500, 20, 5, {
        isSensor: true,
        isStatic: true,
        collisionFilter: {
            category: blueCategory,
            mask: redCategory, greenCategory
        },
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        angle: 0
    });

    //second collider- collider1
    // collider is the red box in the middle
    let collider1 = Bodies.rectangle(500, 400, 20, 5, {
        isSensor: true,
        isStatic: true,
        collisionFilter: {
            category: blueCategory,
            mask: redCategory, greenCategory
        },
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        angle: 0.37
    });


    //collider- collider2
    let collider2 = Bodies.rectangle(400, 200, 30, 5, {
        isSensor: true,
        isStatic: true,
        collisionFilter: {
            category: blueCategory,
            mask: redCategory, greenCategory
        },
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        angle: -0.75
    });


    //collider- collider3
    let collider3 = Bodies.rectangle(400, 400, 20, 2, {
        isSensor: true,
        isStatic: true,
        collisionFilter: {
            category: blueCategory,
            mask: redCategory, greenCategory
        },
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        angle: -0.5
    });


    //collider- collider4
    let collider4 = Bodies.rectangle(500, 300, 40, 2, {
        isSensor: true,
        isStatic: true,
        collisionFilter: {
            category: blueCategory,
            mask: redCategory, greenCategory
        },
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        angle: -0.37
    });


    let collider5 = Bodies.rectangle(600, 200, 40, 10, {
        isSensor: true,
        isStatic: true,
        collisionFilter: {
            category: blueCategory,
            mask: redCategory, greenCategory
        },
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        angle: 0.7
    });
    World.add(world, collider5);
    let collider6 = Bodies.rectangle(600, 100, 40, 5, {
        isSensor: true,
        isStatic: true,
        collisionFilter: {
            category: blueCategory,
            mask: redCategory, greenCategory
        },
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        angle: -0.5
    });
    var colliders = [collider, collider1, collider2, collider3, collider4, collider5, collider6];

    World.add(world, colliders);



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

    //function to make constraints more flexible
    var relaxmuscles = function (arrayOfBodies) {

        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            list.stiffness = 0.05
        }
    };
    //function to make constraints very flexible
    var relaxmusclesloose = function (arrayOfBodies) {

        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            list.stiffness = 0.001
        }
    };
    var tensemuscles = function (arrayOfBodies) {

        for (let i = 0; i < arrayOfBodies.length; i++) {

            let list = arrayOfBodies[i];
            list.stiffness = 1
        }
    };
  
    //limit mouse drag of limbs to their rnge of movement from body?
    var armlrange = Bodies.circle(shoulderl.position.x, shoulderl.position.y, 100, {
        isSensor: true,
        restitution: 0.00001,
        collisionFilter: {
            category: defaultCategory,
            mask: redCategory, greenCategory, blueCategory
        },
        render: {
            strokeStyle: blackColor,
            fillStyle: 'transparent',
            lineWidth: 0.5,
            visible: true
        },
        Mass: 0.0000001
    });
    var armlrangeCon = Constraint.create({ bodyA: armlrange, bodyB: shoulderl, length: 0.1, stiffness: 2 });
    //World.add(world, armlrange);
    // World.add(world, armlrangeCon);

    var armrrange = Bodies.circle(shoulderr.position.x, shoulderr.position.y, 100, {
        isSensor: true,
        restitution: 0.00001,
        collisionFilter: {
            category: defaultCategory,
            mask: redCategory, greenCategory, blueCategory
        },
        render: {
            strokeStyle: blackColor,
            fillStyle: 'transparent',
            lineWidth: 0.5,
            visible: true
        },
        Mass: 0.0000001
    });
    var armrrangeCon = Constraint.create({ bodyA: armrrange, bodyB: shoulderr, length: 0.1, stiffness: 2 });
    World.add(world, armrrange);
    World.add(world, armrrangeCon);

    //range for legr
    var legrrange = Bodies.circle(hipr.position.x, hipr.position.y, 125, {
        isSensor: true,
        restitution: 0.00001,
        collisionFilter: {
            category: defaultCategory,
            mask: redCategory, greenCategory, blueCategory
        },
        render: {
            strokeStyle: blackColor,
            fillStyle: 'transparent',
            lineWidth: 0.5,
            visible: true
        },
        Mass: 0.0000001
    });
    var legrrangeCon = Constraint.create({ bodyA: legrrange, bodyB: hipr, length: 0.1, stiffness: 2 });
    World.add(world, legrrange);
    World.add(world, legrrangeCon);

    var leglrange = Bodies.circle(hipl.position.x, hipl.position.y, 125, {
        isSensor: true,
        restitution: 0.00001,
        collisionFilter: {
            category: defaultCategory,
            mask: redCategory, greenCategory, blueCategory
        },
        render: {
            strokeStyle: blackColor,
            fillStyle: 'transparent',
            lineWidth: 0.5,
            visible: true
        },
        Mass: 0.0000001
    });
    var leglrangeCon = Constraint.create({ bodyA: leglrange, bodyB: hipl, length: 0.1, stiffness: 2 });
    // World.add(world, leglrange);
    // World.add(world, leglrangeCon);

 
    //left arm changes tension on hold collision   
    Events.on(engine, 'collisionStart', function (event) {
        const pairs = event.pairs;
        var biceps = [bicepl, teresl];
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i];

            if (pair.bodyA === handl) {
                if (pair.bodyB === collider) { removemuscles(biceps); bicepl.stiffness = 0.1; teresl.stiffness = 0.1; addmuscles(biceps) }
            }
            if (pair.bodyB === handl) {
                if (pair.bodyA === collider) { removemuscles(biceps); bicepl.stiffness = 0.1; teresl.stiffness = 0.1; addmuscles(biceps) }
            }
            else tensemuscles(biceps)
        }
    });
    //right arm changes tension on hold collision
    Events.on(engine, 'collisionStart', function (event) {
        const pairs = event.pairs;
        var biceps = [bicepr, teresr];
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i];
            if (pair.bodyA === handr) {
                if (pair.bodyB === collider) { removemuscles(biceps); bicepr.stiffness = 0.1; teresr.stiffness = 0.1; addmuscles(biceps) }
            }
            if (pair.bodyB === handr) {
                if (pair.bodyA === collider) { removemuscles(biceps); bicepr.stiffness = 0.1; teresr.stiffness = 0.1; addmuscles(biceps) }
            }
            else tensemuscles(biceps)
        }});


    var tensemusclesweak = function (arrayOfBodies) {
        for (let i = 0; i < arrayOfBodies.length; i++) {
            let list = arrayOfBodies[i];
            list.stiffness = 1
        }};

    //limit mouse drag of limbs to their rnge of movement from body?
    var armlrange = Bodies.circle(570, 410, 100, {
        isSensor: true,
        collisionFilter: {
            category: blueCategory,
            mask: redCategory
        } ,
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 0.5,
            visible:true
        },
        Mass:0.0000001
    });
    var armlrangeCon = Constraint.create({ bodyA: armlrange, bodyB: shoulderl, length: 0.000001, stiffness: 2 });
    World.add(world, armlrange);
    World.add(world, armlrangeCon);

    //range for legl
    var leglrange = Bodies.circle(574, 503, 120, {
        isSensor: true,
        collisionFilter: {
            category: blueCategory,
            mask: redCategory
        },
        render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 0.5,
            visible: true
        },
        Mass: 0.0000001
    });
    var leglrangeCon = Constraint.create({ bodyA: leglrange, bodyB: hipl, length: 0.000001, stiffness: 2 });
    World.add(world, leglrange);
    World.add(world, leglrangeCon);


    // MOUSE EVENTS! events to adjust limbs on mouse clicks
    //on mouse down events
    //default  mouseConstraint.constraint.stiffness = 0.1
    //var mouseconstraintvectorweak = 1e-10;
    //var mouseconstraintvector = 1e-10 ;
    var defaultconstraintstiffness = 0.1

    Events.on(engine, 'beforeUpdate', function (event) {
        if (mouseConstraint.mouse.button !== -1) {

            // speed back up time?


            settimescale(climber, 1);

            //set air friction?
            setairfriction(climber, 0.01);

            //if mouse clicks on FOOTL, then left leg constraints lower stiffness, (on mouse up, constraints are added back in)
            if (mouseConstraint.body && mouseConstraint.body == footl) {
                leglrange.render.strokeStyle = redColor;
                mouseConstraint.constraint.stiffness = 0.08;
                var legmusclesl = [leg1l, leg2l, leg3l, psoasl];
                relaxmusclesloose(legmusclesl);
                // if (Matter.Bounds.contains(leglrange.bounds, mouseConstraint.mouse.position) === false) { mouseConstraint.constraint.stiffness = 0.02 }


            }
            //if mouse clicks on FOOTR, then right leg constraints dissapear (on mouse up, constraints are added back in)
            if (mouseConstraint.body && mouseConstraint.body == footr) {
                mouseConstraint.constraint.stiffness = 0.08;
                legrrange.render.strokeStyle = redColor;
                var legmusclesr = [leg1r, leg2r, leg3r, psoasr];
                relaxmusclesloose(legmusclesr);
                // if (Matter.Bounds.contains(legrrange.bounds, mouseConstraint.mouse.position) === false) { mouseConstraint.constraint.stiffness = 0.02 }


            }
            //if mouse clicks on KNEER, then right leg constraints dissapear, (on mouse up, constrainst sare added back in)
            if (mouseConstraint.body && mouseConstraint.body == kneer) {
                mouseConstraint.constraint.stiffness = 1;
                var legmusclesr = [leg1r, leg2r, leg3r, psoasr];
                relaxmuscles(legmusclesr);
                //make  footblock noncolldiing while moving knee to allow backstep??? only from frog position? prevent knockknees?
                footblockr.isSensor=true;
            }
            //if mouse clicks on KNEEL, then right leg constraints dissapear, (on mouse up, constrainst sare added back in)
            if (mouseConstraint.body && mouseConstraint.body == kneel) {
                mouseConstraint.constraint.stiffness = 1;
                var legmusclesl = [leg1l, leg2l, leg3l, psoasl];
                relaxmuscles(legmusclesl);
                
                footblockl.isSensor = true;
            }
            //event to adjust legs on hip click
            //if mouse clicks down on HIP, then constraints dissapear,
            if (mouseConstraint.body && mouseConstraint.body == hip) {
                mouseConstraint.constraint.stiffness = 0.5;

                var legmuscles = [leg1l, leg2l, leg3l, leg1r, leg2r, leg3r, psoasl, psoasr];
                relaxmusclesloose(legmuscles);
               // var biceps1 = [bicepl, bicepr, teresl, teresr];
                var leftmuscles = [bicepl, teresl, deltoidl];
                var rightmuscles = [bicepr, teresr, deltoidr];

                if (handl.isStatic === true) {
                    relaxmuscles(leftmuscles);
                } else tensemuscles(leftmuscles);
                //  if (handr.isStatic === false) {
                // tensemuscles(rightmuscles)
                //  }
                if (handr.isStatic === true) {
                    relaxmuscles(rightmuscles);
                }
                else tensemuscles(rightmuscles)
                ;
            }
            //if mouse clicks on HANDL, then left bicep constraints dissapear, (on mouse up, constrainsts are added back in)
            if (mouseConstraint.body && mouseConstraint.body == handl) {
                armlrange.render.strokeStyle = redColor;
                mouseConstraint.constraint.stiffness = 0.4;
                var biceps = [bicepl, teresl, deltoidl];
                relaxmusclesloose(biceps);
                // if (Matter.Bounds.contains(armlrange.bounds, mouseConstraint.mouse.position) === false) { mouseConstraint.constraint.stiffness = 0.02 }

            }
            //if mouse clicks on HANDR, then right bicep constraints dissapear, (on mouse up, constrainsts are added back in)
            if (mouseConstraint.body && mouseConstraint.body == handr) {
                armrrange.render.strokeStyle = redColor;
                mouseConstraint.constraint.stiffness = 0.4;
                var biceps = [bicepr, teresr, deltoidr];
                relaxmusclesloose(biceps);
                //  if (Matter.Bounds.contains(armrrange.bounds, mouseConstraint.mouse.position) === false) { mouseConstraint.constraint.stiffness = 0.02 }

            }
            //if mouse clicks on TORSO, then both bicep constraints dissapear,( on mouse up, constrainsts are added back in)
            if (mouseConstraint.body && mouseConstraint.body == torso) {
                mouseConstraint.constraint.stiffness = 1;
                //var biceps = [bicepl, bicepr, teresl, teresr, deltoidl, deltoidr];
                var biceps = [bicepl, bicepr, teresl, teresr, deltoidl, deltoidr];
                //var teres = [teresl, teresr, deltoidl, deltoidr]
                var leftmuscles = [bicepl, teresl, deltoidl];
                var rightmuscles = [bicepr, teresr, deltoidr];


                //if (handl.isStatic !== true) {
                //removemuscles(leftmuscles); bicepl.stiffness = 1; teresl.stiffness = 1; deltoidl.stiffness = 1; addmuscles(leftmuscles) }

                if (handl.isStatic === true) {
                    relaxmuscles(leftmuscles);
                } else tensemuscles(leftmuscles);
                //  if (handr.isStatic === false) {
                // tensemuscles(rightmuscles)
                //  }
                if (handr.isStatic === true) {
                    relaxmuscles(rightmuscles);
                }
                else tensemuscles(rightmuscles)
                ;


                //relax constraints limiting hip rotation
                var hips = [leg1l, leg1r, lowerabl, lowerabr, psoasl, psoasr];
                relaxmuscles(hips);
            }
        }



        //mouse UP events
        if (mouseConstraint.mouse.button !== 0) {
            leglrange.render.strokeStyle = blackColor;
            legrrange.render.strokeStyle = blackColor;
            armlrange.render.strokeStyle = blackColor;
            armrrange.render.strokeStyle = blackColor;


            //if mouse clicks up on FOOTL,  constraints are added back in
            if (mouseConstraint.body && mouseConstraint.body == footl) {
                mouseConstraint.constraint.stiffness = defaultconstraintstiffness;
                var legmusclesl = [leg1l, leg2l, leg3l, psoasl];
                removemuscles(legmusclesl);
                tensemuscles(legmusclesl);

                leg1l.length = Math.sqrt(Math.pow((footl.position.x - hipl.position.x), 2) + Math.pow((footl.position.y - hipl.position.y), 2));
                leg2l.length = Math.sqrt(Math.pow((hip.position.x - kneel.position.x), 2) + Math.pow((hip.position.y - kneel.position.y), 2));
                leg3l.length = Math.sqrt(Math.pow((footl.position.x - hip.position.x), 2) + Math.pow((footl.position.y - hip.position.y), 2));
                psoasl.length = Math.sqrt(Math.pow((lumbar.position.x - kneel.position.x), 2) + Math.pow((lumbar.position.y - kneel.position.y), 2));

                World.add(world, legmusclesl);



            }
            //if mouse clicks up on FOOTR,  constraints are added back in
            if (mouseConstraint.body && mouseConstraint.body == footr) {
                mouseConstraint.constraint.stiffness = defaultconstraintstiffness;
                leg1r.length = Math.sqrt(Math.pow((footr.position.x - hipr.position.x), 2) + Math.pow((footr.position.y - hipr.position.y), 2));
                leg2r.length = Math.sqrt(Math.pow((hip.position.x - kneer.position.x), 2) + Math.pow((hip.position.y - kneer.position.y), 2));
                leg3r.length = Math.sqrt(Math.pow((footr.position.x - hip.position.x), 2) + Math.pow((footr.position.y - hip.position.y), 2));
                psoasr.length = Math.sqrt(Math.pow((lumbar.position.x - kneer.position.x), 2) + Math.pow((lumbar.position.y - kneer.position.y), 2));
                var legmusclesr = [leg1r, leg2r, leg3r, psoasr];
                removemuscles(legmusclesr);
                tensemuscles(legmusclesr);
                World.add(world, legmusclesr);

            }
            //if mouse clicks up on KNEER, then right leg constraints are added back in
            if (mouseConstraint.body && mouseConstraint.body == kneer) {
                mouseConstraint.constraint.stiffness = defaultconstraintstiffness;
                leg1r.length = Math.sqrt(Math.pow((footr.position.x - hipr.position.x), 2) + Math.pow((footr.position.y - hipr.position.y), 2));
                leg2r.length = Math.sqrt(Math.pow((hip.position.x - kneer.position.x), 2) + Math.pow((hip.position.y - kneer.position.y), 2));
                leg3r.length = Math.sqrt(Math.pow((footr.position.x - hip.position.x), 2) + Math.pow((footr.position.y - hip.position.y), 2));
                psoasr.length = Math.sqrt(Math.pow((lumbar.position.x - kneer.position.x), 2) + Math.pow((lumbar.position.y - kneer.position.y), 2));
                var legmusclesr = [leg1r, leg2r, leg3r, psoasr];
                removemuscles(legmusclesr);
                tensemuscles(legmusclesr);
                World.add(world, legmusclesr);

                //remove footandkneeblock while moving knee to allow backstep??? only from frog position? prevent knockknees?
                
                footblockr.isSensor = false;
            }

            //if mouse clicks UP on KNEEL, then right leg constraints are added back in    
            if (mouseConstraint.body && mouseConstraint.body == kneel) {
                mouseConstraint.constraint.stiffness = defaultconstraintstiffness;
                leg1l.length = Math.sqrt(Math.pow((footl.position.x - hipl.position.x), 2) + Math.pow((footl.position.y - hipl.position.y), 2));
                leg2l.length = Math.sqrt(Math.pow((hip.position.x - kneel.position.x), 2) + Math.pow((hip.position.y - kneel.position.y), 2));
                leg3l.length = Math.sqrt(Math.pow((footl.position.x - hip.position.x), 2) + Math.pow((footl.position.y - hip.position.y), 2));
                psoasl.length = Math.sqrt(Math.pow((lumbar.position.x - kneel.position.x), 2) + Math.pow((lumbar.position.y - kneel.position.y), 2));
                var legmusclesl = [leg1l, leg2l, leg3l, psoasl];
                removemuscles(legmusclesl);
                tensemuscles(legmusclesl);
                World.add(world, legmusclesl);

                //remove footandkneeblock while moving knee to allow backstep??? only from frog position? prevent knockknees?

                footblockl.isSensor = false;
            }
            //if mouse clicks up on HANDL, then left bicep constraints are added back in
            if (mouseConstraint.body && mouseConstraint.body == handl) {
                mouseConstraint.constraint.stiffness = defaultconstraintstiffness;
                var biceps = [bicepl, teresl, deltoidl];
                removemuscles(biceps);

                bicepl.length = Math.sqrt(Math.pow((shoulderl.position.x - handl.position.x), 2) + Math.pow((shoulderl.position.y - handl.position.y), 2));
                teresl.length = Math.sqrt(Math.pow((elbowl.position.x - thoracic.position.x), 2) + Math.pow((elbowl.position.y - thoracic.position.y), 2));
                deltoidl.length = Math.sqrt(Math.pow((handl.position.x - torso.position.x), 2) + Math.pow((handl.position.y - torso.position.y), 2));

                if (handl.isStatic === true) { tensemusclesweak(biceps) };
                if (handl.isStatic === false) { tensemuscles(biceps) };
                World.add(world, biceps);

                mouseConstraint.constraint.stiffness = 0.1;
            }
            //if mouse clicks up on HANDR, then left bicep constraints are added back in
            if (mouseConstraint.body && mouseConstraint.body == handr) {
                // mouseConstraint.constraint.stiffness = defaultconstraintstiffness;
                bicepr.length = Math.sqrt(Math.pow((shoulderr.position.x - handr.position.x), 2) + Math.pow((shoulderr.position.y - handr.position.y), 2));
                teresr.length = Math.sqrt(Math.pow((elbowr.position.x - thoracic.position.x), 2) + Math.pow((elbowr.position.y - thoracic.position.y), 2));
                deltoidr.length = Math.sqrt(Math.pow((handr.position.x - torso.position.x), 2) + Math.pow((handr.position.y - torso.position.y), 2));
                var biceps = [bicepr, teresr, deltoidr];

                removemuscles(biceps);
                if (handr.isStatic === true) { tensemusclesweak(biceps) };
                if (handr.isStatic === false) { tensemuscles(biceps) };

                World.add(world, biceps);


            }
            //if mouse clicks up on TORSO, then both bicep constraints are added back in
            if (mouseConstraint.body && mouseConstraint.body == torso) {
                mouseConstraint.constraint.stiffness = defaultconstraintstiffness;
                bicepl.length = Math.sqrt(Math.pow((shoulderl.position.x - handl.position.x), 2) + Math.pow((shoulderl.position.y - handl.position.y), 2));
                bicepr.length = Math.sqrt(Math.pow((shoulderr.position.x - handr.position.x), 2) + Math.pow((shoulderr.position.y - handr.position.y), 2));
                teresl.length = Math.sqrt(Math.pow((elbowl.position.x - thoracic.position.x), 2) + Math.pow((elbowl.position.y - thoracic.position.y), 2));
                teresr.length = Math.sqrt(Math.pow((elbowr.position.x - thoracic.position.x), 2) + Math.pow((elbowr.position.y - thoracic.position.y), 2));
                deltoidl.length = Math.sqrt(Math.pow((handl.position.x - torso.position.x), 2) + Math.pow((handl.position.y - torso.position.y), 2));
                deltoidr.length = Math.sqrt(Math.pow((handr.position.x - torso.position.x), 2) + Math.pow((handr.position.y - torso.position.y), 2));
                var biceps = [bicepl, bicepr, teresl, teresr, deltoidl, deltoidr];

                var leftmuscles = [bicepl, teresl, deltoidl];
                var rightmuscles = [bicepr, teresr, deltoidr];

                //if hand is static, relax constraints on toros click, if hand is not static, keep it tense

                if (handl.isStatic === true) { removemuscles(leftmuscles); bicepl.stiffness = 0.01; teresl.stiffness = 0.01; deltoidl.stiffness = 0.01; World.add(world, leftmuscles) }
                if (handr.isStatic === true) { removemuscles(rightmuscles); bicepr.stiffness = 0.01; teresr.stiffness = 0.01; deltoidr.stiffness = 0.01; World.add(world, rightmuscles) }
                if (handl.isStatic === false) { removemuscles(leftmuscles); tensemuscles(leftmuscles); World.add(world, leftmuscles) }
                if (handr.isStatic === false) { removemuscles(rightmuscles); tensemuscles(rightmuscles); World.add(world, rightmuscles) }


                //add constraints limiting hip rotation
                lowerabl.length = Math.sqrt(Math.pow((hipl.position.x - thoracic.position.x), 2) + Math.pow((hipl.position.y - thoracic.position.y), 2));
                lowerabr.length = Math.sqrt(Math.pow((hipr.position.x - thoracic.position.x), 2) + Math.pow((hipr.position.y - thoracic.position.y), 2));
                psoasl.length = Math.sqrt(Math.pow((lumbar.position.x - kneel.position.x), 2) + Math.pow((lumbar.position.y - kneel.position.y), 2));
                psoasr.length = Math.sqrt(Math.pow((lumbar.position.x - kneer.position.x), 2) + Math.pow((lumbar.position.y - kneer.position.y), 2));

                var hips = [leg1l, leg1r, lowerabl, lowerabr, psoasl, psoasr];
                removemuscles(hips);
                tensemuscles(hips);
                World.add(world, hips)
            }

            //event to adjust legs on hip click
            //on mouse up, constrainsts are added back in (HIPS)
            //length of constraints recalcualted via pythagoras equation
            if (mouseConstraint.body && mouseConstraint.body == hip) {
                mouseConstraint.constraint.stiffness = defaultconstraintstiffness;
                leg1l.length = Math.sqrt(Math.pow((footl.position.x - hipl.position.x), 2) + Math.pow((footl.position.y - hipl.position.y), 2));
                leg2l.length = Math.sqrt(Math.pow((hip.position.x - kneel.position.x), 2) + Math.pow((hip.position.y - kneel.position.y), 2));
                leg3l.length = Math.sqrt(Math.pow((footl.position.x - hip.position.x), 2) + Math.pow((footl.position.y - hip.position.y), 2));
                leg1r.length = Math.sqrt(Math.pow((footr.position.x - hipr.position.x), 2) + Math.pow((footr.position.y - hipr.position.y), 2));
                leg2r.length = Math.sqrt(Math.pow((hip.position.x - kneer.position.x), 2) + Math.pow((hip.position.y - kneer.position.y), 2));
                leg3r.length = Math.sqrt(Math.pow((footr.position.x - hip.position.x), 2) + Math.pow((footr.position.y - hip.position.y), 2));
                psoasl.length = Math.sqrt(Math.pow((lumbar.position.x - kneel.position.x), 2) + Math.pow((lumbar.position.y - kneel.position.y), 2));
                psoasr.length = Math.sqrt(Math.pow((lumbar.position.x - kneer.position.x), 2) + Math.pow((lumbar.position.y - kneer.position.y), 2));

                var legmuscles = [leg1l, leg2l, leg3l, leg1r, leg2r, leg3r, psoasl, psoasr];
                removemuscles(legmuscles);
                tensemuscles(legmuscles);
                World.add(world, legmuscles);

                bicepl.length = Math.sqrt(Math.pow((shoulderl.position.x - handl.position.x), 2) + Math.pow((shoulderl.position.y - handl.position.y), 2));
                bicepr.length = Math.sqrt(Math.pow((shoulderr.position.x - handr.position.x), 2) + Math.pow((shoulderr.position.y - handr.position.y), 2));
                teresl.length = Math.sqrt(Math.pow((elbowl.position.x - thoracic.position.x), 2) + Math.pow((elbowl.position.y - thoracic.position.y), 2));
                teresr.length = Math.sqrt(Math.pow((elbowr.position.x - thoracic.position.x), 2) + Math.pow((elbowr.position.y - thoracic.position.y), 2));
                deltoidl.length = Math.sqrt(Math.pow((handl.position.x - torso.position.x), 2) + Math.pow((handl.position.y - torso.position.y), 2));
                deltoidr.length = Math.sqrt(Math.pow((handr.position.x - torso.position.x), 2) + Math.pow((handr.position.y - torso.position.y), 2));
                var biceps = [bicepl, bicepr, teresl, teresr, deltoidl, deltoidr];
                removemuscles(biceps);

                tensemusclesweak(biceps);

                World.add(world, biceps);


                // dyno system

                // on right click? mouse can drag body to a position, mouse constraint can stretch beyond this position. 
                //mouse constraint = vector. on mouse up, forece is applied to body?? or translate body???, in opposite direction and magnitude to constraint vector.
                //at maximum velocity? or after a length of time proportional to force/distance? - limbs detatch from holds (no longer static?) ([climber] (all bodies of climber) isStatic: false)
                //arms reach up? (measure constraint lengths in this position and then makethese the presets)

                //if click on hips, console.log(mouseConstraint.length)
                //apply force

                //on mouseup on hips create vector for dyno system (SHIFT)
                const mouseconstraintlength = Math.sqrt(Math.pow((mouseConstraint.body.position.x - mouseConstraint.mouse.position.x), 2) + Math.pow((mouseConstraint.body.position.y - mouseConstraint.mouse.position.y), 2));
                const startPoint = mouseConstraint.mouse.position;
                const endPoint = mouseConstraint.body.position;
                const mouseconstraintvector = {
                    x: (endPoint.x - startPoint.x) * 0.04,
                    y: (endPoint.y - startPoint.y) * 0.04
                };
                const mouseconstraintvectorweak = {
                    x: (endPoint.x - startPoint.x) * 0.0005,
                    y: (endPoint.y - startPoint.y) * 0.0005,
                };
                console.log(mouseConstraint.body.position);
                console.log(mouseConstraint.mouse.position);
                console.log(mouseconstraintlength);
                console.log(mouseconstraintvector);
                console.log(mouseconstraintvectorweak);
               
                //when mouse up on hip, move body.hiphud1
                hiphud1.position = { x: hiphud.position.x - mouseconstraintvector.x *30, y: hiphud.position.y - mouseconstraintvector.y *30};
                
                document.addEventListener('keydown', function (event) {
                    //on SHIFT key
                    if (event.keyCode == 16) {
                        if (handl.isStatic === true || handr.isStatic === true) {
                            var limbconstraints = [leg1l, leg2l, leg3l, leg1r, leg2r, leg3r, psoasl, psoasr, bicepl, bicepr, teresl, teresr, deltoidl, deltoidr];
                            tensemuscles(limbconstraints);
                            handl.isStatic = false;
                            handr.isStatic = false;
                            footl.isStatic = false;
                            footr.isStatic = false;

                            //increase air friction?
                            var setairfriction = function (arrayOfBodies, friction) {
                                for (let i = 0; i < arrayOfBodies.length; i++) {
                                    let list = arrayOfBodies[i];
                                    list.frictionAir = friction;
                                }
                            };
                            var climber = [torso, thoracic, lumbar, hip, hipl, hipr,
                            shoulderr, shoulderl, elbowl, elbowr, handl, handr,
                            footl, footr, kneel, kneer, footblockl, footblockr, kneeblockl, kneeblockr];

                            setairfriction(climber, 0.3);

                            //slow down time?
                            var settimescale = function (arrayOfBodies, time) {
                                for (let i = 0; i < arrayOfBodies.length; i++) {
                                    let list = arrayOfBodies[i];
                                    list.timeScale = time;
                                }
                            };
                            settimescale(climber, 0.5);


                            Body.applyForce(handl, handl.position, mouseconstraintvectorweak);
                            Body.applyForce(handr, handr.position, mouseconstraintvectorweak);
                            Body.applyForce(shoulderl, shoulderl.position, mouseconstraintvector);
                            Body.applyForce(shoulderr, shoulderr.position, mouseconstraintvector);
                            Body.applyForce(hip, hip.position, mouseconstraintvectorweak);
                            Body.applyForce(torso, torso.position, mouseconstraintvector);
                            //if (footl.isStatic === false) {
                            //    Body.applyForce(footl, footl.position, mouseconstraintvectorweak);
                            // }
                            // if (footl.isStatic === true) {
                            //     var limbconstraints = [leg1l, leg2l, leg3l, psoasl];
                            //     relaxmuscles(limbconstraints);
                            //     Body.applyForce(footl, footl.position, { x: mouseconstraintvectorweak.x * -3, y: mouseconstraintvectorweak.y * -3 });
                            // };

                            //  console.log(mouseConstraint.body.position);
                            console.log(mouseConstraint.mouse.position);
                            console.log(mouseconstraintlength);
                            console.log(mouseconstraintvector);
                            console.log(mouseconstraintvectorweak);
                            console.log(hip);}
                        else (console.log(mouseconstraintvector))

                    }
                    //on SPACE arrow
                    if (event.keyCode == 32) {
                        var wriststretchedlength = (Math.sqrt(Math.pow((handl.position.x - wrist1l.position.x), 2) + Math.pow((handl.position.y - wrist1l.position.y), 2)));
                        var wriststretch = (wriststretchedlength - wrist2l.length);
                        var armangle = -1 * Math.atan2(shoulderl.position.x - handl.position.x, shoulderl.position.y - handl.position.y);



                        if (Matter.Bounds.overlaps(collider.bounds, handl.bounds) === true) { var holdangle = collider.angle }
                        if (Matter.Bounds.overlaps(collider1.bounds, handl.bounds) === true) { var holdangle = collider1.angle }
                        if (Matter.Bounds.overlaps(collider2.bounds, handl.bounds) === true) { var holdangle = collider2.angle }
                        if (Matter.Bounds.overlaps(collider3.bounds, handl.bounds) === true) { var holdangle = collider3.angle }
                        if (Matter.Bounds.overlaps(collider4.bounds, handl.bounds) === true) { var holdangle = collider4.angle }
                        if (Matter.Bounds.overlaps(collider5.bounds, handl.bounds) === true) { var holdangle = collider5.angle }
                        if (Matter.Bounds.overlaps(collider6.bounds, handl.bounds) === true) { var holdangle = collider6.angle }

                        var angledifference = Math.abs(armangle - holdangle);

                        //dyno vector

                        console.log(wriststretch);
                        console.log(armangle);
                        console.log(holdangle);
                        console.log(angledifference);
                        console.log(mouseconstraintvector);

                    }
                });
                ;
            }

        }



        //set COG position

        var cogCoordinates = calculatecog([torso, hip, shoulderr, shoulderl, footl, footr, kneel, kneer, elbowl, elbowr, handr, handl, lumbar, thoracic, hipl, hipr]);
        Body.setPosition(cog, { x: cogCoordinates.x, y: cogCoordinates.y });
    }
    );






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
            if (bicepl.length < ((Math.sqrt(Math.pow((shoulderl.position.x - elbowl.position.x), 2) + Math.pow((shoulderl.position.y - elbowl.position.y), 2)))
                +(Math.sqrt(Math.pow((elbowl.position.x - handl.position.x), 2) + Math.pow((elbowl.position.y - handl.position.y), 2)))))
            {bicepl.length = bicepl.length + 5}
            if (bicepr.length < ((Math.sqrt(Math.pow((shoulderr.position.x - elbowr.position.x), 2) + Math.pow((shoulderr.position.y - elbowr.position.y), 2)))
                +(Math.sqrt(Math.pow((elbowr.position.x - handr.position.x), 2) + Math.pow((elbowr.position.y - handr.position.y), 2)))))
            {bicepr.length = bicepr.length + 5};
            
            teresl.length = Math.sqrt(Math.pow((elbowl.position.x - thoracic.position.x), 2) + Math.pow((elbowl.position.y - thoracic.position.y), 2));
            teresr.length = Math.sqrt(Math.pow((elbowr.position.x - thoracic.position.x), 2) + Math.pow((elbowr.position.y - thoracic.position.y), 2));
            deltoidl.length = Math.sqrt(Math.pow((handl.position.x - torso.position.x), 2) + Math.pow((handl.position.y - torso.position.y), 2));
            deltoidr.length = Math.sqrt(Math.pow((handr.position.x - torso.position.x), 2) + Math.pow((handr.position.y - torso.position.y), 2));
            biceps = [bicepl, bicepr, teresl, teresr, deltoidl, deltoidr];
            removemuscles(biceps);
            teresl.stiffness = 0.05;
            teresr.stiffness = 0.05;
            deltoidl.stiffness = 0.05;
            deltoidr.stiffness = 0.05;
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


    //Hands stick to holds
    // event to make object no longer static while mouse is clicked (only if it is climber body though) - to prevent hold blockers dissapearing???
    // add static = false with click
    Events.on(engine, 'beforeUpdate', function (event) {
        if (mouseConstraint.mouse.button !== -1) {
            var climber = [torso, thoracic, lumbar, hip, hipl, hipr,
        shoulderr, shoulderl, elbowl, elbowr, handl, handr,
        footl, footr, kneel, kneer, footblockl, footblockr, kneeblockl, kneeblockr];
            for (let i = 0; i < climber.length; i++) {
                if (mouseConstraint.body === climber[i]) {
                    if (mouseConstraint.body && mouseConstraint.body.isStatic === true) {
                        mouseConstraint.body.isStatic = false;
                    }
                }
            }
        }
    });


    //

   

    //load and angle limits
    //hands stick to holds (colliders)  - if load is below limit (2) and angle is within limit (1.5rad)
    Events.on(engine, 'collisionActive', function (event) {
        const pairs = event.pairs;
        for (let i = 0; i < colliders.length; i++) {
            //var holdpositivity = colliders[i].height *0.0001;
            //FOR LEFT
            var armanglel = -1 * Math.atan2(wrist1l.position.x - handl.position.x, wrist1l.position.y - handl.position.y);
            var wriststretchedlengthl = (Math.sqrt(Math.pow((handl.position.x - wrist1l.position.x), 2) + Math.pow((handl.position.y - wrist1l.position.y), 2)));
            var wriststretchl = (wriststretchedlengthl - wrist2l.length);

            var lowlimit = 3;
            var maxlimit = 5;
            if (wriststretchl >= maxlimit) { handl.isStatic = false }
            else if (wriststretchl >= lowlimit) {

                if (Math.abs(armanglel - colliders[i].angle) >= 2) { handl.isStatic = false }
            }
            //FOR RIGHT
            var armangler = -1 * Math.atan2(wrist1r.position.x - handr.position.x, wrist1r.position.y - handr.position.y);
            var wriststretchedlengthr = (Math.sqrt(Math.pow((handr.position.x - wrist1r.position.x), 2) + Math.pow((handr.position.y - wrist1r.position.y), 2)));
            var wriststretchr = (wriststretchedlengthr - wrist2r.length);

            var lowlimit = 3;
            var maxlimit = 5;
            if (wriststretchr >= maxlimit) { handr.isStatic = false }
            else if (wriststretchr >= lowlimit) {

                if (Math.abs(armangler - colliders[i].angle) >= 2) { handr.isStatic = false }
            }
            else {
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
                    if (pair.bodyA === collider2) {
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

            }
        }
        //To make arms stay rigid when floating freely, but weak when attached to a hold

        // var colliders = [collider, collider1, collider2, collider3, collider4, collider5];
        var leftmuscles = [bicepl, teresl, deltoidl];
        var rightmuscles = [bicepr, teresr, deltoidr];

        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i];
            //left arm
            var wriststretchedlengthl = (Math.sqrt(Math.pow((handl.position.x - wrist1l.position.x), 2) + Math.pow((handl.position.y - wrist1l.position.y), 2)));
            var wriststretchl = (wriststretchedlengthl - wrist2l.length);

            var limit = 4;
            if (wriststretchl >= limit) {
                console.log(wriststretchl);
                if (pair.bodyA === handl) {
                    if (pair.bodyB === collider || collider1 || collider2 || collider3 || collider4 || collider5 || collider6)
                    { removemuscles(leftmuscles); bicepl.stiffness = 0.2; teresl.stiffness = 0.2; deltoidl.stiffness = 0.2; World.add(world, leftmuscles) }
                }
                if (pair.bodyB === handl) {
                    if (pair.bodyA === collider || collider1 || collider2 || collider3 || collider4 || collider5 || collider6)
                    { removemuscles(leftmuscles); bicepl.stiffness = 0.2; teresl.stiffness = 0.2; deltoidl.stiffness = 0.2; World.add(world, leftmuscles) }
                }
                else { removemuscles(leftmuscles); bicepl.stiffness = 0.5; teresl.stiffness = 0.5; deltoidl.stiffness = 0.5; World.add(world, leftmuscles) }

            }
            // else tensemuscles(leftmuscles)

            //right arm
            var wriststretchedlengthr = (Math.sqrt(Math.pow((handr.position.x - wrist1r.position.x), 2) + Math.pow((handr.position.y - wrist1r.position.y), 2)));
            var wriststretchr = (wriststretchedlengthr - wrist2r.length);
            var limit = 4;
            if (wriststretchr >= limit) {
                if (pair.bodyA === handr) {
                    if (pair.bodyB === collider || collider1 || collider2 || collider3 || collider4 || collider5 || collider6)
                    { removemuscles(rightmuscles); bicepr.stiffness = 0.2; teresr.stiffness = 0.2; deltoidr.stiffness = 0.2; World.add(world, rightmuscles) }
                }
                if (pair.bodyB === handr) {
                    if (pair.bodyA === collider || collider1 || collider2 || collider3 || collider4 || collider5 || collider6)
                    { removemuscles(rightmuscles); bicepr.stiffness = 0.2; teresr.stiffness = 0.2; deltoidr.stiffness = 0.2; World.add(world, rightmuscles) }
                }
                //else tensemuscles(rightmuscles)
            }
        }

    });



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

    //Render vectors!!
    //render COG 
    Events.on(render, 'afterRender', function () {
        var cogCoordinates = calculatecog([torso, hip, shoulderr, shoulderl, footl, footr, elbowl, elbowr, handr, handl, kneel, kneer, thoracic, lumbar, hipl, hipr]);
        var mouse = mouseConstraint.mouse,
            context = render.context,
            bodies = Composite.allBodies(engine.world),
            startPoint = { x: cogCoordinates.x, y: 0 },
            endPoint = { x: cogCoordinates.x, y: 600 };

        var collisions = Query.ray(bodies, startPoint, endPoint);

        //   Render.startViewTransform(render);

        context.beginPath();
        context.moveTo(startPoint.x, startPoint.y);
        context.lineTo(endPoint.x, endPoint.y);
        context.lineWidth = 0.5;
        context.stroke();

        //       Render.endViewTransform(render);


        //render vector from L hand to shoulder - bicep? add in arm vector /// this is all relative to original position? need to add angle?? 
        //how to make line come from hand?
       // var armstretchedlengthl = (Math.sqrt(Math.pow((elbowl.position.x - handl.position.x), 2) + Math.pow((elbowl.position.y - handl.position.y), 2)));
       // var armstretchl = armstretchedlengthl - forearml.length;
        var wriststretchedlengthl = (Math.sqrt(Math.pow((handl.position.x - wrist1l.position.x), 2) + Math.pow((handl.position.y - wrist1l.position.y), 2)));
        var wriststretchl = (wriststretchedlengthl - wrist2l.length);
        //console.log(wriststretch);

        var context = render.context;
        var endPointl = { x: wrist1l.position.x, y: wrist1l.position.y };
        var startPointl = { x: handl.position.x, y: handl.position.y };

        var vectorscale = 4;
        if (wriststretchl >= 4) { wriststretchl = 4 }
       // else wriststretchl = (wriststretchedlengthl - wrist2l.length);


        context.beginPath();


        context.moveTo((startPointl.x + (startPointl.x - endPointl.x) * vectorscale * wriststretchl), (startPointl.y + (startPointl.y - endPointl.y) * vectorscale * wriststretchl));
        context.lineTo(startPointl.x, startPointl.y);
        context.lineWidth = 4;
        if (wriststretchl > 3) { context.strokeStyle = redColor }
        if (wriststretchl < 1) { context.strokeStyle = greenColor }
        if (wriststretchl >= 1 && wriststretchl <= 3) { context.strokeStyle = blueColor }

        //if (wriststretchl > 3) { context.strokeStyle = redColor }
       // else { context.strokeStyle = greenColor };
        context.stroke();

        //render vector from R hand to shoulder - bicep? add in arm vector /// this is all relative to original position? need to add angle?? 
        //how to make line come from hand?
        //var armstretchedlengthr = (Math.sqrt(Math.pow((elbowr.position.x - handr.position.x), 2) + Math.pow((elbowr.position.y - handr.position.y), 2)));
        //var armstretchr = armstretchedlengthr - forearmr.length;
        var wriststretchedlengthr = (Math.sqrt(Math.pow((handr.position.x - wrist1r.position.x), 2) + Math.pow((handr.position.y - wrist1r.position.y), 2)));
        var wriststretchr = (wriststretchedlengthr - wrist2r.length);
        //console.log(wriststretch);

        var context = render.context;
        var endPointr = { x: wrist1r.position.x, y: wrist1r.position.y };
        var startPointr = { x: handr.position.x, y: handr.position.y };


        context.beginPath();


        context.moveTo((startPointr.x + (startPointr.x - endPointr.x) * vectorscale * wriststretchr), (startPointr.y + (startPointr.y - endPointr.y) * vectorscale * wriststretchr));
        context.lineTo(startPointr.x, startPointr.y);
        context.lineWidth = 4;
        if (wriststretchr > 3) { context.strokeStyle = redColor }
        if (wriststretchr < 1) { context.strokeStyle = greenColor }
        if (wriststretchr >= 1 && wriststretchr <= 3) { context.strokeStyle = blueColor }

        //if (wriststretchr > 3) { context.strokeStyle = redColor }
        //else { context.strokeStyle = greenColor }
        context.stroke();

        //render vector lines for collider holds?


        //for each collider - vector goes to colliders[i].position.x +  10*Math.sin(colliders[i].angle), colliders[i].position.y +  10*Math.cos(colliders[i].angle)
        var colliders = [collider, collider1, collider2, collider3, collider4, collider5, collider6];
        for (let i = 0; i < colliders.length; i++) {

            var context = render.context;

            context.beginPath();

            context.moveTo(colliders[i].position.x + 20 * Math.cos(colliders[i].angle + 1.55), colliders[i].position.y + 20 * Math.sin(colliders[i].angle + 1.55));
            //context.moveTo(500, 500);
            context.lineTo(colliders[i].position.x, colliders[i].position.y);
            context.lineWidth = 0.5;
            context.strokeStyle = greenColor;
            context.stroke();

        }



        
        //HUD display bar of wriststretchR 1=25, 2=50, 3=75, 4=100
        
        var context = render.context;
        var size = 80;
        var x = 430;
        var y = 20;
        var wriststretchedlengthr = (Math.sqrt(Math.pow((handr.position.x - wrist1r.position.x), 2) + Math.pow((handr.position.y - wrist1r.position.y), 2)));
        var wriststretchr = (wriststretchedlengthr - wrist2r.length)*0.8;
        if (wriststretchr >= 4) { wriststretchr = 4 }
       // else wriststretchr = (wriststretchedlengthr - wrist2r.length);


        //ctx.lineWidth = 2;
        //ctx.strokeStyle = '#999';
        //ctx.strokeRect(x - 1, y - 1, size + 2, 12); //draw outline
        //ctx.fillStyle = '#512';
        if (wriststretchr > 3) { context.fillStyle = redColor }
        if (wriststretchr < 1) { context.fillStyle = greenColor }
        if (wriststretchr >= 1 && wriststretchr <= 3) { context.fillStyle = blueColor }
        context.fillRect(x, y, size * wriststretchr, 10); //draw bar
    
        //HUD display bar of wriststretchLEFT 
        var context = render.context;
        var size = -80;
        var x = 370;
        var y = 20;
        var wriststretchedlengthl = (Math.sqrt(Math.pow((handl.position.x - wrist1l.position.x), 2) + Math.pow((handl.position.y - wrist1l.position.y), 2)));
        var wriststretchl = (wriststretchedlengthl - wrist2l.length) * 0.8;
        if (wriststretchl >= 4) { wriststretchl = 4 }
        // else wriststretchl = (wriststretchedlengthl - wrist2r.length);


        //ctx.lineWidth = 2;
        //ctx.strokeStyle = '#999';
        //ctx.strokeRect(x - 1, y - 1, size + 2, 12); //draw outline
        //ctx.fillStyle = '#512';
        if (wriststretchl > 3) { context.fillStyle = redColor }
        if (wriststretchl < 1) { context.fillStyle = greenColor }
        if (wriststretchl >= 1 && wriststretchl <= 3) { context.fillStyle = blueColor }
        context.fillRect(x, y, size * wriststretchl, 10); //draw bar

    
        //add scale%  - RIGHTwrist stretch
        var scale = 8;
        var box = {
            x:1190, y: 47
        }
        context.textAlign = "right";
        context.textBaseline = "middle";
        context.lineJoin = 'round';
        context.setTransform(1, 0, 0, 1, 0.5, 0.5); //hack to stop antialiasing
        context.fillStyle = "#222";
        context.font = "15px Arial";
        context.fillText("0", box.x / 2 - 20 * scale, box.y );
        context.fillText("25", box.x / 2 - 10 * scale, box.y);
        context.fillText("50", box.x / 2, box.y);
        context.fillText("75", box.x / 2 + 10 * scale, box.y);
        context.fillText("100", box.x / 2 + 20 * scale, box.y);
        context.font = "bold 18px Arial";
  //add scale % - LEFT wrist stretch
        var scale = 8;
        var box = {
            x: 435, y: 47
        }
        context.textAlign = "right";
        context.textBaseline = "middle";
        context.lineJoin = 'round';
        context.setTransform(1, 0, 0, 1, 0.5, 0.5); //hack to stop antialiasing
        context.fillStyle = "#222";
        context.font = "15px Arial";
        context.fillText("100", box.x / 2 - 20 * scale, box.y);
        context.fillText("75", box.x / 2 - 10 * scale, box.y);
        context.fillText("50", box.x / 2, box.y);
        context.fillText("25", box.x / 2 + 10 * scale, box.y);
        context.fillText("0", box.x / 2 + 20 * scale, box.y);
        context.font = "bold 18px Arial";

        
// add data for LEFT wrist stretch
        context.textAlign = "right";
        context.textBaseline = "middle";
        context.lineJoin = 'round';
        context.setTransform(1, 0, 0, 1, 0.5, 0.5); //hack to stop antialiasing
        if (wriststretchl <= 1) { context.fillStyle = greenColor; }
        if (wriststretchl > 1 && wriststretchl <= 3) {context.fillStyle = blueColor;}
        if (wriststretchl > 3) { context.fillStyle = redColor; };
        context.font = "16px Arial";
        context.fillText(Math.round(wriststretchl*25),397, 25);

// add data for RIGHT wrist stretch
        context.textAlign = "middle";
        context.textBaseline = "middle";
        context.lineJoin = 'round';
        context.setTransform(1, 0, 0, 1, 0.5, 0.5); //hack to stop antialiasing
        if (wriststretchr <= 1) { context.fillStyle = greenColor; }
        if (wriststretchr > 1 && wriststretchr <= 3) { context.fillStyle = blueColor; }
        if (wriststretchr > 3) { context.fillStyle = redColor; };
        context.font = "16px Arial";
        context.fillText(Math.round(wriststretchr * 25), 425, 25);

    }
    );
    //for left
    var greenbarl = Bodies.rectangle(330, 25, 80, 10, {
        collisionFilter: {
            category: redCategory
        }, isStatic: true, isSensor: true, render: { fillStyle: 'transparent', lineWidth: 1, strokeStyle: greenColor }
    });
    var bluebarl = Bodies.rectangle(210, 25, 160, 10, {
        collisionFilter: {
            category: redCategory
        }, isStatic: true, isSensor: true, render: { fillStyle: 'transparent', lineWidth: 1, strokeStyle: blueColor }
    });
    var redbarl = Bodies.rectangle(90, 25, 80, 10, {
        collisionFilter: {
            category: redCategory
        }, isStatic: true, isSensor: true, render: { fillStyle: 'transparent', lineWidth: 1, strokeStyle: redColor }
    });
    var barsl = [greenbarl, bluebarl, redbarl];
    World.add(world, barsl);

    //for right
    var greenbarr = Bodies.rectangle(470, 25, 80, 10, {collisionFilter: {
        category: redCategory}, isStatic:true, isSensor:true, render: { fillStyle: 'transparent', lineWidth: 1, strokeStyle: greenColor } });
    var bluebarr = Bodies.rectangle(590, 25, 160, 10, {
        collisionFilter: {
            category: redCategory
        }, isStatic: true, isSensor: true, render: { fillStyle: 'transparent', lineWidth: 1, strokeStyle: blueColor }
    });
    var redbarr = Bodies.rectangle(710, 25, 80, 10, {
        collisionFilter: {
            category: redCategory
        }, isStatic: true, isSensor: true, render: { fillStyle: 'transparent', lineWidth: 1, strokeStyle: redColor }
    });
    var barsr = [greenbarr, bluebarr, redbarr];
    World.add(world, barsr);
      
    
   



   

})();
