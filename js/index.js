//const url = "https://localhost:7199/duathletes"

const url = "https://restduathlon-mgh.azurewebsites.net/duathletes"
//const url = "https://anbo-restcarswithmanager.azurewebsites.net/api/cars"

// Change to another REST url to check it's availability (CORS etc)

Vue.createApp({
    data() {
        return {
            searchtext:'',
            duathletes: [],
            duathlete:{},
            age:'',
            data:{
                name:'',
                ageGroup:'',
                bike:'',
                run:''
            },
            textinput:null,
            //name: null,
            message: null,
            result:null,
            //textRepeated:null,
            numberInput:null,
            sortDirection:"asc",
            selectedAgeGroup:null,
            ageGroups:[1,2,3,4]
            //numCheck:null
        }
    },
    async created() {
        console.log("created")
        try {
            const response = await axios.get(url)
            this.duathletes = response.data
            //console.log(response)
        } catch (error) {
            this.duathletes = error.duathletes
            console.log(error)
        }
    
    },    
    methods: {
        async deleteId(numberInput){
            console.log("deleteId called")
            console.log(numberInput)

            
            var test = await axios.delete(url+"/"+numberInput);
            console.log(test)
            location.reload()

        },
        async addDuathlete(){

            //const keys = Object.keys(this.$duathlete);
        age = this.age;
        console.log(age)
        if (age < 25)
            ageGroup = 1 ;
        else if (age <= 35)
            ageGroup = 2 ;
        else if (age <= 45)
            ageGroup = 3;
        else if(age <= 55)
            ageGroup = 4;
        else{
            ageGroup = 4;
        }
            this.data.ageGroup = ageGroup;
            /*const data = {
                name: this.name,
                ageGroup:this.ageGroup,
                bike:this.bike,
                run:this.run
            }*/
            
           
            

            /*const data = keys.map(key => ({
                [key]:this.key
            }));*/
           console.log(this.data) 
           try{
                const response = await axios.post(url,this.data)//.then(response => location.reload());
                location.reload();//.then(response => location.reload());
           } catch(ex) {
           
            console.error(ex);
            alert(ex.message);
           }
           
            
        },
        async SortByTotal(direction) {

            //const duathletesCopy = [...this.duathletes];
            // sort the duathletes by their total property
            this.duathletes.sort((a,b) => {
                if(direction === "asc"){
                    return a.total - b.total;
                }
                else{
                    return b.total - a.total;
                }
            })
            


        }
        /*RepeatXTimes(textinput,numberInput)
        {
            var numCheck = parseInt(numberInput); // if u input a number and then text after it will just return the number, if u write text and then number it will give a blank number
            if (!textinput)
            {
            this.message = "Write something";
            }
            else if(!numCheck)
            this.message = "Please choose a number " ;
            else if(numCheck<0)
            this.message = "Please choose a positive number ";
            else
            {
                textRepeated="";
                for(i=0;i<numCheck;i++)
                {
                    textRepeated += textinput;
                }

                this.message = textRepeated;
            }
        },
        RepeatThreeTimes(textinput) {
            if (!textinput)
            this.message = "Write something";
            else 
            {
                textRepeated="";
                for(i=0;i<3;i++)
                {
                    textRepeated += textinput;
                }

                this.message = textRepeated;
            }                     
             
        },*/
        /*Search(searchtext) {
            if (searchtext.lenght < 0)
            {
                console.log("first if")
                console.log(searchtext.type)
                console.log(searchtext.value)
            }
            else 
            {
                
                console.log("else starting");
                console.log(searchtext);
                
                                
                //return from duathlete in duathletes where duathlete.Bib.Contains(textinput) select duathlete
                this.duathletes.forEach(duathlete => {
                    if(duathlete.bib == searchtext)
                    {
                        this.message = duathlete;
                        console.log(this.result); 
                        console.log(duathlete);
                        return duathlete;
                    }
                    
                    
                    
                });
            }                     
             
        }*/


    },
    computed: {
        
        searchResults(){
            if(this.searchtext)
            {   
                
                
                return this.duathletes.filter((duathlete)=>{   
                    message = duathlete.bib.toString()
                    if(message.includes(this.searchtext))
                    return duathlete
                    else 
                    {
                        message = duathlete.name.toLowerCase();
                        if(message.includes(this.searchtext.toLowerCase()))
                        return duathlete
                    }
                    
                })
            }
            else // this is filtered with agegroup
            {
                return this.duathletes.filter(
                    duathlete =>
                      !this.selectedAgeGroup ||
                      duathlete.ageGroup === this.selectedAgeGroup
                  );
            
            }
        },
        /*filteredAthletes() {
            
            return this.duathletes.filter(
              duathlete =>
                !this.selectedAgeGroup ||
                duathlete.ageGroup === this.selectedAgeGroup
            );
          }*/
        
    }
}).mount("#app")