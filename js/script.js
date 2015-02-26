var spawntimer, movetimer;
var drop_array = new Array();
//make a user-controlled Bucket object on the screen
var user_bucket = new Bucket(50,350,100,75);
/**
 *this class is the user controlled element that cathes the drops
 */
function Bucket(ux, uy, uw,uh){
	this.x = ux;
	this.y = uy;
	this.width = uw;
	this.height = uh;
	this.item_on_page;
	/** 
	*	The create method creates a DIV that looks like a grey box on the page
	*/
	this.create = function(){
		this.item_on_page = document.createElement("div");
		this.item_on_page.style.left = this.x+"px";
		this.item_on_page.style.top = this.y+"px";
		this.item_on_page.style.width = this.width+"px";
		this.item_on_page.style.height = this.height+"px";
		this.item_on_page.style.position = "absolute";
		this.item_on_page.style.left = this.x+"px";
		this.item_on_page.style.backgroundColor = "#999";
		document.body.appendChild(this.item_on_page);
	}//end create() method
}//end Bucket class
/**
 * The Drop class is a blueprint for each raindrop we generate
 * @author  John Doe
 * @version 1.0, May 2014
 */
function Drop(){
	this.x; //starts empty, will keep track of each drop's left-right position as a #
	this.y; //starts empty, will keep track of each drop's up-down position as a #
	this.width=50;//keep track of drop's width, for collisions
	this.height=50;
	this.item_on_page; //represents drop's physical presence on the screen
	/** 
	*	The create method creates a DIV that looks like a blue drop on the page
	*/
	this.create = function(){
		//make a div tag in the HTML, store it into the item-on-page we set up above.
		this.item_on_page = document.createElement("div");
		//give it a class which styles it in CSS to resemble a drop
		this.item_on_page.className = "raindrop";
		//store a random x position, different for each drop. I'm using screen width of 800, height of 600:
		this.x = Math.floor(Math.random()*800);
		this.y = -50;//puts each new drop above top of screen
		//use those x and y coordinates in the CSS to position the drop:
		this.item_on_page.style.left = this.x + "px";
		this.item_on_page.style.top = this.y + "px";
		//attach the item to our HTML hierarchy, as a child of the body:
		document.body.appendChild(this.item_on_page);
	}
	/** 
	*   The destroy function does lots of cleaning up when a drop is removed from the page
	*/
	this.destroy = function(){
		//remove all splashes from the screen
		var splashes = document.getElementsByClassName("splash");
		for(var j=0; j ; j++){
			document.body.removeChild(document.getElementsByClassName("splash")[j]);
		}
		//cause a splash animation right where the drop is
		var newsplash = document.createElement("img");
		//we'll reference the animation GIF, with random querystring
		//so browser thinks animation is different each time and starts
		//it playing from the beginning
		newsplash.src = "img/splash.gif?"+Math.random();
		//give each splash a classname so i can remove them:
		newsplash.className="splash";
		newsplash.style.position = "absolute";
		//position the splash where the drop is
		newsplash.style.left = this.x+"px";
		newsplash.style.top = this.y+"px";
		document.body.appendChild(newsplash);
		//get this drop out of the array, First, find index # of this drop
		var this_drops_index_num = drop_array.indexOf(this);
		
		//splice(indexNumber, howManyToRemove)
		drop_array.splice(this_drops_index_num, 1);
		//remove its graphic from the screen
		document.body.removeChild(this.item_on_page);
	}
} //close the Drop class


onload=init;

function init() {
	//when game starts, start causing a spawn function to happen every so often
	spawntimer = setInterval(spawn, 1000);
	movetimer = setInterval(moveAllDrops, 1000/30);
	//make a user-controlled Bucket object on the screen
	
	user_bucket.create();
	//event handler: when a key is pressed, do the checkKey function
	document.onkeydown = function(){
		checkKey();
	}
}
/**
 *this method moves the bucket if the appropriate key was hit
 */
function checkKey(){
	user_bucket.x +=10;
	user_bucket.item_on_page.style.left = user_bucket.x+"px";
}
 /**
 * generate a new Drop object every so often
 */
function spawn(){
	//make an object that's an instance of the Drop Class:
	var anotherdrop = new Drop();
	anotherdrop.create();
	//remember the newly-created drop by storing it in an array
	drop_array.push(anotherdrop);
}
/**
 * loop through all Drop objects, add to Y every so often
 */
function moveAllDrops(){
	//for each drop in the drop_array, repeat what's in {}
	for (var i=0; i<drop_array.length; i++){
		//make a short reference to the current drop:
		var currentdrop = drop_array[i];
		//add to the current Y property of this drop
		currentdrop.y += 5;
		//apply the bigger y as the drop's 'top' property in CSS
		currentdrop.item_on_page.style.top = currentdrop.y + "px";
		//if the drop hits bottom of game screen, remove it
		if(currentdrop.y > 400){
			currentdrop.destroy();
		}
	}
}