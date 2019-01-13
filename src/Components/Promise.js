const urls = ['https:/jsonplaceholder.typicode.com/users','https:/jsonplaceholder.typicode.com/posts','https:/jsonplaceholder.typicode.com/albums']


const getData = async function() {
								try{
									const [users, posts, albums] = await Promise.all(urls.map(async (url) => 
										{const data = await fetch(url)
										return data.json();
										}
									))
									console.log('Users: ', users)
									console.log('Posts: ', posts)
									console.log('Albums: ', albums)
								}
								catch(e){
									console.log('Exception Caught'+e);
								}	
}

 getData()



const urls = ['https:/jsonplaceholder.typicode.com/users','https:/jsonplaceholder.typicode.com/posts','https:/jsonplaceholder.typicode.com/albums']
 const getData = async() =>{
 							try{
 								const [users,posts,albums] = await Promise.all(urls.map( async (url) =>  
    														{
				    											const data = await fetch(url); 
				    											return data.json();
			    											} 
			    										)) 
    							console.log('Posts123456: ', posts)

 							}
 							catch(e){
 							console.log("Exception caught!"+e);
 							}
    						
    						}
 getData()