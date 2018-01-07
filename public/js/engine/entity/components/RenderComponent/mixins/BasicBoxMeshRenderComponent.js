"use strict";

// Dependencies
// @RenderComponent@

class BasicBoxMeshRenderComponent extends mix(RenderComponent).with()
{
    constructor(args)
    {
	super(args);
    }

    Initialise()
    {
	super.Initialise();

	var geoBox = new THREE.BoxGeometry(
	    this.m_Args.Scale ? this.m_Args.Scale.x : 25,
	    this.m_Args.Scale ? this.m_Args.Scale.y : 25,
	    this.m_Args.Scale ? this.m_Args.Scale.z : 25
	);
	geoBox.center();

	var mshBox = new THREE.Mesh(geoBox, material("swirl"));

	this.m_Mesh = mshBox;
	this.OnInitialised();
    }

    Update()
    {
    }
}
