/*----------------------------------------------
This file contains the data used to render the player's sprites
Properties:
	Object: info | information about the sprite file
		String: info.src | The location of the spritesheet
	Object: states | contains the data for each animation state
		Object: [`state name`] | The data used to render the idle state
			Number: fps | The frame rate in which to render the animation
			Boolean: cycle | Whether or not the animation will loop
			Array: frames| Contains objects with geometric data for each frame of animtati.
					Must contain at least one frame object.
					The animation will run for however many frame objects are added to the array
				Object: [index number] | A frame of animation
					Number: width | the actual 1/1 horizontal size of the portion of image file to be rendered
					Number: height | the actual 1/1 vertical size of the portion of image file to be rendered
					Number: startX | the horizontal starting point of the portion of image file to be rendered
					Nunber: startY | the vertical starting point of the portion of image file to be rendered
/*----------------------------------------------*/

var playerData ={
	info:{
		src:`images/Charater_animations-Sheet.png`
	},
	states:{
		//The idle animation 
    	idle:
		{
			fps:15,
			cycle:true,
			frames:
			[
				{width:64, height:128, startX:0, startY:0},
				{width:64, height:128, startX:64, startY:0},
				{width:64, height:128, startX:128, startY:0},
				{width:64, height:128, startX:192, startY:0}
				
			]
		},
		//The walwidth:128, height:128,
		walk:
		{
			fps:5,
			cycle:true,
			frames:
			[
				{width:64, height:128, startX:256, startY:0},
				{width:64, height:128, startX:320, startY:0},
				{width:64, height:128, startX:384, startY:0},
				{width:64, height:128, startX:448, startY:0},
				{width:64, height:128, startX:512, startY:0},
				{width:64, height:128, startX:576, startY:0},
				{width:64, height:128, startX:640, startY:0},
				{width:64, height:128, startX:704, startY:0}
			]
		},
		//The jump animation 
		jump:
		{
			fps:0.5,
			cycle:false,
			frames:
			[
				{width:64, height:128, startX:0, startY:0},
				{width:64, height:128, startX:896, startY:0},
				{width:64, height:128, startX:960, startY:0},
				{width:64, height:128, startX:1024, startY:0},
				{width:64, height:128, startX:1088, startY:0}
			]
		},
		//The crouch animation 
		crouch:
		{
			fps:3,
			cycle:false,
			frames:
			[
				{width:64, height:128, startX:0, startY:0},
				{width:64, height:128, startX:768, startY:0},
				{width:64, height:128, startX:832, startY:0}
			]
		},
		//The attack animation 
		attack:
		{
			fps:3,
			cycle:false,
			//width:300,
			frames:
			[
				{width:64, height:128, startX:1152, startY:0}
			]
		}
	}		
		
}
var bulletData ={
	info:{
		src:`images/attack_Bullet.png`
	},
	states:{
		//The idle animation 
    	idle:
		{
			fps:15,
			cycle:true,
			frames:
			[
				{width:32, height:16, startX:0, startY:0},
				{width:32, height:16, startX:33, startY:0},
				{width:32, height:16, startX:65, startY:0},
				{width:32, height:16, startX:33, startY:0}
			]
		}
	}
}
var buttonData ={
	info:{
		src:'images/menubutton_spritesheet.png'
	},
	states:{
		idle:
		{
			fps:1,
			cycle: true,
			frames:
			[
				{width:243, height:94, startX:0, startY:0},
			]
		},
		hover:
		{
			fps:1,
			cycle: true,
			frames:
			[
				{width:243, height:94, startX:243, startY:0}
			]
		}
	}
}
