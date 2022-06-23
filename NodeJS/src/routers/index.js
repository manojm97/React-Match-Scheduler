const express = require("express");
const Fixture = require("../models/fixture");
//const { setUpDataBase ,fixtureOne } = require("../db/defaultDB");

const router = new express.Router();

// Your code goes here
// Write a route to get fetch the matches i.e., GET /fixtures
// You should also implement below filters
//   * filter to list matches that will be held between given start and end date
//   * filter for venue
router.get("/fixtures",async (req,res)=>{
    //setUpDataBase();
    const fixtures = await Fixture.find();
    res.send(fixtures);
     //setUpDataBase();
})

// Write a route to create a match fixture i.e., POST /fixtures
// POST route will take all of these below params
//   * team1
//   * team2
//   * venue
//   * date


module.exports = router;