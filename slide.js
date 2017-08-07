(function(){
    var Slide = function(images){
        this.Main_Create(images)
        return this
    }
    Slide.prototype = {
		length : '',
		container : document.getElementsByClassName('slide')[0],
		Createimgs : function(images){
        	var imgsNode = document.createElement('div')
            imgsNode.id = 'images'
            imgsNode.style.width = this.length*100+'%'
            imgsNode.style.height = '100%'
	        for(var i = 0; i<this.length; i++){
		        var imgNode = document.createElement('img')
		        var aNode = document.createElement('a')
	            imgNode.src = images.src[i]
	            imgNode.style.width = 100/this.length+'%'
	            imgNode.style.height = '100%'
	            imgNode.title = images.name[i]
	            aNode.appendChild(imgNode)
	            aNode.href = images.url[i];
	            aNode.target = '_blank'
                imgsNode.appendChild(aNode)
	        }
	        return imgsNode
        },
        Createcirclebt : function(){
        	var csNode = document.createElement('div')
        	csNode.id = 'circle_button'
        	for(var i= 0; i<this.length;i++){
        		var cNode = document.createElement('span')
        		cNode.id = i
        		csNode.appendChild(cNode)
        	}
        	return csNode
        },
		Createdirbt : function(dir){
			var dirNode = document.createElement('div')
        	dirNode.id = dir+'_button'
        	dirNode.className = 'arrow'
        	return dirNode
        },
        Circlebtonclick : function(csNode){
        	var slide = this
        	for(var i=0;i<this.length;i++){
        		csNode.children[i].onclick = function(){
        			if(!slide.movestate){
        				var imgsNode = document.getElementById('images')
        			    var left_start = parseInt(imgsNode.style.left) || 0
        		        var index = this.id
        		        slide.Moveslide(left_start,-index*100)
        		    }
        		}
        	}
        },
        Dirbtonclick : function(dirNode){	
        	var slide =this
        	dirNode.onclick = function(){
        		if(!slide.movestate){
        			var imgsNode = document.getElementById('images')
        			var left_start = parseInt(imgsNode.style.left) || 0
        		    var left_end
        		    var width = parseInt(imgsNode.style.width)
        		    if(dirNode.id.slice(0,4) == 'left'){
        		    	left_end = left_start + 100
        		        if(left_end == 100){
        				    left_end = -width +100
        			    }
        			}else{
        			    left_end = left_start-100
        			    if(left_end == -width){
        				    left_end = 0
        			    }
        		    }
        		    slide.Moveslide(left_start,left_end)
        		}
        	}
        },
        Rendercirclebt : function(){
        	var imgsNode = document.getElementById('images')
        	var csNode = document.getElementById('circle_button')
        	var left = parseInt(imgsNode.style.left || 0)
        	for(var i=0; i<this.length; i++){
        		if(i == -left/100){
        			csNode.children[i].className = 'active'
        		}else{
        			csNode.children[i].className = ''
        		}
        	}
        	
        },
        movestate : false,
        Moveslide : function(left_start,left_end){
        	var slide = this
        	var imgsNode = document.getElementById('images')
        	var time = 500
        	var num = 10
        	var diff = left_end - left_start
        	function Move(){
        		if(left_start != left_end){
        			slide.movestate = true
        			left_start = left_start + diff/num
        			imgsNode.style.left = left_start + '%'
        		    setTimeout(Move,time/num)
        		}else{
        		    slide.movestate = false
        		    slide.Rendercirclebt()
        		}
        	}
            Move()
        },
        Autoplay : function(){
        	var imgsNode = document.getElementById('images')
        	var rNode = document.getElementById('right_button')
        	var playtimer
        	function on(){
        		playtimer = setInterval(function(){rNode.onclick()},2000)
        	}
        	function off(){
        		clearInterval(playtimer)
        	}
        	on()
        	imgsNode.onmouseout = on
        	imgsNode.onmouseover = off
        },
        Main_Create : function(images){
            this.length = images.src.length
        	var imgsNode = this.Createimgs(images)
        	var lNode = this.Createdirbt('left')
            var rNode = this.Createdirbt('right')
            var csNode = this.Createcirclebt()
        	this.container.appendChild(lNode)
	        this.container.appendChild(imgsNode)
	        this.container.appendChild(rNode)
	        this.container.appendChild(csNode)
	        this.Rendercirclebt()
	        this.Dirbtonclick(lNode)
            this.Dirbtonclick(rNode)
            this.Circlebtonclick(csNode)
            this.Autoplay()
        },
    }
    window.Slide = Slide
})()