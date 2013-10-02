/**
 * advanced:
 * make this work offline
 * https://developer.mozilla.org/en-US/docs/HTML/Using_the_application_cache
 * note: you must edit the manifest to update files
 *
 */



var posts = [];
//var iD = [];

//data-myid  in js   cat.dataset.myid =
/**
 * form action
 *
 */

$('#draft button').click( function(event){

    // stop form from trying to send & refresh page
    event.preventDefault();

    // create post from form
    var post = {};
    post.title = $('#title').val();
    post.content = $('#content').val();
    

    // add post to posts
    posts.push(post);

    console.log('post: ',post);
    console.log('posts: ',posts);

    displayPost(post);
    storePosts(posts);

});


/**
 * display posts
 *
 */


function displayPost(post){
    	    console.log('hi');

    var html = '<article><h2>'+ post.title +'</h2><p>'+ post.content +'</p></article>';
    $('#feed').prepend(html);

    
}



$('#feed').on('click','article', function () {
	//alert('blablabla');
	$(this).toggleClass('toggle').css('color','red');
	} );

/* $('#feed').on('click', 'article', function() { // the same as top
	$('article').removeClass('active');
	$(this).toggleClass('active');

});
*/

/*
 {
	function () = 
	
	.toggleClass(".active")
		
	
}
*/

/**
 * store posts
 *
 * note: localStorage only stores STRINGS
 *          arrays/objects must be STRINGIFIED
 *          numbers are fine but will be returned as a strong
 *
 */

function storePosts(posts){

    console.log('array: ' + posts);

    // make the array a string
    posts = JSON.stringify(posts);
    console.log('json: ' + posts);

    // store the string
    localStorage.posts = posts;

}


/**
 * localStorage = STRINGS only!!
 *
 * note: localStorage only stores STRINGS
 *  - arrays/objects must be STRINGIFIED before storage, PARSED after retrieval. 
 *  - numbers also: 
 *       var num = localStorage.mynumber;   // '10.123' 
 *           num = parseFloat(num);         // 10.123 
 *           num = parseInt(num);           // 10
 *
 */


/**
 * load posts
 *
 * note: localStorage only stores STRINGS
 *          arrays/objects must be PARSED
 *          numbers also: var num = parseInt(); 
 *
 */

function loadPosts(){

    // check for posts in storage
    if (localStorage.posts) { 
	    console.log('hi');
        posts = localStorage.posts;

        // turn string into an array
        posts = JSON.parse(posts);

        // loop thru items in the array
        for( i=0, count=posts.length; i<count; i++ ){

            var post = posts[i]
            console.log( post );
            displayPost(post);
        }
    } else { // nothing in storage?
    
        posts = []; 
    
    }

}

// load posts on page load
loadPosts();


/**
 * advanced
 * alternative way to organize your code
 * not currently in use
 */

var app = {
    load : function(){
        if (localStorage.posts) { 
            posts = localStorage.posts;
            posts = JSON.parse(posts);
            for( i=0, count=posts.length; i<count; i++ ){
                var post = posts[i]
                displayPost(post);
            }
        }        
    },
    store : function(posts){
        posts = JSON.stringify(posts);
        localStorage.posts = posts;
    }
}

// app.load();
// app.store(posts);
