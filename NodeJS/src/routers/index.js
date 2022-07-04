const express = require("express");
const mongoose = require("mongoose");
const Fixture = require("../models/fixture");
//const { setUpDataBase ,fixtureOne } = require("../db/defaultDB");
//const { setUpDataBase, fixtures } = require("../test/utils/testDB");

const router = new express.Router();


// Your code goes here
// Write a route to get fetch the matches i.e., GET /fixtures
// You should also implement below filters
//   * filter to list matches that will be held between given start and end date
//   * filter for venue
router.get("/fixtures",async (req,res)=>{
    //setUpDataBase();
     const data = await Fixture.find();
     const final = {count : data.length,records:data}
     var params = req.query; 
        for (key in params)
        {
            if(Object.keys(params).length > 1) {
                const mulobj = Object.values(params)
                const start_date = mulobj[0]
                const end_date = mulobj[1]
                const venue = mulobj[2]
                const filter =  await Fixture.find({
                  $and:[{date:{$gte:new Date(start_date),$lte:new Date(end_date)}},{venue:venue}]
                 })

                const filter1 = {count : filter.length,records:filter}
                return res.json(filter1)
            }

            if(key == "venue"){
            const venue = Object.values(params)[0];
            const venFilter = await Fixture.find({venue:venue})
            const filter2 = {count : venFilter.length,records:venFilter}
            return res.json(filter2)
            }

            if(key == "start_date"){
                const start_datee = Object.values(params)[0];
                const startdatefilter = await Fixture.find({date:{$gte:new Date(start_datee)}});
                const filter3 = {count : startdatefilter.length,records:startdatefilter}
                return res.json(filter3)
            }
            

            if(key == "end_date"){
            const end_datee = Object.values(params)[0];
            const enddatefilter = await Fixture.find({date:{$lte:new Date(end_datee)}});
            const filter3 = {count : enddatefilter.length,records:enddatefilter}
            return res.json(filter3)
            }
            
            if(!(key == "venue" || key == "start_date" || key == "end_date"))
            return res.json('wrong query');
        }
        
        return res.json(final);
    
})

// Write a route to create a match fixture i.e., POST /fixtures
// POST route will take all of these below params
//   * team1
//   * team2
//   * venues
//   * date
router.post("/fixtures",async (req,res)=>{

      const data = req.body;

      try{
        const newData = await new Fixture(data).save();
        res.send(newData);
      } 
      
      catch(e){
      res.status(400).send( {error: e.message})
      }

      // Fixture
      // .insertOne(data)
      // .then(docInserted => res.set(200).send(docInserted))
      // .catch((err)=> console.log(err));
      
}) 

module.exports = router;