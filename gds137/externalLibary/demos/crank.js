demos.crank = {};
demos.crank.initWorld = function(world) {
	var ground = world.m_groundBody;

	// Define crank.
	var sd = new b2BoxDef();
	sd.extents.Set(5, 25);
	sd.density = 1.0;

	var bd = new b2BodyDef();
	bd.AddShape(sd);
	
	var rjd = new b2RevoluteJointDef();

	var prevBody = ground;

	//bd.position.Set(500/2, 210);
	//var body = world.CreateBody(bd);

	/*rjd.anchorPoint.Set(500/2, 235);
	rjd.body1 = prevBody;
	rjd.body2 = body;
	rjd.motorSpeed = -1.0 * Math.PI;
	rjd.motorTorque = 500000000.0;
	rjd.enableMotor = true;
	world.CreateJoint(rjd);*/

	//prevBody = body;

	// Define follower.
	//sd.extents.Set(5, 45);
	//bd.position.Set(500/2, 140);
	//body = world.CreateBody(bd);

	/*rjd.anchorPoint.Set(500/2, 185);
	rjd.body1 = prevBody;
	rjd.body2 = body;
	rjd.enableMotor = false;
	world.CreateJoint(rjd);

	prevBody = body;*/

	// Define piston
	sd.extents.Set(20, 20);
	/*bd.position.Set(500/2, 95);
	body = world.CreateBody(bd);

	rjd.anchorPoint.Set(500/2, 95);
	rjd.body1 = prevBody;
	rjd.body2 = body;
	world.CreateJoint(rjd);

	/*var pjd = new b2PrismaticJointDef();
	pjd.anchorPoint.Set(500/2, 95);
	pjd.body1 = ground;
	pjd.body2 = body;
	pjd.axis.Set(0.0, 1.0);
	pjd.motorSpeed = 0.0; // joint friction
	pjd.motorForce = 100000.0;
	pjd.enableMotor = true;

	world.CreateJoint(pjd);*/

	// Create a payload
	sd.density = 2.0;
	bd.position.Set(500/2, 10);
	world.CreateBody(bd);
}
demos.InitWorlds.push(demos.crank.initWorld);
