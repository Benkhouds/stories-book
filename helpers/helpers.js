module.exports={

  formatDate: (date)=>date.toLocaleString(),
  stripTags: (string)=>{
      return string.replace(/(<([^>]+)>)/gi,"").replace(/&nbsp;/gi," ")
  },
  cleanString:(string)=>{
    //removing the p tag so i can style the output with tailwind css classes
     return string.replace(/<\/?p[^>]*>/gi,"")
  }, 
  truncate: (string)=>{
     if(string && string.length>150){
       return string.slice(0,150)+ '...'
     }else{
       return string
     }
   },
   ifEquals:(arg1,arg2,options)=>{
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  },
  editIcon:(storyUser, loggedUser, storyID)=>{
     if(storyUser.toString() === loggedUser.toString()){
       return `<a href="/stories/edit/${storyID}" class="absolute -top-2 -right-2  w-10 h-10 flex items-center justify-center  bg-gray-400 rounded-full">
                <i class="fas fa-edit text-white"></i>
              </a>`
     }
     else return ''
  },
  actionIcons:(storyUser, loggedUser, storyID)=>{
    if(storyUser.toString() === loggedUser.toString()){
      return `
        <div class="flex justify-start items-center mt-12">
            <a href="/stories/edit/${storyID}" class="mr-2 px-6 py-2 hover:bg-indigo-400 bg-indigo-300 text-white font-medium tracking-wider rounded shadow">Edit</a>
            <form action="/stories/delete/${storyID}?_method=DELETE" method="POST">
                <button class="px-4 py-2 text-white font-medium tracking-wider bg-red-400 hover:bg-red-500 rounded shadow">Delete</button>
            </form>
        </div>  
       `;
    }else{
      return ''
    }
  }
}

