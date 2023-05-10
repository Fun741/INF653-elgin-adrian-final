const states = require("../model/states");

const data = { 
    states: require("../model/states.json"),
    setState(data) {
        this.states = data;
    },
};


//GetAllStates and funfact
//CHANGE this (get funfact from mondgoDB)
const GetAllStates = (req, res) =>{
    /*

    const params = new URLSearchParams(window.location.search)
    console.log(queryString);

    const contig = params.get('contig');

    console.log(contig);

    if(contig == true)
    {
        console.log("contig works");
    }
    console.log("this is running");

    */
    res.json(data.states);
};

//GetState and funfact

//This also (get funfact from mondgoDB)
const GetState = (req, res) => {
    stateCodei = req.params.code;
    stateCode = stateCodei.toUpperCase();
    const state = data.states.find((state) => state.code === stateCode);
    if(!state){
        return res.status(400).json({message: `State ${stateCode} is not found`})
    } 
    res.json(state);
};

const GetStateCapital = (req, res) => {
    stateCodei = req.params.code;
    stateCode = stateCodei.toUpperCase();
    const state = data.states.find((state) => state.code === stateCode);
    if(!state){
        return res.status(400).json({message: `State ${stateCode} is not found`})
    } 
    res.json(`State: ${state.state}, Capital: ${state.capital_city}`);
};

const GetStateNickname = (req, res) => {
    stateCodei = req.params.code;
    stateCode = stateCodei.toUpperCase();
    const state = data.states.find((state) => state.code === stateCode);
    if(!state){
        return res.status(400).json({message: `State ${stateCode} is not found`})
    } 
    res.json(`State: ${state.state}, Nickname: ${state.nickname}`);
};

const GetStatePopulation = (req, res) => {
    stateCodei = req.params.code;
    stateCode = stateCodei.toUpperCase();
    const state = data.states.find((state) => state.code === stateCode);
    if(!state){
        return res.status(400).json({message: `State ${stateCode} is not found`})
    } 
    res.json(`State: ${state.state}, Population: ${state.population.toLocaleString()}`);
};

const GetStateAdmission = (req, res) => {
    stateCodei = req.params.code;
    stateCode = stateCodei.toUpperCase();
    const state = data.states.find((state) => state.code === stateCode);
    if(!state){
        return res.status(400).json({message: `State ${stateCode} is not found`})
    } 
    res.json(`State: ${state.state}, Admission: ${state.admission_date}`);
};

//GetStatesContiguous or not contiguous states
const GetStatesContiguous = (req, res) => {
    const stateContig = req.params.contig;
    console.log("contigous");
    const states2 = data.states.findAll((states) => states.code !== AK);
    if(!states2){
        return res.status(400).json({message: `State ${stateContig} is not found`})
    } 
    res.json(states2);
};

//FunFacts (mondoDB)

//GET ALL FUN FACTS
const GetAllFunfacts = async (req, res) => {
    //req.params.stateCode = "NE";
    stateCodei = req.params.code;
    stateCode = stateCodei.toUpperCase();

    if (!stateCode) {
        return res.status(400).json({ message: "stateCode is required. " });
    }

    const state = await states.findOne({ stateCode: stateCode }).exec();
    
    if (!state)
    {
        return res
          .status(204)
          .json({ message: `No Funfacts for stateCode: ${stateCode}` });
    }
    //const size =  {$size: "funfacts"} ;
    //const i = Math.floor(Math.random() * (size - 1 + 1) + 1)
    res.json(state.funfacts);
}

//GET ONE Random Funfact
const GetFunfact = async (req, res) => {

    stateCodei = req.params.code;
    stateCode = stateCodei.toUpperCase();

    if (!stateCode) {
        return res.status(400).json({ message: "stateCode is required. " });
    }

    const state = await states.findOne({ stateCode: stateCode }).exec();
    
      if (!state) {
        return res
          .status(204)
          .json({ message: `No state matches stateCode ${stateCode}` });
      }
      /*
    const size =  {$size: "funfacts"} ;
    const i = Math.floor(Math.random() * (size - 1 + 1) + 1)

    randFun = Math.floor(Math.random() * size);

    //db.getSizeOfArray.aggregate({$project:{NumberOfItemsInArray:{$size:"$StudentMarks"}}}).pretty();

    console.log(size);
    console.log(randFun);

    //console.log(funfacts.length);
    */

    res.json(state.funfacts[1]);
}

//POST funfact or create funfact should be done
const PostFunfact = async (req, res) => {

    stateCodei = req.params.code;
    stateCode = stateCodei.toUpperCase();

    funfact = req.body.funfacts;

    console.log(funfact);
    console.log(stateCode);

    if(!stateCode || !funfact) {
        return res.status(400).json({Message: "stateCode and funfact are requiered"});
    }

    const state = await states.findOne({ stateCode: stateCode }).exec();

    console.log(state);

    if(state == null)
    {
        try
        {
        const result = await states.create({
            stateCode: stateCode,
            });           
            //res.status(200).json(result);
        } catch (err) {
            console.log(err);
        }
    }

    //re-get state after state obj is created 
    const state2 = await states.findOne({ stateCode: stateCode }).exec();

    console.log(state2);

    try
    {
    const result = await state2.updateOne(
    {
        //stateCode: stateCode,
        //$addToSet: {funfacts: funfact},
        $push:{"funfacts": funfact}
    });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }        
};

//Put funfact
const PatchFunfact =  async (req, res) => {

    stateCodei = req.params.code;
    stateCode = stateCodei.toUpperCase();

    funfact = req.body.funfacts;
    index = req.body.index;

    console.log(index);
    console.log(funfact);
    console.log(stateCode);

    if(!stateCode || !funfact || !index) {
        return res.status(400).json({Message: "stateCode, index, and funfact are requiered"});
    }

    const state = await states.findOne({ stateCode: stateCode }).exec();
    index--;
    console.log(state);
    console.log(index);

    if (state != null)
    {
        try
        {
        /*
        const result = await state.updateOne(
        {
             "funfacts": "funfacts[index]" , 
             "$set": { "funfacts.$": "funfact" }  
        });
        */
        const result = await state.updateOne(
            {funfacts: "ks index 0."},
            {$set: { "funfacts.$": "hello" }}
        );
            res.status(200).json(result);
        } catch (err) {
            console.log(err);
        }         
    } 
    else {
        return res.status(400).json({Message: "State object does not currently exist."});        
    }   
}

const DeleteFunfact = async (req, res) => {
    stateCodei = req.params.code;
    stateCode = stateCodei.toUpperCase();

    index = req.body.index;

    if(!stateCode || !index) {
        return res.status(400).json({Message: "stateCode and index are requiered"});
    }

    const state = await states.findOne({ stateCode: stateCode }).exec();
    index--;

    if (state != null)
    {
        try
        {
        /*
        const result = await state.updateOne(
        {
             "funfacts": "funfacts[index]" , 
             "$set": { "funfacts.$": "funfact" }  
        });
        */
        const result = await state.update(
            {stateCode: stateCode},
            {$pull: { state,funfacts: state.funfacts[index] }}
        );
            res.status(200).json(result);
        } catch (err) {
            console.log(err);
        }         
    } 
    else {
        return res.status(400).json({Message: "State object does not currently exist."});        
    } 
}

module.exports = {
    GetAllStates, 
    GetState, 
    GetStateCapital, 
    GetStateNickname, 
    GetStatePopulation, 
    GetStateAdmission, 
    GetStatesContiguous,
    PostFunfact,
    GetAllFunfacts,
    GetFunfact,
    PatchFunfact
};